import os
import sys
import pandas as pd
import lightgbm as lgb
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

# Add parent dir to path to import pipeline
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from pipeline.features import preprocess_demand_data, generate_load_features

def pinball_loss(y_true, y_pred, alpha):
    """Calculate Pinball Loss for quantile regression."""
    diff = y_true - y_pred
    return np.mean(np.maximum(alpha * diff, (alpha - 1) * diff))

def train_m1_model(data_path):
    print("Loading and preprocessing data...")
    df_15m = preprocess_demand_data(data_path)
    
    # We want to train on multiple horizons simultaneously
    horizons = [1, 4, 24, 96]  # 15m, 1h, 6h, 24h
    
    print("Generating features for horizons:", horizons)
    df_all_horizons = []
    for h in horizons:
        df_h = generate_load_features(df_15m, h)
        df_all_horizons.append(df_h)
        
    df_final = pd.concat(df_all_horizons)
    
    # Train-test split (walk-forward expanding window logic)
    # Total data is Jan 2024 to June 2025. 
    # Test set: May - June 2025
    test_start = pd.to_datetime('2025-05-01')
    
    train_df = df_final[df_final.index < test_start]
    test_df = df_final[df_final.index >= test_start]
    
    features = [
        'demand_t-1', 'demand_t-2', 'demand_t-3', 'demand_t-4',
        'demand_same_time_yesterday', 'demand_same_time_last_week',
        'rolling_mean_1h', 'rolling_std_1h', 'rolling_mean_24h', 'rolling_std_24h',
        'hour_sin', 'hour_cos', 'dow_sin', 'dow_cos', 'month_sin', 'month_cos',
        'horizon_steps'
    ]
    
    target = 'target'
    
    X_train, y_train = train_df[features], train_df[target]
    X_test, y_test = test_df[features], test_df[target]
    
    print(f"Training set: {X_train.shape[0]} rows. Test set: {X_test.shape[0]} rows.")
    
    quantiles = [0.1, 0.5, 0.9]
    models = {}
    
    for alpha in quantiles:
        print(f"\n--- Training LightGBM for Quantile {alpha} ---")
        params = {
            'objective': 'quantile',
            'alpha': alpha,
            'num_leaves': 31,
            'learning_rate': 0.05,
            'n_estimators': 800,
            'min_data_in_leaf': 50,
            'feature_fraction': 0.8,
            'bagging_fraction': 0.8,
            'bagging_freq': 5,
            'lambda_l2': 1.0,
            'verbosity': -1,
            'random_state': 42,
            'n_jobs': -1
        }
        
        model = lgb.LGBMRegressor(**params)
        
        # Use early stopping if we wanted to split train further into train/val,
        # but for now we train on the whole train_df.
        model.fit(
            X_train, y_train,
            eval_set=[(X_test, y_test)],
            callbacks=[lgb.early_stopping(stopping_rounds=50, verbose=False)]
        )
        models[alpha] = model
        
        # Evaluate
        preds = model.predict(X_test)
        pb_loss = pinball_loss(y_test, preds, alpha)
        print(f"Quantile {alpha} Pinball Loss on Test Set: {pb_loss:.2f}")
        
        if alpha == 0.5:
            # For median, calculate MAE and RMSE
            mae = mean_absolute_error(y_test, preds)
            rmse = np.sqrt(mean_squared_error(y_test, preds))
            print(f"Median MAE: {mae:.2f}")
            print(f"Median RMSE: {rmse:.2f}")

    print("\nM1 Load Forecast Models Trained Successfully.")
    return models

if __name__ == "__main__":
    data_path = r"d:\Personal_Projects\yuva-yodha-hack\data\January 2024- June 2025.xlsx"
    train_m1_model(data_path)
