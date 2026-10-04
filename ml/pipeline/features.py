import pandas as pd
import numpy as np

def preprocess_demand_data(file_path):
    """
    Reads the Grid India demand data and resamples to 15-min frequency.
    """
    df = pd.read_excel(file_path)
    # Ensure Timestamp is datetime, turning text footers like "Minimum" into NaT
    df['Timestamp'] = pd.to_datetime(df['Timestamp'], dayfirst=True, errors='coerce')
    df = df.dropna(subset=['Timestamp'])
    df = df.set_index('Timestamp')
    
    # Sort index
    df = df.sort_index()
    
    # Resample to 15-min and interpolate
    # Using cubic spline for smooth demand curve
    df['Demand (MW)'] = pd.to_numeric(df['Demand (MW)'], errors='coerce')
    df_15m = df[['Demand (MW)']].resample('15min').interpolate(method='cubic')
    
    return df_15m

def generate_load_features(df, horizon_steps):
    """
    Generates features for LightGBM given a DataFrame with 'Demand (MW)'.
     horizon_steps: integer, how many 15-min steps ahead we are predicting.
                    1 = 15min, 4 = 1h, 24 = 6h, 96 = 24h
    """
    df_feat = df.copy()
    
    # Target variable: shifted backward by horizon_steps
    # So for row t, the target is demand at t + horizon_steps
    df_feat['target'] = df_feat['Demand (MW)'].shift(-horizon_steps)
    
    # Lag features
    df_feat['demand_t-1'] = df_feat['Demand (MW)'].shift(1)
    df_feat['demand_t-2'] = df_feat['Demand (MW)'].shift(2)
    df_feat['demand_t-3'] = df_feat['Demand (MW)'].shift(3)
    df_feat['demand_t-4'] = df_feat['Demand (MW)'].shift(4)
    
    # Daily patterns
    df_feat['demand_same_time_yesterday'] = df_feat['Demand (MW)'].shift(96)
    df_feat['demand_same_time_last_week'] = df_feat['Demand (MW)'].shift(96 * 7)
    
    # Rolling stats (on the lags to prevent data leakage)
    rolling_1h = df_feat['Demand (MW)'].shift(1).rolling(window=4)
    df_feat['rolling_mean_1h'] = rolling_1h.mean()
    df_feat['rolling_std_1h'] = rolling_1h.std()
    
    rolling_24h = df_feat['Demand (MW)'].shift(1).rolling(window=96)
    df_feat['rolling_mean_24h'] = rolling_24h.mean()
    df_feat['rolling_std_24h'] = rolling_24h.std()
    
    # Calendar features
    df_feat['hour'] = df_feat.index.hour + df_feat.index.minute / 60.0
    df_feat['hour_sin'] = np.sin(2 * np.pi * df_feat['hour'] / 24.0)
    df_feat['hour_cos'] = np.cos(2 * np.pi * df_feat['hour'] / 24.0)
    
    df_feat['dow'] = df_feat.index.dayofweek
    df_feat['dow_sin'] = np.sin(2 * np.pi * df_feat['dow'] / 7.0)
    df_feat['dow_cos'] = np.cos(2 * np.pi * df_feat['dow'] / 7.0)
    
    df_feat['month'] = df_feat.index.month
    df_feat['month_sin'] = np.sin(2 * np.pi * df_feat['month'] / 12.0)
    df_feat['month_cos'] = np.cos(2 * np.pi * df_feat['month'] / 12.0)
    
    # Add context feature
    df_feat['horizon_steps'] = horizon_steps
    
    # Drop NaNs created by shifts
    df_feat = df_feat.dropna()
    
    return df_feat
