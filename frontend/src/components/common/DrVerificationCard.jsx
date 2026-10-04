import React from 'react';
import { ShieldCheck, CheckCircle2, TrendingDown, DollarSign } from 'lucide-react';
import { StatusBadge, SimulationBadge } from './BadgesAndKpis';

export default function DrVerificationCard({ drEvent, residentParticipation }) {
  const mv = drEvent?.mvProtocol || {
    method: "IS 15888 / CAISO 10-in-10 Baseline with Same-Day Weather Adjustment",
    baselineLoadKW: 182.4,
    eventLoadKW: 138.3,
    verifiedReductionKW: 44.1,
    settlementAmountTotalINR: 7650.00
  };

  return (
    <div className="card" style={{ border: '1px solid #86EFAC', background: '#F0FDF4', borderRadius: '0px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '0px', background: '#DCFCE7', border: '1px solid #86EFAC', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
            <ShieldCheck size={18} />
          </div>
          <div>
            <h4 style={{ margin: 0, color: '#166534', fontSize: '0.95rem', fontWeight: '700' }}>
              Demand Response M&V Verification & Settlement
            </h4>
            <span style={{ fontSize: '0.725rem', color: '#15803D', fontFamily: 'var(--font-mono)' }}>
              PROTOCOL: {mv.method}
            </span>
          </div>
        </div>
        <StatusBadge status="Verified & Settled" />
      </div>

      {/* M&V Metric Grid - Zero Radius */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px', marginBottom: '12px' }}>
        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '0px', border: '1px solid #DCFCE7' }}>
          <span style={{ fontSize: '0.675rem', color: '#4B5563', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>10-Day Baseline</span>
          <strong style={{ fontSize: '1.2rem', color: '#111827', fontFamily: 'var(--font-mono)' }}>{mv.baselineLoadKW} kW</strong>
        </div>

        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '0px', border: '1px solid #DCFCE7' }}>
          <span style={{ fontSize: '0.675rem', color: '#4B5563', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Event Actual Load</span>
          <strong style={{ fontSize: '1.2rem', color: '#166534', fontFamily: 'var(--font-mono)' }}>{mv.eventLoadKW} kW</strong>
        </div>

        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '0px', border: '1px solid #DCFCE7' }}>
          <span style={{ fontSize: '0.675rem', color: '#4B5563', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Verified Curtailment</span>
          <strong style={{ fontSize: '1.2rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>{mv.verifiedReductionKW} kW</strong>
        </div>

        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '0px', border: '1px solid #DCFCE7' }}>
          <span style={{ fontSize: '0.675rem', color: '#4B5563', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Settlement Pool</span>
          <strong style={{ fontSize: '1.2rem', color: '#047857', fontFamily: 'var(--font-mono)' }}>₹{mv.settlementAmountTotalINR.toLocaleString()}</strong>
        </div>
      </div>

      {/* Baseline Visual Representation */}
      <div style={{ background: '#FFFFFF', padding: '10px 12px', borderRadius: '0px', border: '1px solid #DCFCE7', fontSize: '0.775rem', color: '#166534', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <CheckCircle2 size={15} color="#16A34A" />
          <span>Smart meter interval delta verified against 10 baseline non-event weekdays (IS 15888).</span>
        </div>
        <span style={{ fontWeight: '800', color: '#065F46', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>SETTLED TO WALLET</span>
      </div>
    </div>
  );
}
