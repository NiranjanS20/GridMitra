import React from 'react';
import { Link } from 'react-router-dom';
import { Scale, Heart, ShieldCheck, Award, Users, CheckCircle2, ArrowRight } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function OperatorFairness() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)' }}>
            Equitable Access & Social Governance
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Fairness & Energy Equity
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SimulationBadge text="FAIRNESS METRICS" />
          <Link to="/cooperative" style={{ fontSize: '0.8rem', color: 'var(--color-lime)', textDecoration: 'underline' }}>
            Cooperative Governance →
          </Link>
        </div>
      </div>

      {/* Fairness KPI Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Energy Access Gini Index</span>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--color-lime-bright)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>0.12</h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)' }}>Optimal Equity (0 = Perfect Equality)</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Life-Support Uptime</span>
          <h3 style={{ fontSize: '1.85rem', color: '#60A5FA', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>100.0%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>54 Essential Tier Medical Loads</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>DR Call Rotation Delta</span>
          <h3 style={{ fontSize: '1.85rem', color: '#F59E0B', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>±2.1%</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Equal opportunity across blocks</span>
        </div>

        <div className="card-dark">
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase' }}>Unserved Critical Energy</span>
          <h3 style={{ fontSize: '1.85rem', color: 'var(--color-lime-bright)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>0.00 kWh</h3>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Zero life-support dropouts</span>
        </div>
      </div>

      {/* DETAILED EQUITY AUDIT CARDS */}
      <div className="card-dark">
        <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', marginBottom: '16px' }}>
          Democratic Fair-Share Safeguards
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Heart size={18} color="#EF4444" />
              <strong style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>Medical Prioritization Rule</strong>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#8E9B95', margin: 0, lineHeight: 1.5 }}>
              Regardless of tariff subscription, every household with verified medical equipment receives an immutable 1.8 kWh battery slice before any commercial or EV charging load is served.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Scale size={18} color="var(--color-lime)" />
              <strong style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>Non-Punitive Demand Response</strong>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#8E9B95', margin: 0, lineHeight: 1.5 }}>
              Residents who choose to decline a DR peak shift event are never penalized in tariff rate, reliability tier, or community standing.
            </p>
          </div>

          <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '16px', borderRadius: '10px', border: '1px solid var(--color-border-dark)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Users size={18} color="#60A5FA" />
              <strong style={{ fontSize: '0.95rem', color: '#FFFFFF' }}>Equitable Dividend Redistribution</strong>
            </div>
            <p style={{ fontSize: '0.825rem', color: '#8E9B95', margin: 0, lineHeight: 1.5 }}>
              60% of all utility DR payments and solar arbitrage profits are paid back equally to all cooperative member households as quarterly dividends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
