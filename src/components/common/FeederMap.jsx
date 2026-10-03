import React from 'react';
import { useNavigate } from 'react-router-dom';
import { StatusBadge } from './BadgesAndKpis';
import { MapPin, Zap, AlertTriangle, ArrowUpRight } from 'lucide-react';

export default function FeederMap({ feeders = [], selectedFeederId, onSelectFeeder }) {
  const navigate = useNavigate();

  return (
    <div style={{ background: '#0D231A', borderRadius: '0px', padding: '20px', border: '1px solid #1E3D30', color: '#FFFFFF' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-lime)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            GEOSPATIAL DISTRIBUTION NETWORK
          </span>
          <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', margin: 0, fontWeight: '700' }}>
            Delhi 66/11kV Substation Feeder Topology
          </h3>
        </div>
        <span style={{ fontSize: '0.725rem', color: 'var(--color-cream-dark)', fontFamily: 'var(--font-mono)' }}>
          CLICK FEEDER NODE TO VIEW REAL-TIME TELEMETRY
        </span>
      </div>

      {/* SVG Map Canvas */}
      <div style={{ width: '100%', overflowX: 'auto', background: '#091913', borderRadius: '0px', padding: '14px', border: '1px solid #1E3D30' }}>
        <svg viewBox="0 0 800 360" style={{ width: '100%', minWidth: '680px', height: 'auto' }}>
          {/* Background Grid & Substation Bus Lines */}
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
          </pattern>
          <rect width="800" height="360" fill="url(#grid)" />

          {/* Central Grid Substation */}
          <g>
            <rect x="360" y="150" width="80" height="60" rx="0" fill="#15382B" stroke="#00E676" strokeWidth="2" />
            <text x="400" y="175" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="var(--font-mono)">CENTRAL</text>
            <text x="400" y="192" textAnchor="middle" fill="#00E676" fontSize="9" fontFamily="var(--font-mono)">66/33kV</text>
          </g>

          {/* Feeder Connection Lines */}
          {/* F-402 (East - Mayur Vihar) */}
          <line x1="440" y1="180" x2="620" y2="120" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="6 3" />
          {/* F-108 (South - Lajpat Nagar) */}
          <line x1="400" y1="210" x2="520" y2="280" stroke="#F59E0B" strokeWidth="2" />
          {/* F-205 (North West - Rohini) */}
          <line x1="360" y1="160" x2="180" y2="90" stroke="#00E676" strokeWidth="2" />
          {/* F-312 (South West - Saket) */}
          <line x1="370" y1="200" x2="220" y2="290" stroke="#DC2626" strokeWidth="3" strokeDasharray="4 2" />

          {/* Feeder Nodes */}
          {feeders.map((feeder) => {
            const coords = {
              'F-402': { cx: 620, cy: 120, labelX: 635, labelY: 100 },
              'F-108': { cx: 520, cy: 280, labelX: 535, labelY: 260 },
              'F-205': { cx: 180, cy: 90,  labelX: 195, labelY: 70 },
              'F-312': { cx: 220, cy: 290, labelX: 235, labelY: 270 }
            }[feeder.id] || { cx: 300, cy: 150, labelX: 310, labelY: 150 };

            const isSelected = feeder.id === selectedFeederId;
            const nodeColor = feeder.status === 'Critical' ? '#DC2626' : feeder.status === 'Tight' ? '#EA580C' : feeder.status === 'Watch' ? '#D97706' : '#00E676';

            return (
              <g
                key={feeder.id}
                style={{ cursor: 'pointer' }}
                onClick={() => {
                  if (onSelectFeeder) onSelectFeeder(feeder.id);
                  else navigate('/discom/feeder');
                }}
              >
                {/* Square marker for technical look */}
                <rect
                  x={coords.cx - (isSelected ? 8 : 6)}
                  y={coords.cy - (isSelected ? 8 : 6)}
                  width={isSelected ? 16 : 12}
                  height={isSelected ? 16 : 12}
                  fill={nodeColor}
                  stroke="#FFFFFF"
                  strokeWidth={isSelected ? 2 : 1}
                />

                {/* Card Bubble for Node - Zero Radius */}
                <rect
                  x={coords.labelX}
                  y={coords.labelY}
                  width="160"
                  height="46"
                  rx="0"
                  fill="#15382B"
                  stroke={isSelected ? '#00E676' : '#1E3D30'}
                  strokeWidth={isSelected ? 1.5 : 1}
                />
                <text x={coords.labelX + 8} y={coords.labelY + 16} fill="#FFFFFF" fontSize="10" fontWeight="700">
                  {feeder.name}
                </text>
                <text x={coords.labelX + 8} y={coords.labelY + 32} fill={nodeColor} fontSize="9" fontFamily="var(--font-mono)" fontWeight="700">
                  {feeder.currentLoadKW}kW ({feeder.loadingPercentage}%) • {feeder.status.toUpperCase()}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Feeder Quick Summary Grid - Zero Radius */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '8px', marginTop: '14px' }}>
        {feeders.map(f => {
          const isSelected = f.id === selectedFeederId;
          return (
            <div
              key={f.id}
              onClick={() => {
                if (onSelectFeeder) onSelectFeeder(f.id);
                else navigate('/discom/feeder');
              }}
              style={{
                background: isSelected ? '#15382B' : '#091913',
                border: isSelected ? '1px solid var(--color-lime)' : '1px solid #1E3D30',
                borderRadius: '0px',
                padding: '10px 14px',
                cursor: 'pointer',
                transition: 'all 0.12s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.825rem' }}>{f.name}</strong>
                <StatusBadge status={f.status} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', color: 'var(--color-cream-dark)', fontFamily: 'var(--font-mono)' }}>
                <span>Load: {f.currentLoadKW} / {f.ratedCapacityKW} kW</span>
                <span style={{ color: 'var(--color-lime)', fontWeight: '700' }}>{f.loadingPercentage}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
