import json
import sys
import os
import pandas as pd
import numpy as np

# Add parent directory to path to import models if necessary
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from models.m4_scenarios import GaussianCopulaScenarios
from models.m5_optimizer import ScenarioMPC

def run_inference(region="mayur_vihar"):
    """
    Simulates loading trained models, generating a forecast,
    and running the MPC optimizer. Outputs results as JSON to stdout.
    """
    # 1. Simulate M1 Load Forecast (for the next 24 hours, 15-min intervals = 96 steps)
    steps = 96
    
    if region == "mohol":
        # Mohol region: Higher base load due to different demographics, sharper solar peak
        base_load = 180000 + 30000 * np.sin(np.linspace(0, 2 * np.pi, steps) - np.pi/2)
        base_pv = 65000 * np.sin(np.linspace(0, np.pi, steps))
    else:
        # Default (Mayur Vihar)
        base_load = 150000 + 20000 * np.sin(np.linspace(0, 2 * np.pi, steps) - np.pi/2)
        base_pv = 50000 * np.sin(np.linspace(0, np.pi, steps))

    load_pred = np.maximum(base_load + np.random.normal(0, 2000, steps), 0)
    
    # 2. Simulate M2 PV Forecast
    # zero out PV at night (assuming 6 AM to 6 PM daylight)
    base_pv[:24] = 0
    base_pv[-24:] = 0
    pv_pred = np.maximum(base_pv + np.random.normal(0, 1000, steps), 0)
    
    # 3. M4 Scenarios
    # Mocking standard deviations
    load_std = load_pred * 0.1
    pv_std = pv_pred * 0.1
    
    copula = GaussianCopulaScenarios(n_scenarios=5)
    df_scenarios = copula.generate_scenarios(load_pred, load_std, pv_pred, pv_std)
    
    # 4. M5 Optimization
    battery_config = {
        'capacity_kwh': 100000, # 100 MWh
        'usable_soc_min': 0.10,
        'usable_soc_max': 0.95,
        'c_rate': 0.5,
        'round_trip_efficiency': 0.90,
        'degradation_cost': 0.05
    }
    mpc = ScenarioMPC(battery_config)
    
    # Run optimizer for the current time step using the scenarios
    opt_result = mpc.solve(df_scenarios, current_soc=50000)
    
    # 5. M6 Power Flow Validation
    from models.m6_powerflow import create_mock_feeder, validate_dispatch
    net = create_mock_feeder()
    # Check if optimal dispatch violates network constraints
    # M5 outputs positive P_dis_kw for discharge (injecting into grid)
    # and positive P_ch_kw for charge (pulling from grid)
    net_injection = opt_result['P_dis_kw'] - opt_result['P_ch_kw']
    
    # We test injection at Bus 5
    valid, msg = validate_dispatch(net, bus_id=5, net_injection_kw=net_injection)
    
    # Prepare JSON response
    response = {
        "forecast": {
            "timestamps": [f"T+{i}" for i in range(steps)],
            "load_mw": load_pred.tolist(),
            "pv_mw": pv_pred.tolist()
        },
        "optimization": {
            "optimal_charge_kw": opt_result['P_ch_kw'],
            "optimal_discharge_kw": opt_result['P_dis_kw'],
            "expected_cost": opt_result['objective_value']
        },
        "powerflow": {
            "network_name": net.name if net.name else "case33bw",
            "is_dispatch_valid": valid,
            "validation_message": msg,
            "injection_kw": net_injection
        }
    }
    
    # Print JSON to stdout so the backend can capture it
    print(json.dumps(response))

if __name__ == "__main__":
    region_arg = "mayur_vihar"
    if len(sys.argv) > 1:
        region_arg = sys.argv[1].lower()
    run_inference(region=region_arg)
