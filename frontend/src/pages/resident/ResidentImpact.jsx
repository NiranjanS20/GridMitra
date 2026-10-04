import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Award, ShieldCheck, Zap, TrendingUp, Heart, Leaf, CheckCircle2, Trophy } from 'lucide-react';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function ResidentImpact() {
  const { currentResident } = useApp();
  const impact = currentResident.impact;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Personal Sustainability & Resilience
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            My Reliability Impact
          </h1>
        </div>
        <SimulationBadge text="IMPACT ACCOUNTING" />
      </div>

      {/* Hero Badge Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, #143527 0%, #1E4E3A 100%)', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Trophy size={32} />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)', letterSpacing: '0.05em' }}>
              Cooperative Standing
            </span>
            <h2 style={{ fontSize: '1.5rem', color: '#FFFFFF', margin: '2px 0 0 0' }}>
              Top 10% Clean Energy Champion
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-cream-dark)' }}>
              Mayur Vihar Phase 1 Urja Samiti • Reliability Score {impact.reliabilityScore}%
            </span>
          </div>
        </div>

        <div style={{ background: 'rgba(255, 255, 255, 0.1)', padding: '8px 16px', borderRadius: '12px', textAlign: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-cream-dark)', display: 'block' }}>Zero Outage Hours</span>
          <strong style={{ fontSize: '1.25rem', color: 'var(--color-lime-bright)', fontFamily: 'var(--font-mono)' }}>100%</strong>
        </div>
      </div>

      {/* 4 Impact Pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <KpiCard
          title="Protected Outage Hours"
          value={impact.protectedHoursMonth}
          unit="hrs"
          subtitle="During 6 grid failure events"
          delta="100% uptime"
          deltaType="positive"
          icon={ShieldCheck}
        />

        <KpiCard
          title="Flexible Energy Shifted"
          value={impact.energyShiftedKWh}
          unit="kWh"
          subtitle="Shifted out of peak hours"
          delta="4 DR events"
          deltaType="positive"
          icon={Zap}
        />

        <KpiCard
          title="CO2 Emissions Avoided"
          value={impact.co2AvoidedKg}
          unit="kg"
          subtitle="Displaced dirty diesel generators"
          delta="Clean Air"
          deltaType="positive"
          icon={Leaf}
        />

        <KpiCard
          title="Avoided Blackouts"
          value={impact.avoidedOutageIncidents}
          unit="events"
          subtitle="Feeder trips seamlessly islanded"
          delta="Zero Food Loss"
          deltaType="positive"
          icon={Heart}
        />
      </div>

      {/* Detailed Impact Breakdown Card */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
          What Did Your Participation Achieve?
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', borderRadius: '10px', background: 'var(--color-cream-surface)' }}>
            <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-deep)' }}>Protected Your Critical Loads</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: '4px 0 0 0' }}>
                During the October 2 thunderstorm feeder outage, your smart circuit maintained uninterruptible power to your refrigerator and workstation without requiring noisy diesel generators.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', borderRadius: '10px', background: 'var(--color-cream-surface)' }}>
            <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-deep)' }}>Kept the Substation Transformer Cool</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: '4px 0 0 0' }}>
                By pre-cooling and shifting your washing machine during the 18:30 peak, you contributed to a 44.1 kW neighborhood demand curtailment, preventing transformer DT-04 from thermal tripping.
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px', borderRadius: '10px', background: 'var(--color-cream-surface)' }}>
            <CheckCircle2 size={20} color="#059669" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-deep)' }}>Earned Tangible Financial Dividends</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: '4px 0 0 0' }}>
                You earned ₹480 in direct DR credits plus ₹484 in quarterly cooperative solar surplus profit sharing.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/resident/wallet" className="btn btn-secondary">
          ← Back to Wallet
        </Link>
        <Link to="/resident/communications" className="btn btn-primary">
          View WhatsApp & Alerts →
        </Link>
      </div>
    </div>
  );
}
