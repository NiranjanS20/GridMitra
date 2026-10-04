import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Sun,
  Battery,
  Zap,
  ShieldCheck,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Clock,
  CheckCircle2,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function ResidentToday() {
  const navigate = useNavigate();
  const { currentResident, residentLoads, batteryState, drStatus, acceptDREvent } = useApp();

  const protectedCount = residentLoads.filter(l => l.defaultProtected).length;
  const protectedWattage = residentLoads.filter(l => l.defaultProtected).reduce((sum, l) => sum + l.powerWatts, 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '980px', margin: '0 auto' }}>
      {/* Top Header - Envo / Solarix Style */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-teal)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            HOUSEHOLD ENERGY DISPATCH • MOHOL
          </span>
          <h1 style={{ fontSize: '2.1rem', color: 'var(--color-forest-deep)', margin: '4px 0 0 0', fontWeight: '800', letterSpacing: '-0.03em' }}>
            Power Smarter, Live Resilient.
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SimulationBadge text="LIVE FEEDER F-402 MODEL" />
          <span style={{ padding: '4px 10px', background: 'var(--color-forest-deep)', color: 'var(--color-acid-lime)', fontSize: '0.75rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
            FEEDER: STEADY (230V)
          </span>
        </div>
      </div>

      {/* 3-CARD NUMBERED STACK (01 ANTICIPATE -> 02 SHIFT & EARN -> 03 PROTECT) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        {/* CARD 01: ANTICIPATE (FORECAST ADVISORY) */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--color-border-light)',
            borderLeft: '5px solid #F59E0B',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="step-badge">01</div>
              <div>
                <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: '#B45309', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                  SATELLITE FORECAST ADVISORY • 18:30 – 21:00
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-deep)', margin: '2px 0 0 0', fontWeight: '700' }}>
                  Feeder Stress Window Predicted This Evening
                </h3>
              </div>
            </div>
            <StatusBadge status="Watch (Peak Stress)" />
          </div>

          <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', margin: 0, lineHeight: 1.5 }}>
            Rooftop solar across the 48 Mohol systems will ramp down from 140 kW to 0 kW after 17:45 while domestic air conditioning and cooking loads surge. Transformer DT-04 loading is forecast to reach 97% between 18:30 and 21:00.
          </p>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--color-border-light)', paddingTop: '10px' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', fontFamily: 'var(--font-mono)' }}>
              Confidence Bound: P90 Extreme = 485 kW (Near Trip Zone)
            </span>
            <Link to="/resident/outlook" style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--color-forest-deep)', display: 'inline-flex', alignItems: 'center', gap: '4px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Inspect Causal Why Breakdown →
            </Link>
          </div>
        </div>

        {/* CARD 02: SHIFT & EARN (ENVO ELECTRIC LIME HIGHLIGHT CARD) */}
        <div
          className="card-lime"
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            background: 'var(--color-acid-lime)',
            border: '1px solid #BFEF4B'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '32px', height: '32px', background: 'var(--color-forest-deep)', color: 'var(--color-acid-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
                02
              </div>
              <div>
                <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: '#092015', fontFamily: 'var(--font-mono)', letterSpacing: '0.08em' }}>
                  ACTIVE DEMAND RESPONSE INCENTIVE
                </span>
                <h3 style={{ fontSize: '1.35rem', color: '#092015', margin: '2px 0 0 0', fontWeight: '800' }}>
                  Shift & Earn ₹85.00 This Evening
                </h3>
              </div>
            </div>
            <span style={{ background: '#092015', color: 'var(--color-acid-lime)', padding: '5px 12px', fontSize: '0.775rem', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>
              WINDOW: 18:30 – 21:00
            </span>
          </div>

          <p style={{ fontSize: '0.9rem', color: '#0F3020', margin: 0, lineHeight: 1.5, fontWeight: '500' }}>
            Pre-cool your living space to 22°C before 18:30, then maintain thermostat at 25°C. Defer washing machine and water geysers until 21:15 to earn instant cash credits and prevent local substation brownouts.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid rgba(9, 32, 21, 0.15)', paddingTop: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              {drStatus === 'offer' && (
                <button
                  onClick={acceptDREvent}
                  style={{
                    background: '#092015',
                    color: '#FFFFFF',
                    padding: '10px 22px',
                    fontWeight: '700',
                    fontSize: '0.875rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    border: '1px solid #092015'
                  }}
                >
                  <CheckCircle2 size={16} color="var(--color-acid-lime)" /> Accept DR & Commit 1.2 kW Shift
                </button>
              )}

              {drStatus === 'accepted' && (
                <span style={{ background: '#092015', color: 'var(--color-acid-lime)', padding: '8px 16px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
                  <CheckCircle2 size={16} /> COMMITTED! SETTLING AT 21:00...
                </span>
              )}

              {drStatus === 'verified' && (
                <span style={{ background: '#092015', color: 'var(--color-acid-lime)', padding: '8px 16px', fontSize: '0.85rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-mono)' }}>
                  ✓ VERIFIED! ₹85.00 CREDITED TO WALLET
                </span>
              )}

              <Link to="/resident/shift" style={{ fontSize: '0.825rem', fontWeight: '800', color: '#092015', textDecoration: 'underline' }}>
                View M&V Protocol Details →
              </Link>
            </div>

            <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: '#092015', fontWeight: '700' }}>
              Rate: ₹10.50 / kWh Shifted
            </span>
          </div>
        </div>

        {/* CARD 03: PROTECT (MICROGRID ISLANDING & CIRCUIT LOCK) */}
        <div
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--color-border-light)',
            borderLeft: '5px solid #00E676',
            padding: '20px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div className="step-badge">03</div>
              <div>
                <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-steady-text)', fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>
                  MICROGRID ISLANDING PROTECTION
                </span>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-deep)', margin: '2px 0 0 0', fontWeight: '700' }}>
                  {protectedCount} Circuits Backed by 500 kWh Community BESS ({protectedWattage} W)
                </h3>
              </div>
            </div>
            <Link to="/resident/loads" className="btn btn-secondary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
              <Sliders size={13} /> Manage Load Priorities →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
            {residentLoads.filter(l => l.defaultProtected).map(load => (
              <div key={load.id} style={{ background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)', padding: '10px 12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <strong style={{ fontSize: '0.825rem', color: 'var(--color-forest-deep)' }}>{load.name}</strong>
                  <ShieldCheck size={14} color="#059669" />
                </div>
                <span style={{ fontSize: '0.725rem', color: 'var(--color-charcoal-muted)', fontFamily: 'var(--font-mono)' }}>
                  {load.powerWatts} W • {load.category}
                </span>
              </div>
            ))}
          </div>

          <div style={{ background: '#091913', color: '#FFFFFF', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem', flexWrap: 'wrap', gap: '8px' }}>
            <span style={{ color: 'var(--color-cream-dark)' }}>Your Guaranteed Storage Share: <strong style={{ color: 'var(--color-acid-lime)', fontFamily: 'var(--font-mono)' }}>{currentResident.batteryAllocationKWh} kWh</strong> (~3.4 hrs continuous runtime)</span>
            <Link to="/resident/battery" style={{ fontWeight: '800', color: 'var(--color-acid-lime)', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', textTransform: 'uppercase' }}>
              Check Battery Telemetry →
            </Link>
          </div>
        </div>
      </div>

      {/* QUICK STATS METRIC TILES - SOLARIX HIGH CONTRAST STYLE */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border-light)', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)', fontFamily: 'var(--font-mono)' }}>ROOFTOP SOLAR TODAY</span>
            <Sun size={16} color="#F59E0B" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-forest-deep)', letterSpacing: '-0.02em', fontFamily: 'var(--font-mono)' }}>
            14.8 <span style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', fontWeight: '600' }}>kWh</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>Peak 3.2 kW at 12:45</span>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border-light)', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)', fontFamily: 'var(--font-mono)' }}>COMMUNITY BESS</span>
            <Battery size={16} color="#00E676" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--color-forest-deep)', letterSpacing: '-0.02em', fontFamily: 'var(--font-mono)' }}>
            {batteryState.currentSOCPercentage}% <span style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', fontWeight: '600' }}>({batteryState.currentSOCKWh} kWh)</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-forest)', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>Standby Reserve Ready</span>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid var(--color-border-light)', padding: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-charcoal-muted)', fontFamily: 'var(--font-mono)' }}>WALLET CREDITS</span>
            <TrendingUp size={16} color="#059669" />
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#059669', letterSpacing: '-0.02em', fontFamily: 'var(--font-mono)' }}>
            ₹{currentResident.creditsEarnedThisMonth}
          </div>
          <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>+₹120.00 this week (3 events)</span>
        </div>
      </div>
    </div>
  );
}
