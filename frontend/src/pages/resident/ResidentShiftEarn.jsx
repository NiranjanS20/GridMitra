import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Zap, CheckCircle2, XCircle, Clock, ShieldCheck, DollarSign, Award, ArrowRight } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';
import DrVerificationCard from '../../components/common/DrVerificationCard';

export default function ResidentShiftEarn() {
  const { currentResident, activeDREvent, drStatus, acceptDREvent, declineDREvent } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '980px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-teal)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            DEMAND RESPONSE DISPATCH & SETTLEMENT
          </span>
          <h1 style={{ fontSize: '2.1rem', color: 'var(--color-forest-deep)', margin: '4px 0 0 0', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Shift & Earn Credits
          </h1>
        </div>
        <SimulationBadge text="IS 15888 / CAISO 10-IN-10 PROTOCOL" />
      </div>

      {/* ACTIVE DEMAND RESPONSE OFFER CARD - ENVO / SOLARIX HIGHLIGHT STYLE */}
      <div className="card-lime" style={{ border: '1px solid #BFEF4B', background: 'var(--color-acid-lime)', display: 'flex', flexDirection: 'column', gap: '16px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: 'var(--color-forest-deep)', color: 'var(--color-acid-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
              DR
            </div>
            <div>
              <span style={{ fontSize: '0.675rem', fontWeight: '800', color: '#092015', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                DISPATCH EVENT • {activeDREvent.id}
              </span>
              <h3 style={{ fontSize: '1.35rem', color: '#092015', margin: '2px 0 0 0', fontWeight: '800' }}>
                {activeDREvent.name}
              </h3>
            </div>
          </div>
          <span style={{ background: '#092015', color: 'var(--color-acid-lime)', padding: '5px 12px', fontSize: '0.775rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
            TARGET: {activeDREvent.windowStart} – {activeDREvent.windowEnd} TODAY
          </span>
        </div>

        <p style={{ fontSize: '0.875rem', color: '#0F3020', margin: 0, lineHeight: 1.5, fontWeight: '500' }}>
          <strong>Grid Physics Trigger:</strong> {activeDREvent.triggerReason}
        </p>

        {/* Payout Metric Grid - Zero Radius */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', background: '#FFFFFF', padding: '16px', border: '1px solid #BFEF4B' }}>
          <div>
            <span style={{ fontSize: '0.675rem', color: 'var(--color-charcoal-muted)', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Requested Shift</span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', fontFamily: 'var(--font-mono)' }}>1.2 kW</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.675rem', color: 'var(--color-charcoal-muted)', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Incentive Rate</span>
            <strong style={{ fontSize: '1.25rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>₹{activeDREvent.payoutRateINRPerKWh.toFixed(2)} / kWh</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.675rem', color: 'var(--color-charcoal-muted)', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Est. Household Reward</span>
            <strong style={{ fontSize: '1.25rem', color: '#059669', fontFamily: 'var(--font-mono)' }}>₹{activeDREvent.estimatedHouseholdEarningsINR.toFixed(2)}</strong>
          </div>

          <div>
            <span style={{ fontSize: '0.675rem', color: 'var(--color-charcoal-muted)', display: 'block', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>Feeder Relief Total</span>
            <strong style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', fontFamily: 'var(--font-mono)' }}>-45 kW Relief</strong>
          </div>
        </div>

        {/* Action checklist */}
        <div style={{ background: '#FFFFFF', padding: '14px 16px', border: '1px solid #BFEF4B' }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--color-forest-deep)', marginBottom: '6px', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
            Recommended Smart Action Checklist:
          </h4>
          <ul style={{ paddingLeft: '18px', fontSize: '0.825rem', color: 'var(--color-charcoal)', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {activeDREvent.recommendedActions.map((action, idx) => (
              <li key={idx}><strong>Step {idx + 1}:</strong> {action}</li>
            ))}
          </ul>
        </div>

        {/* Interactive Action Controls */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(9, 32, 21, 0.15)', paddingTop: '14px', flexWrap: 'wrap', gap: '12px' }}>
          {drStatus === 'offer' && (
            <>
              <button
                onClick={declineDREvent}
                style={{
                  background: 'transparent',
                  border: '1px solid #092015',
                  color: '#092015',
                  padding: '10px 18px',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <XCircle size={16} /> Decline (Maintain Comfort)
              </button>

              <button
                onClick={acceptDREvent}
                style={{
                  background: '#092015',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  border: '1px solid #092015'
                }}
              >
                <CheckCircle2 size={18} color="var(--color-acid-lime)" /> Accept & Commit 1.2 kW Shift
              </button>
            </>
          )}

          {drStatus === 'accepted' && (
            <div style={{ width: '100%', background: '#092015', color: '#FFFFFF', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ color: 'var(--color-acid-lime)', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)' }}>
                <Clock size={16} /> COMMITTED • SMART METER LOGGING INTERVAL (18:30–21:00)
              </span>
              <span style={{ color: '#DDE5E0', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>IS 15888 10-in-10 settlement scheduled at 21:00</span>
            </div>
          )}

          {drStatus === 'verified' && (
            <div style={{ width: '100%', background: '#092015', color: '#FFFFFF', padding: '12px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <span style={{ color: 'var(--color-acid-lime)', fontWeight: '800', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', fontFamily: 'var(--font-mono)' }}>
                <CheckCircle2 size={16} /> VERIFIED & SETTLED! ₹85.00 CREDITED TO WALLET
              </span>
              <Link to="/resident/wallet" style={{ background: 'var(--color-acid-lime)', color: '#092015', padding: '6px 14px', fontSize: '0.775rem', fontWeight: '800', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                View In Wallet →
              </Link>
            </div>
          )}

          {drStatus === 'declined' && (
            <div style={{ width: '100%', background: '#FFFFFF', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px solid #BFEF4B' }}>
              <span style={{ color: '#4B5563', fontSize: '0.825rem' }}>
                Offer declined. Normal priority maintained.
              </span>
              <button onClick={() => acceptDREvent()} style={{ background: '#092015', color: 'var(--color-acid-lime)', padding: '6px 14px', fontSize: '0.775rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                Change Mind & Accept
              </button>
            </div>
          )}
        </div>
      </div>

      {/* M&V VERIFICATION DETAILS */}
      <DrVerificationCard drEvent={activeDREvent} residentParticipation={drStatus} />

      {/* HISTORICAL DR EVENTS */}
      <div className="card">
        <h3 style={{ fontSize: '1.15rem', color: 'var(--color-forest-deep)', marginBottom: '14px', fontWeight: '700' }}>
          Your Verified Demand Response Track Record
        </h3>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Event Date</th>
                <th>Time Window</th>
                <th>Requested kW</th>
                <th>Delivered kW</th>
                <th>Reward Earned</th>
                <th>M&V Status</th>
              </tr>
            </thead>
            <tbody>
              {currentResident.historicalEvents.map(event => (
                <tr key={event.id}>
                  <td><strong style={{ fontFamily: 'var(--font-mono)' }}>{event.date}</strong></td>
                  <td>{event.time}</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}>{event.requestedKW} kW</td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}><strong style={{ color: '#059669' }}>{event.deliveredKW} kW</strong></td>
                  <td style={{ fontFamily: 'var(--font-mono)' }}><strong style={{ color: 'var(--color-forest-deep)' }}>₹{event.rewardINR.toFixed(2)}</strong></td>
                  <td><StatusBadge status={event.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/resident/loads" className="btn btn-secondary">
          ← Back to Loads
        </Link>
        <Link to="/resident/battery" className="btn btn-primary">
          View Community Battery →
        </Link>
      </div>
    </div>
  );
}
