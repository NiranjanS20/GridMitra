import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FileBarChart, Download, TrendingUp, ShieldCheck, Zap, Award } from 'lucide-react';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function DiscomAnalytics() {
  const { selectedFeeder } = useApp();

  const reportItems = [
    { title: 'DERC Peak Demand Compliance Report (Sep 2026)', date: '2026-10-01', size: '2.4 MB', type: 'PDF / Verified', status: 'Approved' },
    { title: 'Feeder F-402 Technical Line Loss Reduction Audit', date: '2026-09-28', size: '1.8 MB', type: 'CSV / Data', status: 'Verified' },
    { title: 'Distribution Transformer Thermal Asset Health Review', date: '2026-09-25', size: '3.1 MB', type: 'PDF / Engineering', status: 'Approved' },
    { title: 'Microgrid Islanding & Life-Support Reliability Index', date: '2026-09-20', size: '1.2 MB', type: 'PDF / Regulatory', status: 'Audited' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#2A8C90' }}>
            Regulatory Compliance & Long-Term Assets
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Analytics & Regulatory Filings
          </h1>
        </div>
        <SimulationBadge text="REGULATORY AUDIT (WF-43)" />
      </div>

      {/* Analytics KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Substation Peak Shave</span>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--color-lime-bright)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>-30.2%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>During 18:30–21:00 evening peak</span>
        </div>

        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Transformer Life Extension</span>
          <h3 style={{ fontSize: '1.85rem', color: '#60A5FA', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>+3.8 Years</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Avoided thermal overload aging</span>
        </div>

        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Technical Line Loss</span>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--color-lime)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>6.4%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Down from 8.6% baseline</span>
        </div>

        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '16px' }}>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Avoided Unserved Energy</span>
          <h3 style={{ fontSize: '1.85rem', color: '#F59E0B', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>14.2 MWh</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Protected across 280 homes</span>
        </div>
      </div>

      {/* REGULATORY REPORT DOWNLOAD LEDGER */}
      <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '20px' }}>
        <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '16px' }}>
          Published DERC & Grid Compliance Reports
        </h3>

        <div className="table-container" style={{ background: '#081214', border: '1px solid #1E3A3E' }}>
          <table className="data-table" style={{ color: '#FFFFFF' }}>
            <thead>
              <tr style={{ background: '#102226' }}>
                <th style={{ color: '#FFFFFF' }}>Report Name</th>
                <th style={{ color: '#FFFFFF' }}>Publication Date</th>
                <th style={{ color: '#FFFFFF' }}>Format</th>
                <th style={{ color: '#FFFFFF' }}>Regulatory Status</th>
                <th style={{ color: '#FFFFFF' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {reportItems.map((rep, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #1E3A3E' }}>
                  <td><strong>{rep.title}</strong></td>
                  <td>{rep.date}</td>
                  <td><span style={{ fontSize: '0.75rem', color: '#8E9B95', fontFamily: 'var(--font-mono)' }}>{rep.type}</span></td>
                  <td><StatusBadge status={rep.status} /></td>
                  <td>
                    <button className="btn btn-outline-white btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                      <Download size={14} /> Download ({rep.size})
                    </button>
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
