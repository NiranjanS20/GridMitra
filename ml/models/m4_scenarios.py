import numpy as np
import pandas as pd
from scipy.stats import norm

class GaussianCopulaScenarios:
    def __init__(self, n_scenarios=200):
        self.n_scenarios = n_scenarios
        
    def generate_scenarios(self, load_median, load_std, pv_median, pv_std, correlation=-0.4):
        """
        Generates correlated load and PV scenarios using a Gaussian copula.
        correlation: correlation between load and PV (typically negative since 
                     sunny days might have high cooling load, wait... high sun -> high temp -> high cooling -> positive correlation?
                     Let's make it an adjustable parameter).
        """
        horizon = len(load_median)
        scenarios = []
        
        # We need a covariance matrix for [Load_t1...tn, PV_t1...tn]
        # For simplicity in this hackathon model, we generate them independently per time step
        # but correlated cross-sectionally (Load vs PV).
        
        cov = np.array([
            [1.0, correlation],
            [correlation, 1.0]
        ])
        
        for i in range(self.n_scenarios):
            # Draw standard normal correlated random variables
            # shape: (horizon, 2)
            z = np.random.multivariate_normal([0, 0], cov, size=horizon)
            
            # Convert to uniform using normal CDF
            u = norm.cdf(z)
            
            # Map to marginals using inverse CDF of the actual marginal distributions
            # Assuming normal marginals for simplicity based on median and std
            load_scen = norm.ppf(u[:, 0], loc=load_median, scale=load_std)
            pv_scen = norm.ppf(u[:, 1], loc=pv_median, scale=pv_std)
            
            # Ensure no negative values
            load_scen = np.maximum(load_scen, 0)
            pv_scen = np.maximum(pv_scen, 0)
            
            # Build dataframe
            df = pd.DataFrame({
                'time_step': range(horizon),
                'scenario_id': i + 1,
                'load_kw': load_scen,
                'pv_kw': pv_scen,
                'grid_available': 1 # Assuming grid is always available for this baseline
            })
            scenarios.append(df)
            
        final_df = pd.concat(scenarios)
        final_df = final_df.set_index(['scenario_id', 'time_step'])
        
        return final_df

if __name__ == "__main__":
    np.random.seed(42)
    print("Generating M4 Gaussian Copula Scenarios...")
    
    # Mock marginals for 4 time steps
    l_med = np.array([100, 110, 105, 95])
    l_std = np.array([10, 15, 12, 8])
    
    p_med = np.array([50, 60, 40, 20])
    p_std = np.array([5, 10, 8, 4])
    
    copula = GaussianCopulaScenarios(n_scenarios=5)
    df_scenarios = copula.generate_scenarios(l_med, l_std, p_med, p_std)
    
    print(df_scenarios.head(10))
