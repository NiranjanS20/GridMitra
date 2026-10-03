import React from 'react';
import { SimulationBadge } from './BadgesAndKpis';
import { ArrowRight, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function BeforeAfterComparison({ scenario, mode = 'split' }) {
  if (!scenario) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Simulation Banner Notice */}
      <div className="sim-disclaimer-banner" style={{ borderRadius: '0px' }}>
        <span>⚠️ SIMULATED POWER FLOW & DISPATCH RESULTS — NOT FIELD MEASUREMENTS</span>
      </div>

      {/* Side-by-Side Comparison Container */}
      <div style={{ display: 'grid', gridTemplateColumns: mode === 'split' ? 'repeat(auto-fit, minmax(320px, 1fr))' : '1fr', gap: '16px' }}>
        {/* Baseline (Without Mohalla Grid) */}
        {(mode === 'split' || mode === 'baseline') && (
          <div style={{ background: '#FFF7ED', border: '1px solid #FDBA74', borderRadius: '0px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: '#9A3412', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                  STANDARD FEEDER BASELINE
                </span>
                <h3 style={{ margin: '2px 0 0 0', color: '#7C2D12', fontSize: '1.2rem', fontWeight: '700' }}>
                  Without Mohalla Grid
                </h3>
              </div>
              <span style={{ padding: '3px 8px', borderRadius: '0px', background: '#FFEDD5', border: '1px solid #FDBA74', color: '#C2410C', fontSize: '0.7rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                UNMANAGED
              </span>
            </div>

            <p style={{ fontSize: '0.825rem', color: '#9A3412', margin: 0, lineHeight: 1.45 }}>
              No predictive nowcasting, uncoordinated residential cooling peaks, no community storage buffer, and reliance on expensive diesel gen-sets.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #FED7AA', paddingTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#7C2D12' }}>Outage Hours (Week)</span>
                <strong style={{ fontSize: '1.05rem', color: '#DC2626', fontFamily: 'var(--font-mono)' }}>{scenario.baseline.outageHoursWeek} hrs</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#7C2D12' }}>Critical Load Availability</span>
                <strong style={{ fontSize: '1.05rem', color: '#DC2626', fontFamily: 'var(--font-mono)' }}>{scenario.baseline.criticalLoadAvailabilityPercentage}%</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#7C2D12' }}>Peak Feeder Overload</span>
                <strong style={{ fontSize: '1.05rem', color: '#DC2626', fontFamily: 'var(--font-mono)' }}>{scenario.baseline.peakFeederOverloadPercentage}%</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#7C2D12' }}>Transformer Max Temp</span>
                <strong style={{ fontSize: '1.05rem', color: '#DC2626', fontFamily: 'var(--font-mono)' }}>{scenario.baseline.transformerMaxTempC}°C</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#7C2D12' }}>Diesel Run Time & Cost</span>
                <strong style={{ fontSize: '1.05rem', color: '#DC2626', fontFamily: 'var(--font-mono)' }}>₹{scenario.baseline.dieselCostTotalINR.toLocaleString()} ({scenario.baseline.dieselGenRunHours}h)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#7C2D12' }}>Voltage Violations</span>
                <strong style={{ fontSize: '1.05rem', color: '#DC2626', fontFamily: 'var(--font-mono)' }}>{scenario.baseline.voltageViolationsCount} events</strong>
              </div>
            </div>
          </div>
        )}

        {/* Mohalla Grid Intervention */}
        {(mode === 'split' || mode === 'mohalla') && (
          <div style={{ background: '#ECFDF5', border: '1px solid #86EFAC', borderRadius: '0px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: '#065F46', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
                  SMART COOPERATIVE MICROGRID
                </span>
                <h3 style={{ margin: '2px 0 0 0', color: '#064E3B', fontSize: '1.2rem', fontWeight: '700' }}>
                  With Mohalla Grid
                </h3>
              </div>
              <span style={{ padding: '3px 8px', borderRadius: '0px', background: '#D1FAE5', border: '1px solid #86EFAC', color: '#047857', fontSize: '0.7rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                PROTECTED
              </span>
            </div>

            <p style={{ fontSize: '0.825rem', color: '#065F46', margin: 0, lineHeight: 1.45 }}>
              AI solar/load nowcasting, automated demand response incentives, 500 kWh micro-BESS support, and life-support lock protection.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #A7F3D0', paddingTop: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#064E3B' }}>Outage Hours (Week)</span>
                <strong style={{ fontSize: '1.05rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>
                  {scenario.mohallaGrid.outageHoursWeek} hrs
                  <span style={{ fontSize: '0.725rem', marginLeft: '6px', color: '#059669', fontWeight: '700' }}>({scenario.deltas.outageReductionPercentage})</span>
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#064E3B' }}>Critical Load Availability</span>
                <strong style={{ fontSize: '1.05rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>
                  {scenario.mohallaGrid.criticalLoadAvailabilityPercentage}%
                  <span style={{ fontSize: '0.725rem', marginLeft: '6px', color: '#059669', fontWeight: '700' }}>({scenario.deltas.criticalAvailabilityImprovement})</span>
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#064E3B' }}>Peak Feeder Overload</span>
                <strong style={{ fontSize: '1.05rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>{scenario.mohallaGrid.peakFeederOverloadPercentage}%</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#064E3B' }}>Transformer Max Temp</span>
                <strong style={{ fontSize: '1.05rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>{scenario.mohallaGrid.transformerMaxTempC}°C (Nominal)</strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#064E3B' }}>Diesel Run Time & Cost</span>
                <strong style={{ fontSize: '1.05rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>
                  ₹{scenario.mohallaGrid.dieselCostTotalINR.toLocaleString()}
                  <span style={{ fontSize: '0.725rem', marginLeft: '6px', color: '#059669', fontWeight: '700' }}>(-{scenario.deltas.dieselSavingsINR})</span>
                </strong>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: '#064E3B' }}>Voltage Violations</span>
                <strong style={{ fontSize: '1.05rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>{scenario.mohallaGrid.voltageViolationsCount} events (-93%)</strong>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Causal Chain Explanation Cards */}
      <div className="card" style={{ background: '#FFFFFF', borderRadius: '0px' }}>
        <h4 style={{ fontSize: '0.95rem', color: 'var(--color-forest-deep)', marginBottom: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Why did this change happen? (The 4-Stage Operating Chain)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {scenario.causalChain.map((step, idx) => (
            <div key={idx} style={{ background: 'var(--color-cream-surface)', padding: '14px', borderRadius: '0px', border: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: '800', color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: '4px', fontFamily: 'var(--font-mono)' }}>
                {step.step}
              </span>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.4 }}>
                {step.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
