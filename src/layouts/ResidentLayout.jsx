import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RoleSwitcher from '../components/common/RoleSwitcher';
import {
  Home,
  Clock,
  Sliders,
  Zap,
  Battery,
  Wallet,
  Award,
  Settings,
  MessageSquare,
  UserCheck
} from 'lucide-react';
import { StatusBadge } from '../components/common/BadgesAndKpis';

export default function ResidentLayout() {
  const { currentResident, walletBalance } = useApp();
  const location = useLocation();

  const navLinks = [
    { to: '/resident/today', label: 'Today', icon: Home },
    { to: '/resident/outlook', label: 'Outlook', icon: Clock },
    { to: '/resident/loads', label: 'My Loads', icon: Sliders },
    { to: '/resident/shift', label: 'Shift & Earn', icon: Zap },
    { to: '/resident/battery', label: 'Battery', icon: Battery },
    { to: '/resident/wallet', label: 'Wallet', icon: Wallet },
    { to: '/resident/impact', label: 'My Impact', icon: Award },
    { to: '/resident/communications', label: 'Alerts & WhatsApp', icon: MessageSquare },
    { to: '/resident/settings', label: 'Settings', icon: Settings },
    { to: '/resident/onboarding', label: 'Onboarding Flow', icon: UserCheck }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-cream-surface)' }}>
      {/* Top Header - Sharp Enterprise SaaS */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 90,
          background: '#FFFFFF',
          borderBottom: '1px solid var(--color-border-light)',
          padding: '10px 16px'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* User profile info */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '0px', background: 'var(--color-forest-deep)', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem', fontFamily: 'var(--font-mono)' }}>
              AS
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <strong style={{ fontSize: '0.9rem', color: 'var(--color-forest-deep)', fontWeight: '700' }}>{currentResident.name}</strong>
                <span style={{ fontSize: '0.675rem', padding: '1px 6px', borderRadius: '0px', background: 'var(--color-lime-bg)', color: 'var(--color-steady-text)', fontWeight: '800', border: '1px solid var(--color-steady-border)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  {currentResident.tier} Tier
                </span>
              </div>
              <span style={{ fontSize: '0.725rem', color: 'var(--color-charcoal-muted)', fontFamily: 'var(--font-mono)' }}>
                {currentResident.householdId} • Feeder F-402 • 11kV Substation
              </span>
            </div>
          </div>

          {/* Quick Balance & Grid State */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '0.675rem', color: 'var(--color-charcoal-muted)', textTransform: 'uppercase', letterSpacing: '0.04em', display: 'block', fontWeight: '700' }}>Verified Credits</span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-deep)', fontFamily: 'var(--font-mono)' }}>₹{walletBalance.toFixed(2)}</strong>
            </div>
            <div style={{ padding: '4px 10px', background: 'var(--color-steady-bg)', border: '1px solid var(--color-steady-border)', color: 'var(--color-steady-text)', fontSize: '0.725rem', fontWeight: '800', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              FEEDER: STEADY
            </div>
          </div>
        </div>
      </header>

      {/* Horizontal Subnav - Zero Radius */}
      <nav
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--color-border-light)',
          padding: '0px',
          overflowX: 'auto'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '0px' }}>
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
                  gap: '6px',
                  padding: '10px 14px',
                  borderRadius: '0px',
                  fontSize: '0.8rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? 'var(--color-forest-deep)' : 'var(--color-charcoal-muted)',
                  background: isActive ? 'var(--color-cream-surface)' : 'transparent',
                  borderBottom: isActive ? '2px solid var(--color-lime)' : '2px solid transparent',
                  borderRight: '1px solid var(--color-border-light)',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={13} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '24px 0 80px 0' }}>
        <div className="container">
          <Outlet />
        </div>
      </main>

      <RoleSwitcher />
    </div>
  );
}
