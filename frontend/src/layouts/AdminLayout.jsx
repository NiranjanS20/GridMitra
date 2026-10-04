import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import RoleSwitcher from '../components/common/RoleSwitcher';
import Footer from '../components/common/Footer';
import { ShieldCheck, Users, Cpu, FileText, TrendingUp, Key } from 'lucide-react';

export default function AdminLayout() {
  const location = useLocation();

  const navLinks = [
    { to: '/admin/users', label: 'Users, Tenants & Roles', icon: Users },
    { to: '/admin/models', label: 'AI Model Registry', icon: Cpu },
    { to: '/admin/audit', label: 'Cryptographic Audit Log', icon: FileText },
    { to: '/impact', label: 'Impact Studio Demo', icon: TrendingUp }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--color-cream-surface)' }}>
      {/* Header - Enterprise Admin */}
      <header
        style={{
          background: '#FFFFFF',
          borderBottom: '1px solid var(--color-border-light)',
          padding: '10px 24px'
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '0px', background: 'var(--color-forest-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFFFFF' }}>
              <ShieldCheck size={18} color="var(--color-lime)" />
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-deep)', fontWeight: '700' }}>
                System Administration & Governance
              </strong>
              <span style={{ fontSize: '0.7rem', color: 'var(--color-charcoal-muted)', display: 'block', fontFamily: 'var(--font-mono)' }}>
                TENANCY MANAGEMENT • MODEL GOVERNANCE • CRYPTOGRAPHIC PROOF
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.725rem', padding: '3px 8px', borderRadius: '0px', background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)', color: '#374151', fontFamily: 'var(--font-mono)' }}>
              TENANT: DL-NCR-EAST-01
            </span>
            <span style={{ fontSize: '0.725rem', padding: '3px 8px', borderRadius: '0px', background: 'var(--color-lime-bg)', border: '1px solid var(--color-steady-border)', color: 'var(--color-steady-text)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
              AUDIT COMPLIANT
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
                  padding: '10px 16px',
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
                <Icon size={14} />
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

      <Footer />
      <RoleSwitcher />
    </div>
  );
}
