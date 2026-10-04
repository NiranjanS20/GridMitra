import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Battery, Sun, Zap, Building2, Shield, Activity, RefreshCw } from 'lucide-react';
import { StatusBadge } from './BadgesAndKpis';

export default function SingleLineDiagram({ bess, feeder, dispatchMode, onNodeSelect }) {
  const navigate = useNavigate();
  const [viewLayer, setViewLayer] = useState('energy'); // 'energy', 'telemetry', 'financial'

  return (
    <div className="card-dark" style={{ position: 'relative', overflow: 'hidden', borderRadius: '0px', border: '1px solid #1E3D30', background: '#0D231A' }}>
      {/* Header & Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-lime)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            CONTROL ROOM TELEMETRY
          </span>
          <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
            <Activity size={16} color="var(--color-lime)" />
            Substation Single-Line Diagram (SLD) — 11kV / 415V
          </h3>
        </div>

        {/* View Layer Selector - Zero Radius */}
        <div style={{ display: 'flex', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '0px', border: '1px solid rgba(255, 255, 255, 0.15)', padding: '0px' }}>
          {[
            { id: 'energy', label: '⚡ Power Flow (kW)' },
            { id: 'telemetry', label: '📡 IoT Protocol (L1-L4)' },
            { id: 'financial', label: '💰 Settlement (₹/kWh)' }
          ].map(layer => (
            <button
              key={layer.id}
              onClick={() => setViewLayer(layer.id)}
              style={{
                padding: '6px 12px',
                borderRadius: '0px',
                fontSize: '0.725rem',
                fontWeight: '700',
                background: viewLayer === layer.id ? 'var(--color-lime)' : 'transparent',
                color: viewLayer === layer.id ? '#091913' : '#FFFFFF',
                fontFamily: 'var(--font-mono)',
                transition: 'all 0.12s ease'
              }}
            >
              {layer.label}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Interactive Architecture */}
      <div style={{ width: '100%', overflowX: 'auto', padding: '10px 0' }}>
        <svg viewBox="0 0 900 360" style={{ width: '100%', minWidth: '780px', height: 'auto' }}>
          <defs>
            {/* Animated Flow Gradient */}
            <linearGradient id="flowGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00E676" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#39FF88" stopOpacity="1" />
              <stop offset="100%" stopColor="#00E676" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Busbars */}
          {/* 11kV Incomer Bus */}
          <line x1="120" y1="60" x2="780" y2="60" stroke="#00E676" strokeWidth="5" strokeLinecap="square" />
          <text x="130" y="45" fill="#00E676" fontSize="10" fontWeight="800" fontFamily="var(--font-mono)">11kV HIGH VOLTAGE INCOMER BUS</text>

          {/* 415V Low Voltage Microgrid Bus */}
          <line x1="120" y1="200" x2="780" y2="200" stroke="#00E676" strokeWidth="5" strokeLinecap="square" />
          <text x="130" y="225" fill="#00E676" fontSize="10" fontWeight="800" fontFamily="var(--font-mono)">415V THREE-PHASE NEIGHBOURHOOD BUS (LT)</text>

          {/* Transformer Connection: 11kV -> DT-04 -> 415V */}
          <line x1="450" y1="60" x2="450" y2="120" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="450" cy="130" r="14" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <circle cx="450" cy="150" r="14" fill="none" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="450" y1="164" x2="450" y2="200" stroke="#FFFFFF" strokeWidth="2" />
          <text x="475" y="145" fill="#E2DDD3" fontSize="10" fontWeight="700">
            DT-04 (450 kVA / 11kV to 415V)
          </text>
          <text x="475" y="160" fill="#F59E0B" fontSize="9" fontFamily="var(--font-mono)">
            Loading: 76% | Temp: 64.5°C
          </text>

          {/* Node 1: Upstream Grid Incomer (Left) */}
          <g
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/discom/feeder')}
          >
            <rect x="50" y="30" width="120" height="60" rx="0" fill="#15382B" stroke="#00E676" strokeWidth="1.5" />
            <text x="110" y="55" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">BSES Substation</text>
            <text x="110" y="73" textAnchor="middle" fill="#00E676" fontSize="9" fontFamily="var(--font-mono)">11.0 kV | 50.02 Hz</text>
          </g>

          {/* Node 2: Community BESS (Center Left) */}
          <g
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/operator/battery')}
          >
            <line x1="220" y1="200" x2="220" y2="260" stroke="#00E676" strokeWidth="2" strokeDasharray="4 2" />
            <rect x="150" y="260" width="140" height="75" rx="0" fill="#15382B" stroke="#00E676" strokeWidth="1.5" />
            <text x="220" y="285" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">Community BESS</text>
            <text x="220" y="303" textAnchor="middle" fill="#00E676" fontSize="10" fontWeight="800" fontFamily="var(--font-mono)">
              SOC: {bess?.currentSOCPercentage || 72}% (360 kWh)
            </text>
            <text x="220" y="320" textAnchor="middle" fill="#7A8E85" fontSize="9">
              {viewLayer === 'energy' ? 'Inverter: 250 kW Standby' : viewLayer === 'telemetry' ? 'Modbus TCP / CAN 2.0' : 'Arbitrage: ₹3.40/kWh'}
            </text>
          </g>

          {/* Node 3: Rooftop Solar PV (Center Right) */}
          <g
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/operator/forecast')}
          >
            <line x1="450" y1="200" x2="450" y2="260" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
            <rect x="380" y="260" width="140" height="75" rx="0" fill="#15382B" stroke="#F59E0B" strokeWidth="1.5" />
            <text x="450" y="285" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">Rooftop Solar PV</text>
            <text x="450" y="303" textAnchor="middle" fill="#F59E0B" fontSize="10" fontWeight="800" fontFamily="var(--font-mono)">
              48 Systems (145 kW)
            </text>
            <text x="450" y="320" textAnchor="middle" fill="#7A8E85" fontSize="9">
              {viewLayer === 'energy' ? 'Gen: 130 kW (Noon)' : viewLayer === 'telemetry' ? 'SunSpec Inverter API' : 'Feed-in: ₹3.80/kWh'}
            </text>
          </g>

          {/* Node 4: Residential Neighborhood Loads (Right) */}
          <g
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/operator/members')}
          >
            <line x1="680" y1="200" x2="680" y2="260" stroke="#3B82F6" strokeWidth="2" />
            <rect x="610" y="260" width="140" height="75" rx="0" fill="#15382B" stroke="#3B82F6" strokeWidth="1.5" />
            <text x="680" y="285" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">280 Households</text>
            <text x="680" y="303" textAnchor="middle" fill="#60A5FA" fontSize="10" fontWeight="800" fontFamily="var(--font-mono)">
              Load: 342 kW
            </text>
            <text x="680" y="320" textAnchor="middle" fill="#7A8E85" fontSize="9">
              {viewLayer === 'energy' ? 'DR Flex: 45 kW ready' : viewLayer === 'telemetry' ? 'DLMS/COSEM Smart Meter' : 'DR Incentive: ₹8.50/kWh'}
            </text>
          </g>
        </svg>
      </div>

      {/* Interactive Legend Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #1E3D30', paddingTop: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', color: 'var(--color-cream-dark)', fontFamily: 'var(--font-mono)' }}>
          <span>DISPATCH: <strong style={{ color: 'var(--color-lime)' }}>{dispatchMode}</strong></span>
          <span>PF: <strong style={{ color: '#FFFFFF' }}>0.98 LAG</strong></span>
          <span>FREQ: <strong style={{ color: '#FFFFFF' }}>50.02 HZ</strong></span>
        </div>
        <button
          onClick={() => navigate('/operator/dispatch')}
          className="btn btn-lime btn-sm"
        >
          Dispatch Controls & Overrides →
        </button>
      </div>
    </div>
  );
}
