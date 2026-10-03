import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sliders, ShieldCheck, Zap, Battery, AlertCircle, Info, RefreshCw } from 'lucide-react';
import { SimulationBadge, StatusBadge } from '../../components/common/BadgesAndKpis';

export default function ResidentLoads() {
  const { currentResident, residentLoads, toggleLoadProtection, residentTier } = useApp();

  const protectedLoads = residentLoads.filter(l => l.defaultProtected);
  const flexibleLoads = residentLoads.filter(l => !l.defaultProtected);

  const totalProtectedWatts = protectedLoads.reduce((acc, l) => acc + l.powerWatts, 0);
  const totalFlexibleWatts = flexibleLoads.reduce((acc, l) => acc + l.powerWatts, 0);

  // Battery runtime estimate on 2.4 kWh allocation
  const estimatedHours = totalProtectedWatts > 0 ? ((currentResident.batteryAllocationKWh * 1000 * 0.9) / totalProtectedWatts).toFixed(1) : '∞';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Household Circuit Prioritization
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            My Loads & Priorities
          </h1>
        </div>
        <SimulationBadge text="SMART RELAY CONTROLLER (WF-13)" />
      </div>

      {/* Summary Banner */}
      <div className="card" style={{ background: 'var(--color-forest)', color: '#FFFFFF', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-cream-dark)', textTransform: 'uppercase' }}>Active Reliability Tier</span>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-lime)', margin: '4px 0 0 0' }}>{residentTier} Tier</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-dark)' }}>{currentResident.batteryAllocationKWh} kWh Reserve Allocation</span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-cream-dark)', textTransform: 'uppercase' }}>Protected Power Draw</span>
          <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: '4px 0 0 0', fontFamily: 'var(--font-mono)' }}>{totalProtectedWatts} Watts</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-dark)' }}>{protectedLoads.length} Critical Circuits</span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-cream-dark)', textTransform: 'uppercase' }}>Est. Islanding Runtime</span>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-lime-bright)', margin: '4px 0 0 0', fontFamily: 'var(--font-mono)' }}>~{estimatedHours} Hours</h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-dark)' }}>On 90% Depth of Discharge</span>
        </div>
      </div>

      {/* Interactive Load Manager */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
              Connected Household Circuits
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Toggle any circuit to add or remove it from your microgrid islanding protection list.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {residentLoads.map(load => {
            const isProtected = load.defaultProtected;
            return (
              <div
                key={load.id}
                onClick={() => toggleLoadProtection(load.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  borderRadius: '12px',
                  border: isProtected ? '1.5px solid #10B981' : '1px solid var(--color-border-light)',
                  background: isProtected ? '#F0FDF4' : '#FFFFFF',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '6px',
                      background: isProtected ? 'var(--color-lime)' : '#E5E7EB',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isProtected ? '#032E16' : '#9CA3AF'
                    }}
                  >
                    {isProtected && <ShieldCheck size={16} />}
                  </div>

                  <div>
                    <strong style={{ fontSize: '1rem', color: isProtected ? '#166534' : 'var(--color-charcoal)' }}>
                      {load.name}
                    </strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.775rem', color: 'var(--color-charcoal-muted)', marginTop: '2px' }}>
                      <span style={{ padding: '2px 6px', borderRadius: '4px', background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)' }}>
                        {load.category}
                      </span>
                      <span style={{ fontFamily: 'var(--font-mono)' }}>{load.powerWatts} W</span>
                      <span>• Status: {load.status}</span>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      background: isProtected ? '#DCFCE7' : '#F3F4F6',
                      color: isProtected ? '#15803D' : '#6B7280'
                    }}
                  >
                    {isProtected ? 'PROTECTED' : 'FLEXIBLE'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/resident/today" className="btn btn-secondary">
          ← Back to Today (WF-11)
        </Link>
        <Link to="/resident/shift" className="btn btn-primary">
          Participate in Shift & Earn (WF-14) →
        </Link>
      </div>
    </div>
  );
}
