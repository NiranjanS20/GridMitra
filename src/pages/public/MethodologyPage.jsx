import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Cpu, ShieldCheck, Database, Sliders, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { SimulationBadge, ObservedBadge, ForecastBadge } from '../../components/common/BadgesAndKpis';

export default function MethodologyPage() {
  return (
    <div className="container" style={{ padding: '48px 16px 80px 16px', display: 'flex', flexDirection: 'column', gap: '48px' }}>
      {/* Page Header */}
      <div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Technical Architecture & Physics
          </span>
          <SimulationBadge text="METHODOLOGY SPECIFICATION (WF-02)" />
        </div>
        <h1 style={{ fontSize: '2.5rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
          Methodology, Physics Engine & Assumptions
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--color-charcoal-muted)', maxWidth: '800px', lineHeight: 1.5 }}>
          Transparent documentation of how Mohalla Grid models solar generation nowcasts, household demand elasticity, battery dispatch optimization, and demand response settlement.
        </p>
      </div>

      {/* THREE-TIER DATA TAXONOMY: OBSERVED vs FORECAST vs SIMULATED */}
      <div className="card" style={{ background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)' }}>
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
          Strict Data Classification Taxonomy
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', marginBottom: '20px' }}>
          To prevent deceptive claims, every data point and chart throughout the platform is strictly categorized into one of three tiers:
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #C7D2FE' }}>
            <div style={{ marginBottom: '8px' }}>
              <ObservedBadge text="1. OBSERVED DATA" />
            </div>
            <p style={{ fontSize: '0.825rem', color: '#3730A3', margin: 0, lineHeight: 1.4 }}>
              Direct telemetry from DLMS smart meters, substation CT clamps, and inverter gateways up to current time (T = 0).
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #E9D5FF' }}>
            <div style={{ marginBottom: '8px' }}>
              <ForecastBadge text="2. FORECAST DATA" />
            </div>
            <p style={{ fontSize: '0.825rem', color: '#6B21A8', margin: 0, lineHeight: 1.4 }}>
              Statistical nowcasting outputs with P10/P50/P90 uncertainty confidence bands over the next 15-minute to 24-hour horizon.
            </p>
          </div>

          <div style={{ background: '#FFFFFF', padding: '16px', borderRadius: '12px', border: '1px solid #FDE68A' }}>
            <div style={{ marginBottom: '8px' }}>
              <SimulationBadge text="3. SIMULATED DATA" />
            </div>
            <p style={{ fontSize: '0.825rem', color: '#92400E', margin: 0, lineHeight: 1.4 }}>
              Synthetic power-flow testbed results used in Impact Studio to stress-test extreme weather scenarios against historical baselines.
            </p>
          </div>
        </div>
      </div>

      {/* 6-STEP COMPUTATIONAL PIPELINE */}
      <div>
        <h2 style={{ fontSize: '1.85rem', color: 'var(--color-forest-deep)', marginBottom: '24px' }}>
          The 6-Step Computational Pipeline
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div className="card">
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-forest)', textTransform: 'uppercase' }}>
              Step 1 • Ingestion & Cleaning
            </span>
            <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>Smart Meter & Substation Ingestion</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Pulls 15-minute DLMS/COSEM meter pulses, 11kV bus CT currents, rooftop inverter solar yields, and INSAT-3DR multispectral cloud satellite imagery.
            </p>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-forest)', textTransform: 'uppercase' }}>
              Step 2 • AI Solar & Demand Nowcast
            </span>
            <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>Temporal Convolutional Network</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Generates rolling 6-hour generation envelopes with quantified P10 (conservative), P50 (expected), and P90 (tail-risk) probabilities.
            </p>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-forest)', textTransform: 'uppercase' }}>
              Step 3 • Scenario & Constraint Engine
            </span>
            <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>Physical Feeder Limits</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Evaluates transformer thermal rating (450 kVA), 11kV line ampacity limits, and mandatory 20% life-support medical battery reserve.
            </p>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-forest)', textTransform: 'uppercase' }}>
              Step 4 • MILP Optimal Dispatch
            </span>
            <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>Branch-and-Cut Optimizer</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Minimizes unserved energy and feeder peak loading while maximizing battery cycle efficiency (91.5% round-trip) and resident comfort.
            </p>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-forest)', textTransform: 'uppercase' }}>
              Step 5 • Demand Response Coordination
            </span>
            <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>Multi-Channel Resident Nudge</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Calculates marginal value of peak curtailment (₹8.50/kWh) and dispatches opt-in notifications across WhatsApp, SMS, and app alerts.
            </p>
          </div>

          <div className="card">
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-forest)', textTransform: 'uppercase' }}>
              Step 6 • M&V Settlement
            </span>
            <h4 style={{ margin: '8px 0', fontSize: '1.1rem' }}>CAISO / IS 15888 Protocol</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Compares actual event load profile against 10 non-event baseline days with weather adjustments, triggering instant ledger payouts.
            </p>
          </div>
        </div>
      </div>

      {/* AI MODEL CARDS & SPECS */}
      <div className="card" style={{ background: '#FFFFFF' }}>
        <h3 style={{ fontSize: '1.35rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
          Registered AI Model Specifications
        </h3>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Model Name</th>
                <th>Version</th>
                <th>Architecture</th>
                <th>Evaluation Metric</th>
                <th>Inference Latency</th>
                <th>Training Region</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Solar-Nowcast-Satellite-DL</strong></td>
                <td><span className="badge badge-steady">v3.2.1</span></td>
                <td>Temporal Convolutional Network + INSAT-3DR</td>
                <td>MAPE: 4.82% (P90 Coverage 94.6%)</td>
                <td>42 ms</td>
                <td>Delhi NCR (2024–2026)</td>
              </tr>
              <tr>
                <td><strong>Feeder-Load-Elasticity-XGB</strong></td>
                <td><span className="badge badge-steady">v2.1.0</span></td>
                <td>Gradient Boosted Decision Trees + Weather API</td>
                <td>MAPE: 3.95%</td>
                <td>18 ms</td>
                <td>Mayur Vihar Substation</td>
              </tr>
              <tr>
                <td><strong>Microgrid-Optimal-Dispatch-MILP</strong></td>
                <td><span className="badge badge-steady">v4.0.0</span></td>
                <td>Branch-and-Cut Physics Solver (Rolling 24h)</td>
                <td>100% Physical Feasibility</td>
                <td>110 ms</td>
                <td>Deterministic Physics Engine</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* REGULATORY STANDARDS & ASSUMPTIONS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <div className="card">
          <h4 style={{ fontSize: '1.1rem', color: 'var(--color-forest-deep)', marginBottom: '12px' }}>
            Grid Standards Compliance
          </h4>
          <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.6 }}>
            <li><strong>Central Electricity Authority (CEA) Technical Standards:</strong> Operating frequency band 49.90 Hz – 50.05 Hz.</li>
            <li><strong>DERC Distribution Code:</strong> Voltage variation limits ±6% at consumer terminals (415V / 230V).</li>
            <li><strong>IS 15888 / CAISO:</strong> 10-of-10 baseline demand response settlement protocol.</li>
          </ul>
        </div>

        <div className="card">
          <h4 style={{ fontSize: '1.1rem', color: 'var(--color-forest-deep)', marginBottom: '12px' }}>
            Model Limitations & Safeguards
          </h4>
          <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', lineHeight: 1.6 }}>
            <li><strong>Zero Life-Support Curtailment:</strong> Medical Nebulizers & Oxygen Concentrators are physically non-sheddable.</li>
            <li><strong>Manual Operator Override:</strong> Human operators can override automated MILP dispatch at any time (logged to audit log).</li>
            <li><strong>Privacy Guarantee:</strong> Private household telemetry is anonymized; only aggregated feeder sums are exposed to DISCOM.</li>
          </ul>
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-light)', paddingTop: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/" className="btn btn-secondary">
          ← Back to Landing Page
        </Link>
        <Link to="/impact" className="btn btn-primary">
          Explore Impact Studio (WF-53) →
        </Link>
      </div>
    </div>
  );
}
