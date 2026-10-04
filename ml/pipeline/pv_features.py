import pandas as pd
import numpy as np
import pvlib
from pvlib.location import Location

def load_and_merge_pv_data(gen_path, weather_path):
    """
    Loads PV generation and weather data, aggregates by time, and merges.
    """
    df_gen = pd.read_csv(gen_path)
    df_weather = pd.read_csv(weather_path)
    
    # Convert DATE_TIME to datetime
    # The format can vary, use dayfirst=True for safety as it's Indian data
    df_gen['DATE_TIME'] = pd.to_datetime(df_gen['DATE_TIME'], dayfirst=True)
    df_weather['DATE_TIME'] = pd.to_datetime(df_weather['DATE_TIME'], dayfirst=True)
    
    # Aggregate generation across all inverters (SOURCE_KEY) per 15-min
    df_gen_agg = df_gen.groupby(['DATE_TIME', 'PLANT_ID'])['AC_POWER'].sum().reset_index()
    
    # Aggregate weather (mean across sensors if multiple)
    df_weather_agg = df_weather.groupby(['DATE_TIME', 'PLANT_ID'])[['AMBIENT_TEMPERATURE', 'MODULE_TEMPERATURE', 'IRRADIATION']].mean().reset_index()
    
    # Merge
    df_merged = pd.merge(df_gen_agg, df_weather_agg, on=['DATE_TIME', 'PLANT_ID'], how='inner')
    df_merged = df_merged.set_index('DATE_TIME').sort_index()
    
    return df_merged

def add_clearsky_features(df, latitude=20.5937, longitude=78.9629, tz='Asia/Kolkata'):
    """
    Adds clear sky GHI and clear sky index (kt).
    """
    # Create pvlib location
    site = Location(latitude, longitude, tz=tz)
    
    # The dates in the CSV might not have timezone. Localize to tz.
    times = df.index.tz_localize(tz, ambiguous='NaT', nonexistent='NaT')
    
    # Get clearsky
    clearsky = site.get_clearsky(times)
    
    df['clearsky_GHI'] = clearsky['ghi'].values
    
    # Calculate clear-sky index kt = actual_GHI / clearsky_GHI
    # Avoid division by zero, set to 0 during night
    df['kt'] = np.where(df['clearsky_GHI'] > 10, df['IRRADIATION'] / df['clearsky_GHI'], 0)
    
    # Clamp kt to [0, 1.5] to handle edge cases
    df['kt'] = df['kt'].clip(0, 1.5)
    
    # Also add solar position
    solar_position = site.get_solarposition(times)
    df['zenith'] = solar_position['zenith'].values
    df['azimuth'] = solar_position['azimuth'].values
    
    return df

def generate_pv_features(df, horizon_steps):
    """
    Generates features for M2 PV Forecast.
    """
    df_feat = df.copy()
    
    # Target: kt at future step
    df_feat['target_kt'] = df_feat['kt'].shift(-horizon_steps)
    
    # Features
    df_feat['kt_t-1'] = df_feat['kt'].shift(1)
    df_feat['kt_t-2'] = df_feat['kt'].shift(2)
    df_feat['kt_t-3'] = df_feat['kt'].shift(3)
    df_feat['kt_t-4'] = df_feat['kt'].shift(4)
    
    df_feat['ambient_temp_t'] = df_feat['AMBIENT_TEMPERATURE']
    df_feat['module_temp_t'] = df_feat['MODULE_TEMPERATURE']
    
    df_feat['irradiation_t-1'] = df_feat['IRRADIATION'].shift(1)
    df_feat['irradiation_t-2'] = df_feat['IRRADIATION'].shift(2)
    
    # Calendar features
    df_feat['hour'] = df_feat.index.hour + df_feat.index.minute / 60.0
    df_feat['hour_sin'] = np.sin(2 * np.pi * df_feat['hour'] / 24.0)
    df_feat['hour_cos'] = np.cos(2 * np.pi * df_feat['hour'] / 24.0)
    
    df_feat['horizon_steps'] = horizon_steps
    
    # Drop NaNs
    df_feat = df_feat.dropna()
    
    return df_feat
