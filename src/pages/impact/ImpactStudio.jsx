import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { TrendingUp, Sun, Flame, Zap, ShieldCheck, ArrowRight, BookOpen, Layers, BarChart3, CheckCircle2 } from 'lucide-react';
import BeforeAfterComparison from '../../components/common/BeforeAfterComparison';
import { SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function ImpactStudio() {
  const { impactScenarios, selectedScenarioId, setSelectedScenarioId, selectedScenario } = useApp();
  const [viewMode, setViewMode] = useState('split'); // 'split', 'baseline', 'mohalla'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-cream)', paddingBottom: '90px' }}>
      {/* Top Navigation Strip */}
      <div style={{ background: 'var(--color-forest-deep)', color: '#FFFFFF', padding: '16px 0', borderBottom: '1px solid var(--color-border-dark)' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: '#1B4534', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={22} />
            </div>
            <div>
              <strong style={{ fontSize: '1.15rem', display: 'block', color: '#FFFFFF' }}>
                MOHALLA GRID • IMPACT STUDIO
              </strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-cream-dark)' }}>
                Evidence-Driven Power System Testbed & Scenario Simulator
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <SimulationBadge text="PHYSICS ENGINE SIMULATION (WF-53)" />
            <Link to="/methodology" className="btn btn-outline-white btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <BookOpen size={14} /> Methodology (WF-02)
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="container" style={{ paddingTop: '32px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
        {/* SCENARIO SELECTION STRIP */}
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)', letterSpacing: '0.06em' }}>
            Select Demonstration Scenario
          </span>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--color-forest-deep)', margin: '4px 0 16px 0' }}>
            Stress-Test Scenarios & Counterfactual Baselines
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
            {impactScenarios.map(sc => {
              const isSelected = sc.id === selectedScenarioId;
              return (
                <div
                  key={sc.id}
                  onClick={() => setSelectedScenarioId(sc.id)}
                  className="card"
                  style={{
                    border: isSelected ? '2.5px solid var(--color-forest-deep)' : '1px solid var(--color-border-light)',
                    background: isSelected ? '#FFFFFF' : 'var(--color-cream-surface)',
                    boxShadow: isSelected ? 'var(--shadow-md)' : 'var(--shadow-xs)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: isSelected ? '#ECFDF5' : '#E5E7EB', color: isSelected ? '#065F46' : '#4B5563' }}>
                      {sc.badge}
                    </span>
                    {isSelected && <CheckCircle2 size={18} color="var(--color-lime)" />}
                  </div>

                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
                    {sc.name}
                  </h3>

                  <p style={{ fontSize: '0.825rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.4 }}>
                    {sc.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', marginTop: '8px', fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>
                    <span>Outage: {sc.deltas.outageReductionPercentage}</span>
                    <span>• Diesel: -{sc.deltas.dieselSavingsINR}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COMPARISON VIEW SELECTOR */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '12px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-forest-deep)', margin: 0 }}>
              Scenario Analysis: {selectedScenario.name}
            </h2>
            <span style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)' }}>
              Evaluating 280 connected households on Mayur Vihar Feeder F-402
            </span>
          </div>

          <div style={{ display: 'flex', background: 'var(--color-cream-surface)', borderRadius: 'var(--radius-full)', padding: '4px', border: '1px solid var(--color-border-light)' }}>
            <button
              onClick={() => setViewMode('split')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: '600',
                background: viewMode === 'split' ? 'var(--color-forest-deep)' : 'transparent',
                color: viewMode === 'split' ? '#FFFFFF' : 'var(--color-charcoal-muted)'
              }}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setViewMode('baseline')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: '600',
                background: viewMode === 'baseline' ? 'var(--color-forest-deep)' : 'transparent',
                color: viewMode === 'baseline' ? '#FFFFFF' : 'var(--color-charcoal-muted)'
              }}
            >
              Baseline Only
            </button>
            <button
              onClick={() => setViewMode('mohalla')}
              style={{
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.8rem',
                fontWeight: '600',
                background: viewMode === 'mohalla' ? 'var(--color-forest-deep)' : 'transparent',
                color: viewMode === 'mohalla' ? '#FFFFFF' : 'var(--color-charcoal-muted)'
              }}
            >
              Mohalla Grid Intervention
            </button>
          </div>
        </div>

        {/* BEFORE & AFTER SIMULATION EVIDENCE */}
        <BeforeAfterComparison
          scenario={selectedScenario}
          mode={viewMode}
        />

        {/* EVIDENCE CHAIN INTEGRATION */}
        <div className="card" style={{ background: 'var(--color-forest-deep)', color: '#FFFFFF', padding: '32px' }}>
          <h3 style={{ fontSize: '1.35rem', color: '#FFFFFF', marginBottom: '12px' }}>
            Traceable End-to-End Operational Journey
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--color-cream-dark)', marginBottom: '24px', maxWidth: '700px', lineHeight: 1.5 }}>
            Every simulated result reflects real equations from the operational screens. You can jump directly into each role interface to inspect the live mechanisms:
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <Link to="/operator/forecast" className="card-dark" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)', textTransform: 'uppercase', fontWeight: '700' }}>Stage 1 • Anticipate</span>
              <strong style={{ display: 'block', color: '#FFFFFF', margin: '4px 0' }}>Forecast Lab (WF-22)</strong>
              <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Nowcasting solar drop →</span>
            </Link>

            <Link to="/resident/shift" className="card-dark" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)', textTransform: 'uppercase', fontWeight: '700' }}>Stage 2 • Shift</span>
              <strong style={{ display: 'block', color: '#FFFFFF', margin: '4px 0' }}>Shift & Earn (WF-14)</strong>
              <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Resident DR participation →</span>
            </Link>

            <Link to="/operator/battery" className="card-dark" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)', textTransform: 'uppercase', fontWeight: '700' }}>Stage 3 • Store</span>
              <strong style={{ display: 'block', color: '#FFFFFF', margin: '4px 0' }}>Battery Health (WF-24)</strong>
              <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>500 kWh micro-BESS support →</span>
            </Link>

            <Link to="/discom/dr" className="card-dark" style={{ textDecoration: 'none' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)', textTransform: 'uppercase', fontWeight: '700' }}>Stage 4 • Prove</span>
              <strong style={{ display: 'block', color: '#FFFFFF', margin: '4px 0' }}>DR Center M&V (WF-42)</strong>
              <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>CAISO 10-in-10 settlement →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
