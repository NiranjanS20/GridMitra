import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import RoleSwitcher from '../components/common/RoleSwitcher';
import { Zap, BookOpen, TrendingUp, Sparkles } from 'lucide-react';

export default function PublicLayout() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-cream)' }}>
      {/* Top Header */}
      <header
        style={{
          position: isLanding ? 'absolute' : 'sticky',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: isLanding ? 'transparent' : 'rgba(244, 241, 234, 0.92)',
          backdropFilter: isLanding ? 'none' : 'blur(12px)',
          borderBottom: isLanding ? 'none' : '1px solid var(--color-border-light)',
          padding: isLanding ? '24px 0' : '16px 0',
          transition: 'all 0.3s ease'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--color-forest-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-lime)' }}>
              <Zap size={22} fill="var(--color-lime)" />
            </div>
            <div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', letterSpacing: '-0.02em', color: 'var(--color-forest-deep)', display: 'block', lineHeight: 1 }}>
                MOHALLA GRID
              </span>
              <span style={{ fontSize: '0.65rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-teal)' }}>
                Energy Intelligence
              </span>
            </div>
          </Link>

          {/* Nav items */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
            <Link to="/#how-it-works" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-forest-deep)' }}>
              How It Works
            </Link>
            <Link to="/impact" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-forest-deep)' }}>
              Impact Studio
            </Link>
            <Link to="/methodology" style={{ fontSize: '0.9rem', fontWeight: '600', color: 'var(--color-forest-deep)' }}>
              Methodology
            </Link>
            <Link to="/resident/today" className="btn btn-primary btn-sm" style={{ padding: '8px 18px', boxShadow: '0 4px 12px rgba(13, 35, 26, 0.15)' }}>
              Launch Demo →
            </Link>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Editorial Footer */}
      <footer style={{ background: 'var(--color-forest-deep)', color: 'var(--color-cream-surface)', padding: '48px 0 80px 0', borderTop: '1px solid var(--color-border-dark)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <Zap size={20} color="var(--color-lime)" />
              <strong style={{ fontSize: '1.1rem', letterSpacing: '-0.02em' }}>MOHALLA GRID</strong>
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
              <Link to="/resident/today" style={{ color: 'var(--color-cream-dark)' }}>Resident Portal (WF-10 to WF-19)</Link>
              <Link to="/operator" style={{ color: 'var(--color-cream-dark)' }}>Operator Control Room (WF-20 to WF-27)</Link>
              <Link to="/cooperative" style={{ color: 'var(--color-cream-dark)' }}>Cooperative Governance (WF-30 to WF-32)</Link>
              <Link to="/discom" style={{ color: 'var(--color-cream-dark)' }}>DISCOM Utility SCADA (WF-40 to WF-44)</Link>
              <Link to="/admin/models" style={{ color: 'var(--color-cream-dark)' }}>Admin Model Registry (WF-50 to WF-52)</Link>
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--color-lime)', marginBottom: '12px' }}>
              Verification & Science
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.85rem' }}>
              <Link to="/impact" style={{ color: 'var(--color-cream-dark)' }}>Impact Studio (WF-53)</Link>
              <Link to="/methodology" style={{ color: 'var(--color-cream-dark)' }}>Methodology & Physics Engine (WF-02)</Link>
              <Link to="/admin/audit" style={{ color: 'var(--color-cream-dark)' }}>Immutable Cryptographic Audit (WF-52)</Link>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Role Switcher */}
      <RoleSwitcher />
    </div>
  );
}
