import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Cpu, Radio, Network, CheckCircle2, ShieldCheck, Activity, ArrowRight } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function OperatorDevices() {
  const { deviceRegistry } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)' }}>
            Hardware Registry & IoT Topology
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Devices & Observability Ladder
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SimulationBadge text="OBSERVABILITY LADDER (WF-27)" />
          <Link to="/discom/integrations" style={{ fontSize: '0.8rem', color: 'var(--color-lime)', textDecoration: 'underline' }}>
            ADMS SCADA Bridge (WF-44) →
          </Link>
        </div>
      </div>

      {/* THE 4-TIER OBSERVABILITY LADDER */}
      <div className="card-dark">
        <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '16px' }}>
          The 4-Tier Observability & Actuation Architecture
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-lime)', textTransform: 'uppercase' }}>
              Level 1 • Household Ingress
            </span>
            <h4 style={{ color: '#FFFFFF', margin: '6px 0' }}>DLMS Smart Meters</h4>
            <p style={{ fontSize: '0.8rem', color: '#8E9B95', margin: 0 }}>
              280 meters reporting 15-minute active/reactive power pulses over cellular NB-IoT (IEC 62056).
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#60A5FA', textTransform: 'uppercase' }}>
              Level 2 • Distribution Bus
            </span>
            <h4 style={{ color: '#FFFFFF', margin: '6px 0' }}>Substation CT Clamps</h4>
            <p style={{ fontSize: '0.8rem', color: '#8E9B95', margin: 0 }}>
              12 high-speed current transformers sampling 3-phase waveforms at 1 Hz (Modbus RTU / RS485).
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#F59E0B', textTransform: 'uppercase' }}>
              Level 3 • DER Generation & Storage
            </span>
            <h4 style={{ color: '#FFFFFF', margin: '6px 0' }}>Inverters & BMS</h4>
            <p style={{ fontSize: '0.8rem', color: '#8E9B95', margin: 0 }}>
              48 solar inverters + 500 kWh BESS BMS streaming cell voltages and MPPT yield (SunSpec / CAN 2.0B).
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#A855F7', textTransform: 'uppercase' }}>
              Level 4 • Utility Grid Bridge
            </span>
            <h4 style={{ color: '#FFFFFF', margin: '6px 0' }}>ADMS / DERMS Gateway</h4>
            <p style={{ fontSize: '0.8rem', color: '#8E9B95', margin: 0 }}>
              Bi-directional telecontrol link connecting Mayur Vihar microgrid to BSES Central SCADA (IEC 61850 / DNP3).
            </p>
          </div>
        </div>
      </div>

      {/* DEVICE INVENTORY TABLE */}
      <div className="card-dark">
        <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '16px' }}>
          Registered IoT Device Inventory & Network Health
        </h3>

        <div className="table-container" style={{ background: '#0D231A', border: '1px solid var(--color-border-dark)' }}>
          <table className="data-table" style={{ color: '#FFFFFF' }}>
            <thead>
              <tr style={{ background: '#143527' }}>
                <th style={{ color: '#FFFFFF' }}>Device ID</th>
                <th style={{ color: '#FFFFFF' }}>Device Class</th>
                <th style={{ color: '#FFFFFF' }}>Industrial Protocol</th>
                <th style={{ color: '#FFFFFF' }}>Deployment Location</th>
                <th style={{ color: '#FFFFFF' }}>Units Online</th>
                <th style={{ color: '#FFFFFF' }}>Health %</th>
                <th style={{ color: '#FFFFFF' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {deviceRegistry.map(dev => (
                <tr key={dev.id} style={{ borderBottom: '1px solid #1F4A37' }}>
                  <td><strong style={{ fontFamily: 'var(--font-mono)' }}>{dev.id}</strong></td>
                  <td>{dev.type}</td>
                  <td style={{ fontSize: '0.8rem', color: '#E2DDD3', fontFamily: 'var(--font-mono)' }}>{dev.protocol}</td>
                  <td>{dev.location}</td>
                  <td><strong>{dev.count}</strong></td>
                  <td><strong style={{ color: 'var(--color-lime)' }}>{dev.healthPercentage}%</strong></td>
                  <td><StatusBadge status={dev.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
