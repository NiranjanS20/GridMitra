import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Sun, Activity, Cpu, ShieldCheck, ArrowRight, BarChart2 } from 'lucide-react';
import ForecastChart from '../../components/common/ForecastChart';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function OperatorForecastLab() {
  const { hourlyForecastData, modelRegistry } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)' }}>
            AI Intelligence & Uncertainty Lab
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Forecast Lab & Error Analytics
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SimulationBadge text="NOWCAST EVALUATION (WF-22)" />
          <Link to="/admin/models" style={{ fontSize: '0.8rem', color: 'var(--color-lime)', textDecoration: 'underline' }}>
            Model Registry (WF-51) →
          </Link>
        </div>
      </div>

      {/* Model Performance KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Solar Nowcast MAPE</span>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--color-lime-bright)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>4.82%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Model: Solar-Nowcast-v3.2</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>P90 Tail Coverage</span>
          <h3 style={{ fontSize: '1.85rem', color: '#60A5FA', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>94.6%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Empirical interval validity</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Feeder Demand MAPE</span>
          <h3 style={{ fontSize: '1.85rem', color: '#F59E0B', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>3.95%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Model: Feeder-Load-XGB-v2.1</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Inference Latency</span>
          <h3 style={{ fontSize: '1.85rem', color: '#FFFFFF', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>42 ms</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)' }}>Substation Edge Server</span>
        </div>
      </div>

      {/* Main Forecast & Confidence Chart */}
      <div className="card-dark">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', margin: 0 }}>
              Observed Telemetry vs Rolling Nowcast Envelope (P10–P50–P90)
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
              Click any point to inspect causal drivers and model weights.
            </span>
          </div>
        </div>

        <ForecastChart data={hourlyForecastData} height={320} />
      </div>

      {/* Satellite Cloud Imagery & Weather Drift */}
      <div className="card-dark">
        <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '16px' }}>
          INSAT-3DR Satellite Cloud Vector & Irradiance Drift
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Cloud Band Velocity</span>
            <strong style={{ fontSize: '1.25rem', color: '#FFFFFF', display: 'block', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
              18.4 km/h East-North-East
            </strong>
            <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
              Approaching Patparganj & Mayur Vihar corridor at 16:45
            </span>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Direct Normal Irradiance</span>
            <strong style={{ fontSize: '1.25rem', color: '#F59E0B', display: 'block', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
              740 W/m² (Clear Sky 880 W/m²)
            </strong>
            <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
              Aerosol optical depth: 0.38 (Moderate autumn haze)
            </span>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Temperature Humidity Index</span>
            <strong style={{ fontSize: '1.25rem', color: '#EF4444', display: 'block', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
              34.2°C • 68% RH
            </strong>
            <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
              Thermal cooling elasticity multiplier: 1.32x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
