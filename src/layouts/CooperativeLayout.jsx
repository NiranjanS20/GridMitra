import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import RoleSwitcher from '../components/common/RoleSwitcher';
import { Users, FileText, DollarSign, HeartPulse, Building, Award } from 'lucide-react';

export default function CooperativeLayout() {
  const location = useLocation();

  const navLinks = [
    { to: '/cooperative', label: 'Governance & Proposals (WF-30)', icon: FileText },
    { to: '/cooperative/finance', label: 'Finance & Dividends (WF-31)', icon: DollarSign },
    { to: '/cooperative/health', label: 'Community Health & Equity (WF-32)', icon: HeartPulse }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-cream-surface)' }}>
      {/* Header - Enterprise Cooperative Portal */}
      <header
        style={{
          background: 'var(--color-forest-deep)',
          color: '#FFFFFF',
          padding: '12px 24px',
          borderBottom: '1px solid var(--color-border-dark)'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '0px', background: 'var(--color-lime)', color: '#091913', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} />
            </div>
            <div>
              <strong style={{ fontSize: '1.05rem', display: 'block', fontWeight: '700', letterSpacing: '-0.01em' }}>
                Mayur Vihar Urja Sahakari Samiti
              </strong>
              <span style={{ fontSize: '0.725rem', color: 'var(--color-cream-dark)', fontFamily: 'var(--font-mono)' }}>
                REG: DL-COOP-2024-884 • 280 Member Households • Feeder F-402
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '0.775rem', padding: '5px 12px', borderRadius: '0px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--color-lime)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
              DIVIDEND POOL: ₹93,900
            </span>
          </div>
        </div>
      </header>

      {/* Nav Tabs - Zero Radius */}
      <nav style={{ background: '#FFFFFF', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container" style={{ display: 'flex', gap: '0px', padding: '0px', overflowX: 'auto' }}>
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '11px 18px',
                  borderRadius: '0px',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--color-forest-deep)' : 'var(--color-charcoal-muted)',
                  background: isActive ? 'var(--color-cream-surface)' : 'transparent',
                  borderBottom: isActive ? '2px solid var(--color-lime)' : '2px solid transparent',
                  borderRight: '1px solid var(--color-border-light)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={15} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '24px 0 90px 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <RoleSwitcher />
    </div>
  );
}
