import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Battery, BatteryCharging, Thermometer, ShieldCheck, Activity, AlertCircle, Wrench } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function OperatorBatteryHealth() {
  const { batteryState } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)' }}>
            Physical Storage Telemetry & BMS
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Battery Health & Diagnostics
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SimulationBadge text="BMS CAN TELEMETRY (WF-24)" />
          <Link to="/operator/tickets" style={{ fontSize: '0.8rem', color: 'var(--color-lime)', textDecoration: 'underline' }}>
            Maintenance Tickets (WF-26) →
          </Link>
        </div>
      </div>

      {/* Core Physical Health KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>State of Health (SOH)</span>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--color-lime-bright)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{batteryState.healthSOH}%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Minimal degradation (842 cycles)</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Pack Average Temp</span>
          <h3 style={{ fontSize: '1.85rem', color: '#FFFFFF', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{batteryState.avgCellTempC}°C</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)' }}>Chiller active • Max 30.1°C</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Round-Trip Efficiency</span>
          <h3 style={{ fontSize: '1.85rem', color: '#60A5FA', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{batteryState.efficiencyRoundTrip}%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>DC-DC Inverter Stage</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Pack DC Voltage</span>
          <h3 style={{ fontSize: '1.85rem', color: '#F59E0B', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>{batteryState.packVoltageV} V</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Nominal 52.8V (16S Configuration)</span>
        </div>
      </div>

      {/* CELL MODULE TELEMETRY TABLE */}
      <div className="card-dark">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
              Individual LFP Cell Module Telemetry
            </h3>
            <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
              High-precision cell monitoring via CAN 2.0B bus. Max voltage delta: 9 mV.
            </span>
          </div>
          <span style={{ background: '#1B4534', color: 'var(--color-lime)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
            Delta V: 0.009 V (Optimal)
          </span>
        </div>

        <div className="table-container" style={{ background: '#0D231A', border: '1px solid var(--color-border-dark)' }}>
          <table className="data-table" style={{ color: '#FFFFFF' }}>
            <thead>
              <tr style={{ background: '#143527' }}>
                <th style={{ color: '#FFFFFF' }}>Module</th>
                <th style={{ color: '#FFFFFF' }}>Cell Voltage</th>
                <th style={{ color: '#FFFFFF' }}>Temperature</th>
                <th style={{ color: '#FFFFFF' }}>Balance Status</th>
                <th style={{ color: '#FFFFFF' }}>Diagnostics</th>
              </tr>
            </thead>
            <tbody>
              {batteryState.cellTelemetry.map(mod => (
                <tr key={mod.module} style={{ borderBottom: '1px solid #1F4A37' }}>
                  <td><strong>Module {mod.module} (16S)</strong></td>
                  <td style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-lime)' }}>{mod.voltage} V</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{mod.temp} °C</td>
                  <td><StatusBadge status={mod.balance} /></td>
                  <td style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
                    {mod.balance === 'Balancing' ? 'Passive balancing active (3mV bleed)' : 'Internal resistance 0.42 mΩ'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
