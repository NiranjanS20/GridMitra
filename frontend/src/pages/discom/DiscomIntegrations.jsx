import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Network, Radio, Key, CheckCircle2, ShieldCheck, RefreshCw, Cpu } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function DiscomIntegrations() {
  const { showToast } = useApp();
  const [testingConnection, setTestingConnection] = useState(null);

  const interfaces = [
    { id: 'INT-01', name: 'IEC 61850 Substation SCADA Bus', protocol: 'IEC 61850 GOOSE / MMS', endpoint: 'scada.bsesdelhi.com:102', latency: '12 ms', packetHealth: '99.98%', status: 'Online' },
    { id: 'INT-02', name: 'DNP3 Secure Telecontrol Gateway', protocol: 'DNP3 Secure Auth v5', endpoint: 'rtu-node-402.bses.internal:20000', latency: '18 ms', packetHealth: '99.95%', status: 'Online' },
    { id: 'INT-03', name: 'OpenADR 2.0b Demand Response Bridge', protocol: 'OpenADR 2.0b / HTTPS REST', endpoint: 'https://dr-server.gridmitragrid.in/openadr/2.0b', latency: '24 ms', packetHealth: '100%', status: 'Online' },
    { id: 'INT-04', name: 'IEEE 2030.5 Smart Inverter Protocol', protocol: 'IEEE 2030.5 (SEP 2.0)', endpoint: 'sep2.gridmitragrid.in/csip', latency: '32 ms', packetHealth: '99.80%', status: 'Online' }
  ];

  const handleTest = (intId) => {
    setTestingConnection(intId);
    setTimeout(() => {
      setTestingConnection(null);
      showToast(`Interface ${intId} handshake verified. Latency optimal.`, 'success');
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#2A8C90' }}>
            Grid Telecontrol & Industrial Protocols
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            ADMS & SCADA Bridge Integrations
          </h1>
        </div>
        <SimulationBadge text="INTEROPERABILITY" />
      </div>

      {/* Protocol Interface Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        {interfaces.map(item => (
          <div key={item.id} style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#2A8C90', fontFamily: 'var(--font-mono)' }}>{item.id}</span>
              <StatusBadge status={item.status} />
            </div>

            <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', margin: 0 }}>
              {item.name}
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#8E9B95', borderTop: '1px solid #1E3A3E', paddingTop: '10px' }}>
              <div>Protocol: <strong style={{ color: '#E2DDD3' }}>{item.protocol}</strong></div>
              <div>Endpoint: <strong style={{ color: '#E2DDD3', fontFamily: 'var(--font-mono)' }}>{item.endpoint}</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Latency: <strong style={{ color: 'var(--color-lime)', fontFamily: 'var(--font-mono)' }}>{item.latency}</strong></span>
                <span>Integrity: <strong style={{ color: 'var(--color-lime)', fontFamily: 'var(--font-mono)' }}>{item.packetHealth}</strong></span>
              </div>
            </div>

            <button
              onClick={() => handleTest(item.id)}
              disabled={testingConnection === item.id}
              className="btn btn-secondary btn-sm"
              style={{ marginTop: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
            >
              <RefreshCw size={14} className={testingConnection === item.id ? 'animate-spin' : ''} />
              {testingConnection === item.id ? 'Pinging Substation RTU...' : 'Test SCADA Handshake'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
