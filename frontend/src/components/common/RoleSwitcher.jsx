import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Home,
  Sliders,
  Users,
  Radio,
  ShieldCheck,
  TrendingUp,
  BookOpen
} from 'lucide-react';

export default function RoleSwitcher() {
  const location = useLocation();
  const { toastMessage } = useApp();
  const isLanding = location.pathname === '/';

  const roles = [
    { name: 'Public', path: '/', icon: Sparkles },
    { name: 'Methodology', path: '/methodology', icon: BookOpen },
    { name: 'Resident', path: '/resident/today', matchPrefix: '/resident', icon: Home },
    { name: 'Operator', path: '/operator', matchPrefix: '/operator', icon: Sliders },
    { name: 'Cooperative', path: '/cooperative', matchPrefix: '/cooperative', icon: Users },
    { name: 'DISCOM', path: '/discom', matchPrefix: '/discom', icon: Radio },
    { name: 'Admin', path: '/admin/models', matchPrefix: '/admin', icon: ShieldCheck },
    { name: 'Impact Studio', path: '/impact', matchPrefix: '/impact', icon: TrendingUp }
  ];

  return (
    <>
      {/* Toast Notification Container - Zero Radius */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 10000,
            background: toastMessage.type === 'error' ? '#DC2626' : toastMessage.type === 'warning' ? '#D97706' : '#091913',
            border: '1px solid rgba(255,255,255,0.2)',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '0px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            fontSize: '0.825rem',
            fontWeight: '600',
            fontFamily: 'var(--font-mono)',
            animation: 'fadeIn 0.2s ease-out'
          }}
        >
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Floating Demo Role Bar - Zero Radius */}
      {!isLanding && (
        <nav className="demo-role-bar" aria-label="Demo role selector" style={{ borderRadius: '0px' }}>
          <span style={{ fontSize: '0.675rem', color: '#7A8E85', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 6px', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
            ROLE:
          </span>
          {roles.map(r => {
            const Icon = r.icon;
            const isActive = r.matchPrefix
              ? location.pathname.startsWith(r.matchPrefix)
              : location.pathname === r.path;

            return (
              <NavLink
                key={r.name}
                to={r.path}
                className={`demo-role-link ${isActive ? 'active' : ''}`}
                style={{ borderRadius: '0px' }}
                title={`Switch to ${r.name} Journey`}
              >
                <Icon size={13} />
                <span>{r.name}</span>
              </NavLink>
            );
          })}
        </nav>
      )}
    </>
  );
}
