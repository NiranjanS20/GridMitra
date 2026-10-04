import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Layers, Zap, Activity, AlertTriangle, ShieldCheck, ArrowRight, Gauge, Radio } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function DiscomFeederDetail() {
  const navigate = useNavigate();
  const { selectedFeeder, triggerFeederDR } = useApp();

  const voltageNodes = [
    { node: 'Node 0 (Substation Bus)', distanceKm: 0.0, voltageKV: 11.02, nominalKV: 11.0, dropPercentage: '+0.1%' },
    { node: 'Node 1 (Pocket 1 Ingress)', distanceKm: 0.8, voltageKV: 10.94, nominalKV: 11.0, dropPercentage: '-0.5%' },
    { node: 'Node 2 (Transformer DT-04)', distanceKm: 1.4, voltageKV: 10.86, nominalKV: 11.0, dropPercentage: '-1.3%' },
    { node: 'Node 3 (Block A & B)', distanceKm: 2.1, voltageKV: 10.78, nominalKV: 11.0, dropPercentage: '-2.0%' },
    { node: 'Node 4 (Tail End Block C)', distanceKm: 2.9, voltageKV: 10.65, nominalKV: 11.0, dropPercentage: '-3.2%' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#2A8C90' }}>
            Feeder Infrastructure Intelligence
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            {selectedFeeder.name} ({selectedFeeder.id})
          </h1>
          <span style={{ fontSize: '0.85rem', color: '#8E9B95' }}>
            {selectedFeeder.discom} • Substation: {selectedFeeder.substation}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <StatusBadge status={selectedFeeder.status} />
          <button
            onClick={() => {
              triggerFeederDR(selectedFeeder.id, 45.0);
              navigate('/discom/dr');
            }}
            className="btn btn-lime btn-sm"
          >
            Dispatch Emergency DR →
          </button>
        </div>
      </div>

      {/* Primary Telemetry Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Active Feeder Load</span>
          <h3 style={{ fontSize: '1.85rem', color: '#FFFFFF', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{selectedFeeder.currentLoadKW} kW</h3>
          <span style={{ fontSize: '0.75rem', color: '#F97316' }}>{selectedFeeder.loadingPercentage}% of {selectedFeeder.ratedCapacityKW} kW</span>
        </div>

        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Tail Bus Voltage</span>
          <h3 style={{ fontSize: '1.85rem', color: '#F59E0B', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{selectedFeeder.voltageProfileKV} kV</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Nominal 11.0 kV (Sag Warning)</span>
        </div>

        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Technical Losses</span>
          <h3 style={{ fontSize: '1.85rem', color: '#60A5FA', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{selectedFeeder.lossPercentage}%</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)' }}>Reduced by rooftop solar injection</span>
        </div>

        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Transformer Health</span>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--color-lime-bright)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{selectedFeeder.transformerHealth}%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Oil Temp: 64.5°C (Safe)</span>
        </div>
      </div>

      {/* 11kV VOLTAGE SAG PROFILE DOWN THE FEEDER */}
      <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
              Voltage Profile Along 11kV Line Distance
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
              DERC allowable voltage limit: 10.45 kV – 11.55 kV (±5%)
            </span>
          </div>
          <span style={{ color: 'var(--color-lime)', fontSize: '0.8rem', fontWeight: '600' }}>
            DERC Compliant
          </span>
        </div>

        <div className="table-container" style={{ background: '#081214', border: '1px solid #1E3A3E' }}>
          <table className="data-table" style={{ color: '#FFFFFF' }}>
            <thead>
              <tr style={{ background: '#102226' }}>
                <th style={{ color: '#FFFFFF' }}>Feeder Node</th>
                <th style={{ color: '#FFFFFF' }}>Distance (km)</th>
                <th style={{ color: '#FFFFFF' }}>Measured Voltage</th>
                <th style={{ color: '#FFFFFF' }}>Nominal (kV)</th>
                <th style={{ color: '#FFFFFF' }}>Delta (%)</th>
                <th style={{ color: '#FFFFFF' }}>Grid Compliance</th>
              </tr>
            </thead>
            <tbody>
              {voltageNodes.map((vn, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1E3A3E' }}>
                  <td><strong>{vn.node}</strong></td>
                  <td>{vn.distanceKm} km</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: vn.voltageKV < 10.7 ? '#F59E0B' : 'var(--color-lime)' }}>
                    {vn.voltageKV} kV
                  </td>
                  <td>{vn.nominalKV} kV</td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: '#8E9B95' }}>{vn.dropPercentage}</td>
                  <td><StatusBadge status="Steady (Normal)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
