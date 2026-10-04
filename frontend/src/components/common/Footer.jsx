import React from 'react';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-forest-deep)', color: 'var(--color-cream-surface)', padding: '48px 0 80px 0', borderTop: '1px solid var(--color-border-dark)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Zap size={20} color="var(--color-lime)" />
            <strong style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>GRIDMITRA</strong>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-dark)', lineHeight: 1.5 }}>
            A neighbourhood energy intelligence platform predicting renewable gaps, coordinating flexible demand, and protecting critical feeder loads.
          </p>
          <span style={{ fontSize: '0.75rem', color: '#8E9B95', display: 'block', marginTop: '12px' }}>
            Antigravity Clean Energy Innovation 2026
          </span>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-lime)', marginBottom: '12px' }}>
            Platform Roles
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <Link to="/resident/today" style={{ color: 'var(--color-cream-dark)' }}>Resident Portal</Link>
            <Link to="/operator" style={{ color: 'var(--color-cream-dark)' }}>Operator Control Room</Link>
            <Link to="/cooperative" style={{ color: 'var(--color-cream-dark)' }}>Cooperative Governance</Link>
            <Link to="/discom" style={{ color: 'var(--color-cream-dark)' }}>DISCOM Utility SCADA</Link>
            <Link to="/admin/models" style={{ color: 'var(--color-cream-dark)' }}>Admin Model Registry</Link>
          </div>
        </div>

        <div>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-lime)', marginBottom: '12px' }}>
            Verification & Science
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
            <Link to="/impact" style={{ color: 'var(--color-cream-dark)' }}>Impact Studio</Link>
            <Link to="/methodology" style={{ color: 'var(--color-cream-dark)' }}>Methodology & Physics Engine</Link>
            <Link to="/admin/audit" style={{ color: 'var(--color-cream-dark)' }}>Immutable Cryptographic Audit</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
