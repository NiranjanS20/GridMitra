import React from 'react';
import { Link } from 'react-router-dom';
import { HeartPulse, ShieldCheck, Users, Sun, Award, CheckCircle2, TrendingUp } from 'lucide-react';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function CooperativeCommunityHealth() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Collective Wellbeing & Resilience
          </span>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Community Health & Social Equity
          </h1>
        </div>
        <SimulationBadge text="HEALTH SCORECARD (WF-32)" />
      </div>

      {/* Health Scorecard KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <KpiCard
          title="Community Health Score"
          value="98.4%"
          subtitle="Outages, equity & comfort"
          delta="Excellent"
          deltaType="positive"
          icon={HeartPulse}
        />

        <KpiCard
          title="Critical Uptime"
          value="100.0%"
          subtitle="54 Medical households"
          delta="Zero incidents"
          deltaType="positive"
          icon={ShieldCheck}
        />

        <KpiCard
          title="Member Satisfaction"
          value="4.9 / 5"
          subtitle="Annual cooperative survey"
          delta="96% Positive"
          deltaType="positive"
          icon={Users}
        />

        <KpiCard
          title="Solar Adoption Rate"
          value="48 Homes"
          subtitle="145 kWp connected"
          delta="+12 this year"
          deltaType="positive"
          icon={Sun}
        />
      </div>

      {/* DETAILED COMMUNITY IMPACT SUMMARY */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
          Qualitative Community Achievements
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'var(--color-cream-surface)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
            <strong style={{ fontSize: '1rem', color: 'var(--color-forest-deep)', display: 'block', marginBottom: '6px' }}>
              🏥 No Medical Inhaler / Oxygen Failures
            </strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
              Senior citizens and patients in Pocket 1 and Pocket 2 experienced uninterrupted power during all 6 storm-induced grid trips this year.
            </p>
          </div>

          <div style={{ background: 'var(--color-cream-surface)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
            <strong style={{ fontSize: '1rem', color: 'var(--color-forest-deep)', display: 'block', marginBottom: '6px' }}>
              🔇 Elimination of Society Diesel Generators
            </strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
              Zero diesel gen-set exhaust fumes or noise pollution in residential courtyards during evening hours.
            </p>
          </div>

          <div style={{ background: 'var(--color-cream-surface)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
            <strong style={{ fontSize: '1rem', color: 'var(--color-forest-deep)', display: 'block', marginBottom: '6px' }}>
              🤝 High Trust & Voluntary DR Compliance
            </strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
              69.3% active voluntary DR participation due to transparent billing, instant wallet settlements, and respectful opt-out policies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
