import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Zap, Radio, ShieldCheck, CheckCircle2, TrendingDown, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';
import DrVerificationCard from '../../components/common/DrVerificationCard';

export default function DiscomDrCenter() {
  const { activeDREvent, triggerFeederDR, selectedFeederId } = useApp();
  const [dispatchKW, setDispatchKW] = useState(45.0);

  const handleTrigger = () => {
    triggerFeederDR(selectedFeederId, Number(dispatchKW));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#2A8C90' }}>
            Grid Emergency & Flexibility Dispatch
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Demand Response Operations Center
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SimulationBadge text="DR DISPATCH CONSOLE (WF-42)" />
          <Link to="/impact" style={{ fontSize: '0.8rem', color: 'var(--color-lime)', textDecoration: 'underline' }}>
            Impact Studio (WF-53) →
          </Link>
        </div>
      </div>

      {/* DISPATCH CONTROLLER CARD */}
      <div style={{ background: '#102226', border: '1.5px solid #2A8C90', borderRadius: '14px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#152C30', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={22} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: 0 }}>
                Feeder Peak Relief Dispatch (18:30 – 21:00)
              </h3>
              <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
                Broadcast fast DR signal to all 194 enrolled households in Mayur Vihar F-402
              </span>
            </div>
          </div>
          <StatusBadge status={activeDREvent.status} />
        </div>

        {/* Live Execution Metric Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#081214', padding: '12px', borderRadius: '8px', border: '1px solid #1E3A3E' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', display: 'block' }}>Target Feeder Shave</span>
            <strong style={{ fontSize: '1.4rem', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>{activeDREvent.targetReductionKW} kW</strong>
          </div>

          <div style={{ background: '#081214', padding: '12px', borderRadius: '8px', border: '1px solid #1E3A3E' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', display: 'block' }}>Committed by Residents</span>
            <strong style={{ fontSize: '1.4rem', color: '#60A5FA', fontFamily: 'var(--font-mono)' }}>{activeDREvent.committedReductionKW} kW</strong>
          </div>

          <div style={{ background: '#081214', padding: '12px', borderRadius: '8px', border: '1px solid #1E3A3E' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', display: 'block' }}>Verified Delivery (M&V)</span>
            <strong style={{ fontSize: '1.4rem', color: 'var(--color-lime-bright)', fontFamily: 'var(--font-mono)' }}>{activeDREvent.mvProtocol.verifiedReductionKW} kW</strong>
          </div>

          <div style={{ background: '#081214', padding: '12px', borderRadius: '8px', border: '1px solid #1E3A3E' }}>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95', display: 'block' }}>Total Payout Pool</span>
            <strong style={{ fontSize: '1.4rem', color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>₹{activeDREvent.mvProtocol.settlementAmountTotalINR.toLocaleString()}</strong>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #1E3A3E', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <label style={{ fontSize: '0.85rem', color: '#8E9B95' }}>Target Reduction (kW):</label>
            <input
              type="number"
              value={dispatchKW}
              onChange={(e) => setDispatchKW(e.target.value)}
              style={{ width: '90px', padding: '6px 10px', borderRadius: '6px', background: '#081214', color: '#FFFFFF', border: '1px solid #1E3A3E', fontFamily: 'var(--font-mono)' }}
            />
          </div>

          <button onClick={handleTrigger} className="btn btn-lime btn-md">
            Broadcast DR Dispatch Signal →
          </button>
        </div>
      </div>

      {/* MEASUREMENT & VERIFICATION (M&V) PROTOCOL */}
      <DrVerificationCard drEvent={activeDREvent} residentParticipation="verified" />
    </div>
  );
}
