import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Battery, ShieldCheck, Zap, Heart, Lock, RefreshCw, ArrowRight } from 'lucide-react';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function ResidentBattery() {
  const { currentResident, batteryState } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Shared Clean Storage
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Community Battery (Micro-BESS)
          </h1>
        </div>
        <SimulationBadge text="500 kWh LFP CONTAINER" />
      </div>

      {/* MAIN BATTERY VISUALIZATION CARD */}
      <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)', letterSpacing: '0.05em' }}>
              Substation Storage Enclosure
            </span>
            <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', margin: 0 }}>
              {batteryState.name}
            </h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-dark)' }}>
              {batteryState.chemistry} • 500 kWh / 250 kW Inverter Rating
            </span>
          </div>
          <StatusBadge status={batteryState.state} />
        </div>

        {/* Large SOC Progress Bar */}
        <div style={{ background: 'rgba(0, 0, 0, 0.4)', padding: '20px', borderRadius: '14px', border: '1px solid var(--color-border-dark)' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--color-cream-dark)' }}>State of Charge (SOC)</span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
              <strong style={{ fontSize: '2rem', color: 'var(--color-lime-bright)', fontFamily: 'var(--font-mono)' }}>
                {batteryState.currentSOCPercentage}%
              </strong>
              <span style={{ fontSize: '1rem', color: '#8E9B95' }}>
                ({batteryState.currentSOCKWh} / {batteryState.totalCapacityKWh} kWh)
              </span>
            </div>
          </div>

          {/* Bar */}
          <div style={{ width: '100%', height: '24px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '12px', overflow: 'hidden', position: 'relative' }}>
            <div
              style={{
                width: `${batteryState.currentSOCPercentage}%`,
                height: '100%',
                background: 'linear-gradient(90deg, #10B981 0%, #34D399 100%)',
                borderRadius: '12px',
                transition: 'width 0.5s ease'
              }}
            />
            {/* 20% Life Support Minimum Line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: '20%',
                width: '2px',
                background: '#EF4444',
                zIndex: 10
              }}
              title="20% Minimum Life-Support Reserve Floor"
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8E9B95', marginTop: '6px' }}>
            <span style={{ color: '#EF4444', fontWeight: '700' }}>▲ 20% Life-Support Lock</span>
            <span>Usable Capacity: {batteryState.usableCapacityKWh} kWh</span>
            <span>100% Full</span>
          </div>
        </div>

        {/* Resident's Personal Allocation Slice */}
        <div style={{ background: '#143527', border: '1.5px solid #34D399', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)', textTransform: 'uppercase', fontWeight: '700' }}>
              Your Guaranteed Fair-Share Slice
            </span>
            <h4 style={{ fontSize: '1.2rem', color: '#FFFFFF', margin: '2px 0 0 0' }}>
              {currentResident.batteryAllocationKWh} kWh Reserved for Your Flat
            </h4>
            <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-dark)' }}>
              Supports your refrigerator and lights for ~3.4 continuous hours during grid blackout.
            </span>
          </div>
          <Link to="/resident/loads" className="btn btn-lime btn-sm">
            Adjust Protected Loads →
          </Link>
        </div>
      </div>

      {/* COMMUNITY ALLOCATION BREAKDOWN (PRIVACY PRESERVING) */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
              Cooperative Storage Capacity Allocation
            </h3>
            <p style={{ fontSize: '0.825rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Governed democratically by Mayur Vihar Urja Sahakari Samiti bylaws.
            </p>
          </div>
          <Link to="/cooperative" style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--color-forest)' }}>
            Cooperative Governance →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '16px' }}>
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: '#991B1B', fontWeight: '700', textTransform: 'uppercase' }}>
              Life-Support Reserve
            </span>
            <strong style={{ fontSize: '1.25rem', color: '#B91C1C', display: 'block', fontFamily: 'var(--font-mono)' }}>
              80 kWh
            </strong>
            <span style={{ fontSize: '0.75rem', color: '#7F1D1D' }}>Oxygen & Dialysis Priority</span>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: '700', textTransform: 'uppercase' }}>
              Residential Fair-Share
            </span>
            <strong style={{ fontSize: '1.25rem', color: '#15803D', display: 'block', fontFamily: 'var(--font-mono)' }}>
              180 kWh
            </strong>
            <span style={{ fontSize: '0.75rem', color: '#14532D' }}>Shared across 280 homes</span>
          </div>

          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '8px', padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: '#1E40AF', fontWeight: '700', textTransform: 'uppercase' }}>
              Commercial / Shops
            </span>
            <strong style={{ fontSize: '1.25rem', color: '#1D4ED8', display: 'block', fontFamily: 'var(--font-mono)' }}>
              60 kWh
            </strong>
            <span style={{ fontSize: '0.75rem', color: '#1E3A8A' }}>Local pharmacy & clinic</span>
          </div>

          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '12px' }}>
            <span style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: '700', textTransform: 'uppercase' }}>
              Grid Support Margin
            </span>
            <strong style={{ fontSize: '1.25rem', color: '#B45309', display: 'block', fontFamily: 'var(--font-mono)' }}>
              40 kWh
            </strong>
            <span style={{ fontSize: '0.75rem', color: '#78350F' }}>Feeder voltage regulation</span>
          </div>
        </div>

        {/* Privacy Note */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
          <Lock size={14} color="var(--color-forest)" />
          <span>Privacy Guarantee: Individual household consumption is never displayed to other members. Only collective aggregated allocations are published.</span>
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/resident/shift" className="btn btn-secondary">
          ← Back to Shift & Earn
        </Link>
        <Link to="/resident/wallet" className="btn btn-primary">
          Check Wallet & Billing →
        </Link>
      </div>
    </div>
  );
}
