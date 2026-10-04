import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import RoleSwitcher from '../components/common/RoleSwitcher';
import { Zap, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import Footer from '../components/common/Footer';

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
                GRIDMITRA
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

      {/* Global Footer */}
      <Footer />

      {/* Floating Role Switcher */}
      <RoleSwitcher />
    </div>
  );
}
