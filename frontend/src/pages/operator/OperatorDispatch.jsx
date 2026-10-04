import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Sliders, AlertTriangle, ShieldCheck, Battery, Zap, Clock, Lock, CheckCircle2 } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function OperatorDispatch() {
  const { batteryState, dispatchMode, batteryOverride, applyBatteryOverride, clearBatteryOverride } = useApp();
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [overrideMode, setOverrideMode] = useState('Discharge');
  const [overridePower, setOverridePower] = useState(140);
  const [overrideDuration, setOverrideDuration] = useState(60);
  const [overrideReason, setOverrideReason] = useState('Pre-empting convective cloud front detected over East Delhi feeder');

  const handleConfirmOverride = () => {
    applyBatteryOverride({
      mode: overrideMode,
      powerKW: Number(overridePower),
      durationMinutes: Number(overrideDuration),
      reason: overrideReason
    });
    setShowOverrideModal(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)' }}>
            Microgrid Actuation & Optimization
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Dispatch & Automated Controls
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SimulationBadge text="OPTIMAL DISPATCH ENGINE" />
          <Link to="/admin/audit" style={{ fontSize: '0.8rem', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}>
            View Audit Log →
          </Link>
        </div>
      </div>

      {/* ACTIVE DISPATCH STATE BANNER */}
      <div
        className="card-dark"
        style={{
          border: batteryOverride ? '2px solid #F59E0B' : '1px solid #10B981',
          background: batteryOverride ? 'rgba(245, 158, 11, 0.1)' : '#143527',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: batteryOverride ? '#FEF3C7' : '#DCFCE7',
              color: batteryOverride ? '#D97706' : '#16A34A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {batteryOverride ? <AlertTriangle size={24} /> : <ShieldCheck size={24} />}
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: batteryOverride ? '#F59E0B' : 'var(--color-lime)' }}>
              Current Operating Status
            </span>
            <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', margin: '2px 0 0 0' }}>
              {dispatchMode}
            </h2>
            {batteryOverride && (
              <span style={{ fontSize: '0.8rem', color: '#FDE68A', display: 'block', marginTop: '4px' }}>
                Active Reason: {batteryOverride.reason} • Started: {batteryOverride.timestamp} ({batteryOverride.durationMinutes}m duration)
              </span>
            )}
          </div>
        </div>

        <div>
          {batteryOverride ? (
            <button onClick={clearBatteryOverride} className="btn btn-secondary btn-md">
              Release Override & Resume Auto-MILP
            </button>
          ) : (
            <button onClick={() => setShowOverrideModal(true)} className="btn btn-lime btn-md">
              Engage Manual Operator Override
            </button>
          )}
        </div>
      </div>

      {/* MILP ROLLING SCHEDULE & CONSTRAINTS */}
      <div className="card-dark">
        <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '16px' }}>
          Autonomous MILP Dispatch Rules & Physical Hard Constraints
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '14px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Constraint 1 • Life Support</span>
            <strong style={{ fontSize: '1rem', color: '#FFFFFF', display: 'block', margin: '4px 0' }}>20% SOC Hard Floor</strong>
            <p style={{ fontSize: '0.8rem', color: '#8E9B95', margin: 0 }}>
              Permanent 100 kWh battery block reserved for medical equipment. Physically non-dispatchable by economic solver.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '14px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Constraint 2 • Transformer Ampacity</span>
            <strong style={{ fontSize: '1rem', color: '#FFFFFF', display: 'block', margin: '4px 0' }}>450 kVA Thermal Cap</strong>
            <p style={{ fontSize: '0.8rem', color: '#8E9B95', margin: 0 }}>
              Feeder DT-04 loading restricted below 88% continuous to prevent oil breakdown and thermal trip.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '14px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Constraint 3 • Cycle Degradation</span>
            <strong style={{ fontSize: '1rem', color: '#FFFFFF', display: 'block', margin: '4px 0' }}>Max 1.2 Full Cycles/Day</strong>
            <p style={{ fontSize: '0.8rem', color: '#8E9B95', margin: 0 }}>
              Preserves 10-year LFP cell warranty life (98.2% SOH maintained after 842 cycles).
            </p>
          </div>
        </div>
      </div>

      {/* OVERRIDE MODAL */}
      {showOverrideModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10002,
            padding: '16px'
          }}
        >
          <div
            className="card-dark"
            style={{
              maxWidth: '520px',
              width: '100%',
              background: '#0D231A',
              border: '2px solid var(--color-lime)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertTriangle size={24} color="#F59E0B" />
              <div>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
                  Manual Dispatch Override
                </h3>
                <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>
                  This action will be permanently recorded in the cryptographic audit log.
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.8rem', color: '#8E9B95', display: 'block', marginBottom: '4px' }}>
                  Override Dispatch Mode
                </label>
                <select
                  value={overrideMode}
                  onChange={(e) => setOverrideMode(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B4534', color: '#FFFFFF', border: '1px solid #2C6B52', fontSize: '0.9rem' }}
                >
                  <option value="Discharge">Forced Discharge (Grid Support)</option>
                  <option value="Charge">Forced Charge (Solar Absorption)</option>
                  <option value="Standby">Forced Standby (Preserve Capacity)</option>
                  <option value="Islanded">Island Microgrid (Disconnect 11kV Incomer)</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', color: '#8E9B95', display: 'block', marginBottom: '4px' }}>
                    Target Power (kW)
                  </label>
                  <input
                    type="number"
                    value={overridePower}
                    onChange={(e) => setOverridePower(e.target.value)}
                    min={0}
                    max={250}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B4534', color: '#FFFFFF', border: '1px solid #2C6B52', fontFamily: 'var(--font-mono)' }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', color: '#8E9B95', display: 'block', marginBottom: '4px' }}>
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={overrideDuration}
                    onChange={(e) => setOverrideDuration(e.target.value)}
                    min={15}
                    max={240}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B4534', color: '#FFFFFF', border: '1px solid #2C6B52', fontFamily: 'var(--font-mono)' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.8rem', color: '#8E9B95', display: 'block', marginBottom: '4px' }}>
                  Mandatory Operational Justification (Audit Log)
                </label>
                <textarea
                  value={overrideReason}
                  onChange={(e) => setOverrideReason(e.target.value)}
                  rows={2}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#1B4534', color: '#FFFFFF', border: '1px solid #2C6B52', fontSize: '0.85rem' }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '8px' }}>
              <button onClick={() => setShowOverrideModal(false)} className="btn btn-secondary btn-sm">
                Cancel
              </button>
              <button onClick={handleConfirmOverride} className="btn btn-lime btn-sm">
                Confirm & Log Override →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
