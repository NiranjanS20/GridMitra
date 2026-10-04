import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Users, ShieldCheck, Lock, Award, Zap, Sliders } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function OperatorMembers() {
  const { currentResident } = useApp();

  const blocks = [
    { block: 'Block A (Pocket 1)', households: 80, tierDist: '12 Essential • 54 Standard • 14 Premium', solarCapKW: 48.0, drParticipation: '74%', status: 'Normal' },
    { block: 'Block B (Pocket 1)', households: 72, tierDist: '10 Essential • 48 Standard • 14 Premium', solarCapKW: 42.5, drParticipation: '71%', status: 'Normal' },
    { block: 'Block C (Pocket 2)', households: 68, tierDist: '18 Essential • 42 Standard • 8 Premium', solarCapKW: 31.0, drParticipation: '63%', status: 'Watch (Meter SM-105)' },
    { block: 'Pocket 2 Villas & Shops', households: 60, tierDist: '14 Essential • 40 Standard • 6 Premium', solarCapKW: 23.5, drParticipation: '68%', status: 'Normal' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)' }}>
            Consumer Roster & Tier Enrollment
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Members & Reliability Tiers
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SimulationBadge text="280 CONNECTED HOMES" />
          <Link to="/operator/fairness" style={{ fontSize: '0.8rem', color: 'var(--color-lime)', textDecoration: 'underline' }}>
            Fairness Metrics →
          </Link>
        </div>
      </div>

      {/* Aggregate Enrollment Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Total Connected Members</span>
          <h3 style={{ fontSize: '1.85rem', color: '#FFFFFF', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>280 Homes</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)' }}>100% Smart Meter Coverage</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Standard Tier Enrolled</span>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--color-lime-bright)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>184 (65.7%)</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>2.4 kWh battery allocation</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Essential Life-Support Tier</span>
          <h3 style={{ fontSize: '1.85rem', color: '#60A5FA', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>54 (19.3%)</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Protected medical equipment</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Active DR Enrolled</span>
          <h3 style={{ fontSize: '1.85rem', color: '#F59E0B', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>194 (69.3%)</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>45 kW flexible capacity</span>
        </div>
      </div>

      {/* Aggregated Feeder Blocks (Privacy Preserved) */}
      <div className="card-dark">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
              Mayur Vihar Substation Block Aggregations
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
              Individual household privacy protected by cryptographic boundary.
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-lime)' }}>
            <Lock size={14} /> Zero Private Telemetry Exposed
          </div>
        </div>

        <div className="table-container" style={{ background: '#0D231A', border: '1px solid var(--color-border-dark)' }}>
          <table className="data-table" style={{ color: '#FFFFFF' }}>
            <thead>
              <tr style={{ background: '#143527' }}>
                <th style={{ color: '#FFFFFF' }}>Feeder Block</th>
                <th style={{ color: '#FFFFFF' }}>Households</th>
                <th style={{ color: '#FFFFFF' }}>Tier Composition</th>
                <th style={{ color: '#FFFFFF' }}>Solar Capacity</th>
                <th style={{ color: '#FFFFFF' }}>DR Participation</th>
                <th style={{ color: '#FFFFFF' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((b, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1F4A37' }}>
                  <td><strong>{b.block}</strong></td>
                  <td>{b.households}</td>
                  <td style={{ fontSize: '0.8rem', color: '#E2DDD3' }}>{b.tierDist}</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: '#F59E0B' }}>{b.solarCapKW} kWp</td>
                  <td><strong style={{ color: 'var(--color-lime)' }}>{b.drParticipation}</strong></td>
                  <td><StatusBadge status={b.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
