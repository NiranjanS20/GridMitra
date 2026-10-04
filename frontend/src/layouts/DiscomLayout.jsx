import React from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import RoleSwitcher from '../components/common/RoleSwitcher';
import Footer from '../components/common/Footer';
import { Radio, Map, Zap, FileBarChart, Network, Layers, ShieldCheck } from 'lucide-react';

export default function DiscomLayout() {
  const { selectedFeeder } = useApp();
  const location = useLocation();

  const navLinks = [
    { to: '/discom', label: 'Network Map', icon: Map },
    { to: '/discom/feeder', label: 'Feeder Detail', icon: Layers },
    { to: '/discom/dr', label: 'DR Operations Center', icon: Zap },
    { to: '/discom/analytics', label: 'Analytics & Reports', icon: FileBarChart },
    { to: '/discom/integrations', label: 'ADMS & SCADA Bridge', icon: Network }
  ];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#091913', color: '#FFFFFF' }}>
      {/* Top DISCOM Utility Header */}
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--color-lime)', color: '#091913', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Radio size={16} />
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem', color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: '0.04em', fontFamily: 'var(--font-mono)' }}>
                DISCOM SCADA / DERMS INTERFACE
              </strong>
              <span style={{ fontSize: '0.675rem', color: '#7A8E85', display: 'block', fontFamily: 'var(--font-mono)' }}>
                DELHI DISTRIBUTION GRID OPERATIONS • IEC 61850 / CIM PROTOCOL
              </span>
            </div>
          </div>
        </div>

        {/* Selected Feeder Indicator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', fontSize: '0.8rem' }}>
          <div>
            <span style={{ color: '#7A8E85', display: 'block', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>FEEDER FOCUS</span>
            <strong style={{ color: 'var(--color-lime)', fontFamily: 'var(--font-mono)' }}>
              {selectedFeeder.name} ({selectedFeeder.loadingPercentage}%)
            </strong>
          </div>
          <div>
            <span style={{ color: '#7A8E85', display: 'block', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>GRID FREQUENCY</span>
            <strong style={{ color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>50.02 Hz</strong>
          </div>
        </div>
      </header>

      {/* DISCOM Navigation Bar - Zero Radius */}
      <nav style={{ background: '#0D231A', borderBottom: '1px solid #1E3D30', padding: '0 24px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', gap: '0px' }}>
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
                  color: isActive ? '#FFFFFF' : '#8E9B95',
                  background: isActive ? '#15382B' : 'transparent',
                  borderBottom: isActive ? '2px solid var(--color-lime)' : '2px solid transparent',
                  borderRight: '1px solid #1E3D30',
                  whiteSpace: 'nowrap'
                }}
              >
                <Icon size={14} color={isActive ? 'var(--color-lime)' : '#8E9B95'} />
                <span>{link.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '24px', paddingBottom: '90px', overflowY: 'auto' }}>
        <Outlet />
      </main>

      <Footer />
      <RoleSwitcher />
    </div>
  );
}
