import pyomo.environ as pyo
import pandas as pd
import numpy as np

class ScenarioMPC:
    def __init__(self, battery_config):
        self.capacity_kwh = battery_config.get('capacity_kwh', 100)
        self.usable_soc_min = battery_config.get('usable_soc_min', 0.20)
        self.usable_soc_max = battery_config.get('usable_soc_max', 0.90)
        self.c_rate = battery_config.get('c_rate', 0.3)
        self.efficiency = battery_config.get('round_trip_efficiency', 0.85)
        self.deg_cost = battery_config.get('degradation_cost', 0.05)
        
        self.max_power_kw = self.capacity_kwh * self.c_rate
        
    def solve(self, scenarios_df, current_soc):
        """
        Solves the MPC optimization problem over given scenarios.
        scenarios_df: DataFrame with multi-index (scenario_id, time_step).
                      Columns: load_kw, pv_kw, grid_available (0/1)
        """
        model = pyo.ConcreteModel()
        
        # Sets
        scenario_ids = scenarios_df.index.get_level_values(0).unique()
        time_steps = scenarios_df.index.get_level_values(1).unique()
        
        model.S = pyo.Set(initialize=scenario_ids)
        model.T = pyo.Set(initialize=time_steps, ordered=True)
        
        # Parameters
        dt = 0.25 # 15-min steps = 0.25 hours
        
        # Variables (per scenario and time step)
        model.P_ch = pyo.Var(model.S, model.T, within=pyo.NonNegativeReals, bounds=(0, self.max_power_kw))
        model.P_dis = pyo.Var(model.S, model.T, within=pyo.NonNegativeReals, bounds=(0, self.max_power_kw))
        model.SoC = pyo.Var(model.S, model.T, within=pyo.NonNegativeReals, bounds=(self.capacity_kwh * self.usable_soc_min, self.capacity_kwh * self.usable_soc_max))
        model.Unserved_Load = pyo.Var(model.S, model.T, within=pyo.NonNegativeReals)
        model.Grid_Import = pyo.Var(model.S, model.T, within=pyo.NonNegativeReals)
        
        # Non-anticipativity for the first time step (must make same decision regardless of scenario)
        t0 = time_steps[0]
        s0 = scenario_ids[0]
        def non_anticipativity_ch_rule(m, s):
            return m.P_ch[s, t0] == m.P_ch[s0, t0]
        model.NonAnticip_ch = pyo.Constraint(model.S, rule=non_anticipativity_ch_rule)
        
        def non_anticipativity_dis_rule(m, s):
            return m.P_dis[s, t0] == m.P_dis[s0, t0]
        model.NonAnticip_dis = pyo.Constraint(model.S, rule=non_anticipativity_dis_rule)
        
        # SoC Evolution
        def soc_rule(m, s, t):
            if t == t0:
                soc_prev = current_soc
            else:
                idx = list(time_steps).index(t)
                soc_prev = m.SoC[s, time_steps[idx-1]]
            
            return m.SoC[s, t] == soc_prev + (m.P_ch[s, t] * self.efficiency - m.P_dis[s, t] / self.efficiency) * dt
        model.SoC_update = pyo.Constraint(model.S, model.T, rule=soc_rule)
        
        # Power Balance
        def power_balance_rule(m, s, t):
            load = scenarios_df.loc[(s, t), 'load_kw']
            pv = scenarios_df.loc[(s, t), 'pv_kw']
            grid_avail = scenarios_df.loc[(s, t), 'grid_available']
            
            # Grid import can only happen if grid is available
            # Assume arbitrary large bound if grid is on (e.g. 1000 kW limit)
            grid_limit = 1000 * grid_avail
            
            return load - m.Unserved_Load[s, t] == pv + m.Grid_Import[s, t] + m.P_dis[s, t] - m.P_ch[s, t]
        model.PowerBalance = pyo.Constraint(model.S, model.T, rule=power_balance_rule)
        
        # Grid limit constraint
        def grid_limit_rule(m, s, t):
            grid_avail = scenarios_df.loc[(s, t), 'grid_available']
            return m.Grid_Import[s, t] <= 1000 * grid_avail
        model.GridLimit = pyo.Constraint(model.S, model.T, rule=grid_limit_rule)
        
        # Objective: minimize expected unserved load + expected grid import cost + degradation cost
        # Grid tariff assumed Rs 8/kWh, Unserved load penalty Rs 100/kWh
        def obj_rule(m):
            prob = 1.0 / len(scenario_ids) # equal probability for all scenarios
            cost = 0
            for s in model.S:
                for t in model.T:
                    cost += prob * (
                        m.Unserved_Load[s, t] * 100 * dt +
                        m.Grid_Import[s, t] * 8 * dt +
                        (m.P_ch[s, t] + m.P_dis[s, t]) * dt * self.deg_cost
                    )
            return cost
        model.Obj = pyo.Objective(rule=obj_rule, sense=pyo.minimize)
        
        # Solve
        solver = pyo.SolverFactory('appsi_highs')
        results = solver.solve(model, tee=False)
        
        # Extract first step decisions (this is what MPC actually applies)
        p_ch_t0 = pyo.value(model.P_ch[s0, t0])
        p_dis_t0 = pyo.value(model.P_dis[s0, t0])
        
        return {
            'status': results.solver.status,
            'termination_condition': results.solver.termination_condition,
            'P_ch_kw': p_ch_t0,
            'P_dis_kw': p_dis_t0,
            'objective_value': pyo.value(model.Obj)
        }

if __name__ == "__main__":
    # Simple test with mock scenario data
    battery_config = {
        'capacity_kwh': 100,
        'usable_soc_min': 0.20,
        'usable_soc_max': 0.90,
        'c_rate': 0.5,
        'round_trip_efficiency': 0.85,
        'degradation_cost': 0.05
    }
    
    mpc = ScenarioMPC(battery_config)
    
    # Create mock scenarios: 2 scenarios, 4 time steps
    idx = pd.MultiIndex.from_product([[1, 2], [0, 1, 2, 3]], names=['scenario', 'time'])
    df = pd.DataFrame(index=idx)
    # Scenario 1: Grid available always
    df.loc[1, 'load_kw'] = [50, 60, 55, 50]
    df.loc[1, 'pv_kw'] = [20, 25, 30, 20]
    df.loc[1, 'grid_available'] = [1, 1, 1, 1]
    
    # Scenario 2: Grid fails at t=1,2
    df.loc[2, 'load_kw'] = [50, 60, 55, 50]
    df.loc[2, 'pv_kw'] = [20, 25, 30, 20]
    df.loc[2, 'grid_available'] = [1, 0, 0, 1]
    
    print("Testing MPC Optimizer...")
    res = mpc.solve(df, current_soc=80)
    print("Optimization Result:", res)
