import os
import sys
import pandas as pd
import lightgbm as lgb
from sklearn.metrics import mean_absolute_error, mean_squared_error
import numpy as np

# Add parent dir to path to import pipeline
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from pipeline.pv_features import load_and_merge_pv_data, add_clearsky_features, generate_pv_features

def pinball_loss(y_true, y_pred, alpha):
    """Calculate Pinball Loss for quantile regression."""
    diff = y_true - y_pred
    return np.mean(np.maximum(alpha * diff, (alpha - 1) * diff))

def train_m2_model(gen_paths, weather_paths):
    print("Loading and preprocessing PV data...")
    dfs = []
    for g, w in zip(gen_paths, weather_paths):
        df = load_and_merge_pv_data(g, w)
        df = add_clearsky_features(df)
        dfs.append(df)
        
    df_combined = pd.concat(dfs).sort_index()
    
    horizons = [1, 4, 24, 96]  # 15m, 1h, 6h, 24h
    print("Generating features for horizons:", horizons)
    
    df_all_horizons = []
    for h in horizons:
        df_h = generate_pv_features(df_combined, h)
        df_all_horizons.append(df_h)
        
    df_final = pd.concat(df_all_horizons)
    
    # Train-test split
    # Since we have only 34 days, use first 24 days for train, last 10 days for test
    # Get the unique dates
    unique_dates = df_final.index.normalize().unique()
    split_date = unique_dates[24]
    
    train_df = df_final[df_final.index < split_date]
    test_df = df_final[df_final.index >= split_date]
    
    features = [
        'kt_t-1', 'kt_t-2', 'kt_t-3', 'kt_t-4',
        'ambient_temp_t', 'module_temp_t', 'irradiation_t-1', 'irradiation_t-2',
        'zenith', 'azimuth', 'hour_sin', 'hour_cos', 'horizon_steps'
    ]
    
    target = 'target_kt'
    
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
        
        model.fit(
            X_train, y_train,
            eval_set=[(X_test, y_test)],
            callbacks=[lgb.early_stopping(stopping_rounds=50, verbose=False)]
        )
        models[alpha] = model
        
        # Evaluate
        preds = model.predict(X_test)
        pb_loss = pinball_loss(y_test, preds, alpha)
        print(f"Quantile {alpha} Pinball Loss (kt target) on Test Set: {pb_loss:.4f}")
        
        if alpha == 0.5:
            # For median, calculate MAE and RMSE
            mae = mean_absolute_error(y_test, preds)
            rmse = np.sqrt(mean_squared_error(y_test, preds))
            print(f"Median MAE (kt): {mae:.4f}")
            print(f"Median RMSE (kt): {rmse:.4f}")

    print("\nM2 PV Forecast Models Trained Successfully.")
    return models

if __name__ == "__main__":
    base_dir = r"d:\Personal_Projects\yuva-yodha-hack\data"
    gen_paths = [
        os.path.join(base_dir, "Plant_1_Generation_Data.csv"),
        os.path.join(base_dir, "Plant_2_Generation_Data.csv")
    ]
    weather_paths = [
        os.path.join(base_dir, "Plant_1_Weather_Sensor_Data.csv"),
        os.path.join(base_dir, "Plant_2_Weather_Sensor_Data.csv")
    ]
    train_m2_model(gen_paths, weather_paths)
