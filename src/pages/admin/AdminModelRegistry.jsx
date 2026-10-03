import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Cpu, CheckCircle2, TrendingUp, ShieldCheck, ArrowRight, RefreshCw } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function AdminModelRegistry() {
  const { modelRegistry, showToast, recordAuditEvent } = useApp();
  const [models, setModels] = useState(modelRegistry);

  const handlePromote = (modId) => {
    showToast(`Model ${modId} promoted to active production pipeline.`, 'success');
    recordAuditEvent({
      actor: 'Admin: S. Narayanan (ADM-01)',
      action: `Promoted Model ${modId} to Production`,
      category: 'Model Deployment',
      target: modId,
      previousState: 'Staging Validation',
      newState: 'Active Production',
      reason: 'Validation benchmarks passed with <5% MAPE'
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            MLOps & AI Model Governance
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            AI Model Registry & Version Lifecycle
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <SimulationBadge text="MODEL REPOSITORY (WF-51)" />
          <Link to="/methodology" style={{ fontSize: '0.8rem', color: 'var(--color-forest)', textDecoration: 'underline' }}>
            Methodology & Physics (WF-02) →
          </Link>
        </div>
      </div>

      {/* Model Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {models.map(mod => (
          <div key={mod.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'var(--color-forest)', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Cpu size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
                    {mod.name}
                  </h3>
                  <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)' }}>
                    {mod.id} • Release {mod.version} • Last trained: {mod.lastTrained}
                  </span>
                </div>
              </div>
              <StatusBadge status={mod.status} />
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
              <strong>Purpose:</strong> {mod.purpose}
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', fontSize: '0.825rem' }}>
              <div>
                <span style={{ color: 'var(--color-charcoal-muted)', display: 'block' }}>Architecture</span>
                <strong>{mod.architecture}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-charcoal-muted)', display: 'block' }}>Accuracy Score</span>
                <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>MAPE: {mod.mape}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-charcoal-muted)', display: 'block' }}>Confidence Interval</span>
                <strong style={{ fontFamily: 'var(--font-mono)' }}>{mod.p90Coverage}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--color-charcoal-muted)', display: 'block' }}>Inference Latency</span>
                <strong style={{ color: 'var(--color-forest)', fontFamily: 'var(--font-mono)' }}>{mod.latencyMs} ms</strong>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => handlePromote(mod.id)} className="btn btn-secondary btn-sm">
                Re-validate on Testbed
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
