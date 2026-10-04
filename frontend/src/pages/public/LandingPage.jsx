import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  Sun,
  Battery,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowRight,
  CheckCircle2,
  Users,
  Radio,
  Sliders,
  Sparkles,
  BarChart3,
  Cpu,
  AlertTriangle,
  Lock,
  Layers,
  ChevronRight
} from 'lucide-react';
import { SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';
import ForecastChart from '../../components/common/ForecastChart';
import { HOURLY_FORECAST_DATA } from '../../data/mockData';

export default function LandingPage() {
  const navigate = useNavigate();
  const [activeScenario, setActiveScenario] = useState('baseline');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0px', width: '100%', overflow: 'hidden' }}>
      {/* 1. FULL-VIEWPORT HERO SECTION */}
      <section
        style={{
          minHeight: '100vh',
          width: '100%',
          position: 'relative',
          backgroundImage: `url('/hero_vast_sky.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 'clamp(175px, 22vh, 235px)',
          boxSizing: 'border-box'
        }}
      >
        {/* Sky-Positioned Typography & CTAs (Spread comfortably across the sky) */}
        <div className="container" style={{ position: 'relative', zIndex: 10, textAlign: 'center', maxWidth: '960px', margin: '0 auto' }}>
          {/* Main Display Headline - Larger & Boldly Editorial */}
          <h1
            style={{
              color: 'var(--color-forest-deep)',
              fontSize: 'clamp(2.8rem, 5.6vw, 4.6rem)',
              lineHeight: 1.08,
              marginBottom: '0px',
              letterSpacing: '-0.03em',
              fontWeight: '600'
            }}
          >
            Reliable power, <br />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontWeight: '400',
                color: '#065F46'
              }}
            >
              neighbourhood by neighbourhood.
            </span>
          </h1>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginTop: 'clamp(150px, 22vh, 240px)' }}>
            <Link
              to="/login"
              className="btn btn-primary btn-lg"
              style={{
                background: 'var(--color-forest-deep)',
                color: '#FFFFFF',
                padding: '14px 34px',
                fontSize: '1.02rem',
                fontWeight: '600',
                boxShadow: '0 8px 24px rgba(13, 35, 26, 0.28)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                borderRadius: '999px',
                transition: 'all 0.2s ease'
              }}
            >
              Explore the Simulation <ArrowRight size={18} />
            </Link>
            <a
              href="#how-it-works"
              className="btn btn-secondary btn-lg"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(13, 35, 26, 0.2)',
                color: 'var(--color-forest-deep)',
                padding: '14px 30px',
                fontSize: '1.02rem',
                borderRadius: '999px',
                fontWeight: '600',
                boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)',
                transition: 'all 0.2s ease'
              }}
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* 2. SIMULATED IMPACT PROOF STRIP */}
      <section style={{ background: 'var(--color-cream)', padding: '48px 0 32px 0' }}>
        <div className="container">
          {/* Key Guarantees Ribbon */}
          <div
            style={{
              background: '#FFFFFF',
              border: '1px solid var(--color-border-light)',
              borderRadius: '16px',
              padding: '14px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              flexWrap: 'wrap',
              gap: '16px',
              boxShadow: '0 4px 16px rgba(13, 35, 26, 0.04)',
              marginBottom: '36px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-forest-deep)' }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>Zero Unserved Critical Energy</span>
            </div>
            <div style={{ width: '1px', height: '18px', background: 'var(--color-border-light)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-forest-deep)' }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>-91.4% Feeder Outages</span>
            </div>
            <div style={{ width: '1px', height: '18px', background: 'var(--color-border-light)' }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: '600', color: 'var(--color-forest-deep)' }}>
              <CheckCircle2 size={18} color="#059669" />
              <span>100% Democratic Governance</span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)', letterSpacing: '0.06em' }}>
                Proven Engineering Outcomes
              </span>
              <h2 style={{ fontSize: '1.85rem', margin: '4px 0 0 0' }}>
                Simulated Performance Across 280 Households
              </h2>
            </div>
            <SimulationBadge text="SIMULATED OUTCOMES — MOHOL F-402 MODEL" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <KpiCard
              title="Outage Hours (Week)"
              value="2.1"
              unit="hrs"
              subtitle="vs 24.5 hrs unmanaged baseline"
              delta="-91.4%"
              deltaType="positive"
              icon={Zap}
            />
            <KpiCard
              title="Critical Load Uptime"
              value="99.8"
              unit="%"
              subtitle="Medical & refrigeration backed up"
              delta="+21.6%"
              deltaType="positive"
              icon={ShieldCheck}
            />
            <KpiCard
              title="Peak Feeder Overload"
              value="88"
              unit="%"
              subtitle="Down from 118% trip threshold"
              delta="-30% peak"
              deltaType="positive"
              icon={Activity}
            />
            <KpiCard
              title="Diesel Gen-Set Savings"
              value="₹14,200"
              unit="/wk"
              subtitle="Eliminated 18 gen-set run hours"
              delta="100% clean"
              deltaType="positive"
              icon={TrendingUp}
            />
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM VS THE SOLUTION ARCHITECTURE */}
      <section style={{ background: 'var(--color-cream-surface)', padding: '64px 0', borderTop: '1px solid var(--color-border-light)', borderBottom: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)', letterSpacing: '0.06em' }}>
              Architectural Shift
            </span>
            <h2 style={{ fontSize: '2.1rem', marginTop: '8px' }}>
              Why Conventional Grids Fail vs. How GridMitra Protects
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-charcoal-muted)', marginTop: '8px' }}>
              As rooftop solar expands, evening solar generation drop-offs coincide with domestic peak demand, tripping overloaded distribution transformers.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Conventional Grid */}
            <div style={{ background: '#FFF5F5', border: '1px solid #FED7D7', borderRadius: '16px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#FEE2E2', color: '#DC2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#991B1B', margin: 0 }}>Conventional Unmanaged Grid</h3>
                  <span style={{ fontSize: '0.75rem', color: '#B91C1C', fontWeight: '600' }}>Reactive & Fragile</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: '#7F1D1D' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#DC2626', fontWeight: 'bold' }}>✕</span>
                  <span><strong>Blind Peak Tripping:</strong> No foresight into evening solar collapse; transformers trip at 118% thermal limit.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#DC2626', fontWeight: 'bold' }}>✕</span>
                  <span><strong>Indiscriminate Blackouts:</strong> Entire colonies go dark; critical medical and food storage loads lose power.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#DC2626', fontWeight: 'bold' }}>✕</span>
                  <span><strong>Expensive Diesel Backup:</strong> Societies burn polluting diesel at ₹24/kWh with no demand-side coordination.</span>
                </li>
              </ul>
            </div>

            {/* GridMitra System */}
            <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '16px', padding: '28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.15rem', color: '#166534', margin: 0 }}>GridMitra Resilient Microgrid</h3>
                  <span style={{ fontSize: '0.75rem', color: '#15803D', fontWeight: '600' }}>Proactive & Self-Healing</span>
                </div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.875rem', color: '#14532D' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</span>
                  <span><strong>3-Hour Cloud Vector Nowcasting:</strong> High-resolution satellite prediction anticipates solar gaps before they hit.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</span>
                  <span><strong>Automated Demand Shifting:</strong> Domestic loads defer via WhatsApp nudges; EV charging pauses dynamically.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '8px' }}>
                  <span style={{ color: '#16A34A', fontWeight: 'bold' }}>✓</span>
                  <span><strong>500 kWh Community BESS:</strong> Shared battery injects power into the transformer low-voltage bus with 99.8% critical uptime.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE 4-STAGE OPERATING MODEL (ANTICIPATE -> PROTECT -> RESTORE -> PROVE) */}
      <section id="how-it-works" style={{ background: 'var(--color-cream)', padding: '64px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 48px auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)', letterSpacing: '0.06em' }}>
              The Core Operating Philosophy
            </span>
            <h2 style={{ fontSize: '2.1rem', marginTop: '8px' }}>
              Predict. Shift. Store. Settle.
            </h2>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-charcoal-muted)' }}>
              GridMitra synchronizes distributed rooftop solar and domestic appliances into a coordinated virtual power plant.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
            {/* Stage 1: Anticipate */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border-light)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sun size={24} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#B45309', textTransform: 'uppercase' }}>
                1. Anticipate
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
                Satellite AI Nowcasting
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
                Cloud vector telemetry predicts rooftop solar generation drop-offs 3 hours ahead, spotting evening feeder stress before overloads trigger.
              </p>
            </div>

            {/* Stage 2: Shift */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border-light)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#EFF6FF', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sliders size={24} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#1D4ED8', textTransform: 'uppercase' }}>
                2. Shift & Earn
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
                Coordinated Demand Response
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
                Residents receive automated WhatsApp nudges to pre-cool homes and defer heavy loads, earning cash credits for every verified kWh shifted.
              </p>
            </div>

            {/* Stage 3: Store & Protect */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border-light)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#ECFDF5', color: '#059669', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Battery size={24} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#047857', textTransform: 'uppercase' }}>
                3. Store & Protect
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
                Community Micro-BESS
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
                A 500 kWh shared battery injects power into the transformer bus, keeping critical life-support, water pumps, and refrigeration running smoothly.
              </p>
            </div>

            {/* Stage 4: Prove */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: '#FFFFFF', padding: '24px', borderRadius: '16px', border: '1px solid var(--color-border-light)' }}>
              <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#F5F3FF', color: '#7C3AED', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BarChart3 size={24} />
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#6D28D9', textTransform: 'uppercase' }}>
                4. Settle & Prove
              </span>
              <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
                M&V Settlement & Audit
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
                CAISO/IS 15888 10-in-10 baseline algorithms verify load reduction, crediting wallets and writing to an immutable cryptographic audit log.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LIVE TELEMETRY & NOWCAST DEMO */}
      <section style={{ background: 'var(--color-cream-surface)', padding: '64px 0', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
                Live Feeder Telemetry
              </span>
              <h2 style={{ fontSize: '1.85rem', margin: '4px 0 0 0' }}>
                24-Hour Feeder Demand & Solar Nowcast (P10/P50/P90)
              </h2>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                View Resident Outlook →
              </Link>
              <Link to="/login" className="btn btn-primary btn-sm">
                Open Forecast Lab →
              </Link>
            </div>
          </div>

          <div style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', border: '1px solid var(--color-border-light)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
            <ForecastChart data={HOURLY_FORECAST_DATA} height={340} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid var(--color-border-light)', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
                <strong>Feeder F-402 (Mohol 11kV Substation):</strong> 280 connected domestic loads, 140 kW rooftop solar, 500 kWh BESS.
              </span>
              
            </div>
          </div>
        </div>
      </section>

      {/* 6. WHO USES IT? (CONNECTED ROLE EXPERIENCES) */}
      <section style={{ background: 'var(--color-forest-deep)', color: '#FFFFFF', padding: '72px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '640px', marginBottom: '44px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)', letterSpacing: '0.06em' }}>
              Connected Multi-Role Platform
            </span>
            <h2 style={{ fontSize: '2.2rem', color: '#FFFFFF', marginTop: '8px' }}>
              Built for every stakeholder across the community energy lifecycle.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
            {/* Resident Card */}
            <div
              className="card-dark"
              style={{ cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', background: '#143527' }}
              onClick={() => navigate('/login')}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#1B4534', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Users size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>
                1. Resident Portal
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-dark)', marginBottom: '16px', lineHeight: 1.5 }}>
                Mobile-first friendly interface. Manage home loads, accept WhatsApp DR events, track shared battery quota, and redeem wallet cash credits.
              </p>
              <span style={{ color: 'var(--color-lime)', fontSize: '0.825rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Launch Resident App →
              </span>
            </div>

            {/* Operator Card */}
            <div
              className="card-dark"
              style={{ cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', background: '#143527' }}
              onClick={() => navigate('/login')}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#1B4534', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Sliders size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>
                2. Operator Control Room
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-dark)', marginBottom: '16px', lineHeight: 1.5 }}>
                Dense control-room single-line diagram, MILP optimal dispatch engine, battery thermal telemetry, and logged overrides.
              </p>
              <span style={{ color: 'var(--color-lime)', fontSize: '0.825rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Open Control Room →
              </span>
            </div>

            {/* Cooperative Card */}
            <div
              className="card-dark"
              style={{ cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', background: '#143527' }}
              onClick={() => navigate('/login')}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#1B4534', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Users size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>
                3. Cooperative Governance
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-dark)', marginBottom: '16px', lineHeight: 1.5 }}>
                Transparent democratic governance, live member voting on battery allocations, revenue dividend distribution, and community health scores.
              </p>
              <span style={{ color: 'var(--color-lime)', fontSize: '0.825rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                Explore Governance →
              </span>
            </div>

            {/* DISCOM Card */}
            <div
              className="card-dark"
              style={{ cursor: 'pointer', transition: 'transform 0.2s ease, border-color 0.2s ease', border: '1px solid rgba(255,255,255,0.1)', padding: '24px', borderRadius: '16px', background: '#143527' }}
              onClick={() => navigate('/login')}
            >
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#1B4534', color: 'var(--color-lime)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <Radio size={20} />
              </div>
              <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '8px' }}>
                4. DISCOM Utility SCADA
              </h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-cream-dark)', marginBottom: '16px', lineHeight: 1.5 }}>
                Feeder network topology maps, voltage drop heatmaps, 1-click emergency DR dispatch, and standard ADMS/DERMS integration.
              </p>
              <span style={{ color: 'var(--color-lime)', fontSize: '0.825rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                View Utility SCADA →
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STANDARDS & PROTOCOLS */}
      <section style={{ background: 'var(--color-cream)', padding: '56px 0', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 32px auto' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)', letterSpacing: '0.06em' }}>
              Rigorous Grid Standards
            </span>
            <h3 style={{ fontSize: '1.75rem', marginTop: '6px' }}>
              Engineered for Utility Compliance & Trust
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-forest-deep)', marginBottom: '4px' }}>CAISO 10-in-10 & IS 15888</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>Mathematical baseline settlement for demand response verification.</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-forest-deep)', marginBottom: '4px' }}>IEEE 1547.4 Islanding</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>Seamless intentional islanding and anti-islanding safety interlocks.</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-forest-deep)', marginBottom: '4px' }}>OpenADR 2.0b Ready</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>Standardized automated demand response event signaling.</p>
            </div>
            <div style={{ background: '#FFFFFF', padding: '18px', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
              <div style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-forest-deep)', marginBottom: '4px' }}>SHA-256 Audit Chain</div>
              <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>Immutable logging for all dispatch overrides, votes, and settlements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FINAL CALL TO ACTION */}
      <section style={{ background: 'var(--color-cream-surface)', padding: '64px 0 80px 0', borderTop: '1px solid var(--color-border-light)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div style={{ background: 'linear-gradient(135deg, #0D231A 0%, #143527 100%)', color: '#FFFFFF', borderRadius: '24px', padding: '56px 32px', maxWidth: '820px', margin: '0 auto', boxShadow: '0 12px 36px rgba(13,35,26,0.15)' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-lime)', letterSpacing: '0.08em', display: 'block', marginBottom: '12px' }}>
              Interactive Live System
            </span>
            <h2 style={{ fontSize: '2.4rem', color: '#FFFFFF', marginBottom: '16px' }}>
              Experience the GridMitra Simulation
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-cream-dark)', marginBottom: '32px', maxWidth: '580px', margin: '0 auto 32px auto', lineHeight: 1.5 }}>
              Stress-test the microgrid under extreme monsoon weather, test battery islanding during feeder outages, or step into a resident's shoes.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
              <Link
                to="/login"
                className="btn btn-primary btn-lg"
                style={{
                  background: 'var(--color-lime)',
                  color: 'var(--color-forest-deep)',
                  fontWeight: '700',
                  padding: '14px 32px',
                  borderRadius: '999px',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)'
                }}
              >
                Launch Impact Studio Demo
              </Link>
              <Link
                to="/login"
                className="btn btn-secondary btn-lg"
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  color: '#FFFFFF',
                  border: '1px solid rgba(255,255,255,0.25)',
                  padding: '14px 28px',
                  borderRadius: '999px',
                  fontWeight: '600'
                }}
              >
                Start Resident Onboarding
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
