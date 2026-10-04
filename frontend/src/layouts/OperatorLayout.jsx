import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RoleSwitcher from '../components/common/RoleSwitcher';
import Footer from '../components/common/Footer';
import {
  Activity,
  Sliders,
  TrendingUp,
  Users,
  BatteryCharging,
  Scale,
  Wrench,
  Cpu,
  AlertTriangle,
  Zap,
  CheckCircle2
} from 'lucide-react';
import { StatusBadge } from '../components/common/BadgesAndKpis';

export default function OperatorLayout() {
  const { batteryState, dispatchMode, batteryOverride } = useApp();
  const location = useLocation();

  const navLinks = [
    { to: '/operator', label: 'Site Overview', icon: Activity },
    { to: '/operator/dispatch', label: 'Dispatch Controls', icon: Sliders },
    { to: '/operator/forecast', label: 'Forecast Lab', icon: TrendingUp },
    { to: '/operator/members', label: 'Members & Tiers', icon: Users },
    { to: '/operator/battery', label: 'Battery Health', icon: BatteryCharging },
    { to: '/operator/fairness', label: 'Fairness & Access', icon: Scale },
    { to: '/operator/tickets', label: 'Maintenance Tickets', icon: Wrench },
    { to: '/operator/devices', label: 'Devices & Telemetry', icon: Cpu }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#091913', color: '#FFFFFF' }}>
      {/* Top Telemetry Header - Enterprise SCADA */}
      <header
        style={{
          background: '#0D231A',
          borderBottom: '1px solid #1E3D30',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--color-lime)', color: '#091913', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Zap size={18} fill="#091913" />
            </div>
            <strong style={{ fontSize: '1rem', letterSpacing: '0.04em', color: '#FFFFFF', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
              CONTROL ROOM SCADA
            </strong>
          </div>
          <span style={{ fontSize: '0.725rem', padding: '2px 8px', borderRadius: '0px', background: '#15382B', border: '1px solid #235541', color: 'var(--color-lime)', fontFamily: 'var(--font-mono)' }}>
            FEEDER: F-402 (MAYUR VIHAR 11kV)
          </span>
        </div>

        {/* Live status pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.8rem' }}>
          <div>
            <span style={{ color: '#7A8E85', display: 'block', fontSize: '0.675rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>BESS SOC</span>
            <strong style={{ color: 'var(--color-lime)', fontFamily: 'var(--font-mono)' }}>
              {batteryState.currentSOCPercentage}% ({batteryState.currentSOCKWh} kWh)
            </strong>
          </div>

          <div>
            <span style={{ color: '#7A8E85', display: 'block', fontSize: '0.675rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>DISPATCH ALGORITHM</span>
            <strong style={{ color: batteryOverride ? '#F59E0B' : '#00E676', fontFamily: 'var(--font-mono)' }}>
              {dispatchMode}
            </strong>
          </div>

          <div>
            <span style={{ color: '#7A8E85', display: 'block', fontSize: '0.675rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>FEEDER STATUS</span>
            <span style={{ color: '#00E676', display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
              <CheckCircle2 size={12} /> NOMINAL (230V/50Hz)
            </span>
          </div>
        </div>
      </header>

      {/* Main Layout (Sidebar + Content) */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Sidebar */}
        <aside
          style={{
            width: '240px',
            background: '#0D231A',
            borderRight: '1px solid #1E3D30',
            padding: '12px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '1px',
            flexShrink: 0
          }}
        >
          {navLinks.map(link => {
            const Icon = link.icon;
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 18px',
                  borderRadius: '0px',
                  fontSize: '0.825rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#FFFFFF' : '#8E9B95',
                  background: isActive ? '#15382B' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--color-lime)' : '3px solid transparent',
                  transition: 'all 0.12s ease'
                }}
              >
                <Icon size={15} color={isActive ? 'var(--color-lime)' : '#8E9B95'} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </aside>

        {/* Content Area */}
        <main style={{ flex: 1, padding: '24px', overflowY: 'auto', background: '#091913', paddingBottom: '90px' }}>
          <Outlet />
        </main>
      </div>

      <Footer />
      <RoleSwitcher />
    </div>
  );
}
