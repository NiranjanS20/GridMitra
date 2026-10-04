import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export function StatusBadge({ status, size = 'md' }) {
  const normalized = (status || '').toLowerCase();

  if (normalized.includes('steady') || normalized.includes('normal') || normalized.includes('online') || normalized.includes('active') || normalized.includes('passed') || normalized.includes('verified')) {
    return (
      <span className="badge badge-steady">
        <CheckCircle2 size={11} />
        {status}
      </span>
    );
  }

  if (normalized.includes('watch') || normalized.includes('warning') || normalized.includes('balancing')) {
    return (
      <span className="badge badge-watch">
        <AlertTriangle size={11} />
        {status}
      </span>
    );
  }

  if (normalized.includes('tight') || normalized.includes('stress')) {
    return (
      <span className="badge badge-tight">
        <AlertCircle size={11} />
        {status}
      </span>
    );
  }

  if (normalized.includes('critical') || normalized.includes('error') || normalized.includes('danger')) {
    return (
      <span className="badge badge-critical">
        <ShieldAlert size={11} />
        {status}
      </span>
    );
  }

  return (
    <span className="badge" style={{ background: '#E2E8F0', color: '#1E293B' }}>
      <Info size={11} />
      {status}
    </span>
  );
}

export function SimulationBadge({ text = "SIMULATED DATA — NOT FIELD RESULTS" }) {
  return (
    <span className="badge badge-simulated" title="Values generated from power system models, not real-time utility deployments">
      <Info size={11} />
      {text}
    </span>
  );
}

export function ObservedBadge({ text = "OBSERVED (TELEMETRY)" }) {
  return (
    <span className="badge badge-observed">
      <CheckCircle2 size={11} />
      {text}
    </span>
  );
}

export function ForecastBadge({ text = "AI NOWCAST FORECAST" }) {
  return (
    <span className="badge badge-forecast">
      <Info size={11} />
      {text}
    </span>
  );
}

export function KpiCard({ title, value, unit = '', subtitle, delta, deltaType = 'positive', icon: Icon, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: onClick ? 'pointer' : 'default',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        borderRadius: '0px',
        border: '1px solid var(--color-border-light)',
        background: '#FFFFFF'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {title}
        </span>
        {Icon && (
          <div style={{ width: '28px', height: '28px', borderRadius: '0px', background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-forest)' }}>
            <Icon size={15} />
          </div>
        )}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
        <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--color-forest-deep)', letterSpacing: '-0.02em' }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-charcoal-muted)' }}>{unit}</span>}
      </div>

      {(subtitle || delta) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.775rem', borderTop: '1px solid var(--color-border-light)', paddingTop: '6px', marginTop: '2px' }}>
          {subtitle && <span style={{ color: 'var(--color-charcoal-muted)' }}>{subtitle}</span>}
          {delta && (
            <span
              style={{
                fontWeight: '700',
                color: deltaType === 'positive' ? '#059669' : deltaType === 'negative' ? '#DC2626' : 'var(--color-charcoal-muted)',
                fontFamily: 'var(--font-mono)'
              }}
            >
              {delta}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
