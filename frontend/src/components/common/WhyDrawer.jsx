import React from 'react';
import { X, AlertTriangle, Cpu, TrendingUp, Sun, Wind, CheckCircle } from 'lucide-react';
import { StatusBadge, SimulationBadge } from './BadgesAndKpis';

export default function WhyDrawer({ isOpen, onClose, pointData }) {
  if (!isOpen || !pointData) return null;

  const isStress = pointData.status.includes('Stress');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '480px',
        background: '#FFFFFF',
        borderLeft: '1px solid var(--color-border-light)',
        boxShadow: '-8px 0 32px rgba(0, 0, 0, 0.25)',
        zIndex: 10001,
        display: 'flex',
        flexDirection: 'column',
        animation: 'slideIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
        overflowY: 'auto'
      }}
    >
      {/* Drawer Header */}
      <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--color-cream-surface)' }}>
        <div>
          <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            CAUSAL TELEMETRY ENGINE
          </span>
          <h3 style={{ fontSize: '1.15rem', color: 'var(--color-forest-deep)', margin: '2px 0 0 0', fontWeight: '700' }}>
            Why at {pointData.hour}?
          </h3>
        </div>
        <button
          onClick={onClose}
          style={{ width: '28px', height: '28px', borderRadius: '0px', background: '#FFFFFF', border: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Drawer Content */}
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Core Glance */}
        <div style={{ background: isStress ? '#FFF7ED' : '#ECFDF5', border: `1px solid ${isStress ? '#FED7AA' : '#A7F3D0'}`, borderRadius: '0px', padding: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            {isStress ? <AlertTriangle size={16} color="#C2410C" /> : <CheckCircle size={16} color="#059669" />}
            <span style={{ fontWeight: '800', color: isStress ? '#9A3412' : '#065F46', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {isStress ? 'Feeder Capacity Constraint Alert' : 'Normal Grid Operating Margin'}
            </span>
          </div>
          <p style={{ margin: 0, fontSize: '0.825rem', color: isStress ? '#7C2D12' : '#064E3B', lineHeight: 1.45 }}>
            {isStress
              ? `Forecast demand (${pointData.forecastLoadKW} kW) reaches 97% of rated 11kV/415V transformer capacity (450 kW). Extreme P90 bound reaches ${pointData.p90} kW.`
              : `Forecast load (${pointData.forecastLoadKW} kW) operates within safe N-1 thermal threshold (450 kW).`}
          </p>
        </div>

        {/* Causal Factors */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '8px', color: 'var(--color-forest-deep)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Primary Drivers (Physics & Behavioral)
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', borderRadius: '0px', background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)' }}>
              <Sun size={16} color="#F59E0B" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.825rem', display: 'block' }}>Solar Generation Ramps Down</strong>
                <p style={{ fontSize: '0.775rem', margin: 0, color: 'var(--color-charcoal-muted)' }}>
                  Rooftop solar generation drops from {pointData.solarGenKW > 0 ? `${pointData.solarGenKW} kW` : '140 kW at noon to 0 kW'}. The grid incomer must absorb full domestic cooling load.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px', borderRadius: '0px', background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)' }}>
              <TrendingUp size={16} color="#EF4444" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong style={{ fontSize: '0.825rem', display: 'block' }}>Evening Concurrency Peak</strong>
                <p style={{ fontSize: '0.775rem', margin: 0, color: 'var(--color-charcoal-muted)' }}>
                  Simultaneous residential cooling, EV charging, and domestic pump cycles peak between 18:30 and 21:00.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Model Evidence & Uncertainty */}
        <div>
          <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '8px', color: 'var(--color-forest-deep)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            AI Model Evidence & Confidence Bounds
          </h4>
          <div style={{ border: '1px solid var(--color-border-light)', borderRadius: '0px', padding: '10px', fontSize: '0.8rem', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--color-border-light)' }}>
              <span style={{ color: 'var(--color-charcoal-muted)' }}>Model Architecture</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>Solar-Nowcast-Satellite-DL v3.2</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--color-border-light)' }}>
              <span style={{ color: 'var(--color-charcoal-muted)' }}>P10 Conservative Load</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{pointData.p10} kW</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid var(--color-border-light)' }}>
              <span style={{ color: 'var(--color-charcoal-muted)' }}>P50 Expected Load</span>
              <strong style={{ fontFamily: 'var(--font-mono)' }}>{pointData.forecastLoadKW} kW</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 0' }}>
              <span style={{ color: 'var(--color-charcoal-muted)' }}>P90 Stress Bound</span>
              <strong style={{ color: '#DC2626', fontFamily: 'var(--font-mono)' }}>{pointData.p90} kW</strong>
            </div>
          </div>
        </div>

        {/* Recommended Action */}
        <div style={{ background: 'var(--color-forest-deep)', color: '#FFFFFF', padding: '14px', borderRadius: '0px', border: '1px solid rgba(255,255,255,0.1)' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-lime)', letterSpacing: '0.06em', fontFamily: 'var(--font-mono)' }}>
            OPTIMIZED MILP DISPATCH RECOMMENDATION
          </span>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-cream-dark)', margin: '6px 0 0 0', lineHeight: 1.45 }}>
            1. Dispatch 45 kW residential demand response (Shift & Earn).<br />
            2. Inject {pointData.batteryPowerKW > 0 ? `${pointData.batteryPowerKW} kW` : '120 kW'} from Community BESS.<br />
            3. Feeder peak clamped at 345 kW (N-1 safe zone).
          </p>
        </div>

        <SimulationBadge text="SIMULATED PROBABILITY ENGINE — NOT FIELD GUARANTEE" />
      </div>
    </div>
  );
}
