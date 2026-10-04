import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Activity, Sliders, Battery, Zap, AlertTriangle, TrendingUp, ShieldCheck, ArrowRight, Clock } from 'lucide-react';
import SingleLineDiagram from '../../components/common/SingleLineDiagram';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function OperatorSiteOverview() {
  const navigate = useNavigate();
  const { batteryState, selectedFeeder, dispatchMode, batteryOverride, activeDREvent, hourlyForecastData } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', borderBottom: '1px solid #1E3D30', paddingBottom: '14px' }}>
        <div>
          <span style={{ fontSize: '0.675rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-lime)', letterSpacing: '0.08em', fontFamily: 'var(--font-mono)' }}>
            SCADA TELEMETRY & OPTIMAL DISPATCH SUPERVISION
          </span>
          <h1 style={{ fontSize: '1.9rem', color: '#FFFFFF', margin: '2px 0 0 0', fontWeight: '800', letterSpacing: '-0.02em' }}>
            Site Overview — Mohol F-402
          </h1>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SimulationBadge text="SCADA FEEDER P0 MODEL" />
          <Link to="/operator/dispatch" className="btn btn-lime btn-sm">
            Engage Dispatch Controls →
          </Link>
        </div>
      </div>

      {/* KPI METRIC CARDS ROW - ENVO / SOLARIX HIGH CONTRAST */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
        <div className="card-dark" style={{ border: '1px solid #1E3D30', background: '#0D231A' }}>
          <span style={{ fontSize: '0.675rem', color: '#7A8E85', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>FEEDER ACTIVE LOADING</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '4px 0' }}>
            <strong style={{ fontSize: '1.75rem', color: '#FFFFFF', fontFamily: 'var(--font-mono)' }}>{selectedFeeder.currentLoadKW}</strong>
            <span style={{ fontSize: '0.85rem', color: '#7A8E85', fontFamily: 'var(--font-mono)' }}>/ {selectedFeeder.ratedCapacityKW} kW</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', borderTop: '1px solid #1E3D30', paddingTop: '6px', marginTop: '2px' }}>
            <span style={{ color: '#EA580C', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{selectedFeeder.loadingPercentage}% (TIGHT)</span>
            <span style={{ color: '#7A8E85', fontFamily: 'var(--font-mono)' }}>PEAK 438 kW @ 19:30</span>
          </div>
        </div>

        <div className="card-dark" style={{ border: '1px solid #1E3D30', background: '#0D231A' }}>
          <span style={{ fontSize: '0.675rem', color: '#7A8E85', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>COMMUNITY BESS SOC</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '4px 0' }}>
            <strong style={{ fontSize: '1.75rem', color: 'var(--color-lime)', fontFamily: 'var(--font-mono)' }}>{batteryState.currentSOCPercentage}%</strong>
            <span style={{ fontSize: '0.85rem', color: '#7A8E85', fontFamily: 'var(--font-mono)' }}>({batteryState.currentSOCKWh} kWh)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', borderTop: '1px solid #1E3D30', paddingTop: '6px', marginTop: '2px' }}>
            <span style={{ color: 'var(--color-lime)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>{batteryState.state.toUpperCase()}</span>
            <span style={{ color: '#7A8E85', fontFamily: 'var(--font-mono)' }}>HEALTH: {batteryState.healthSOH}% SOH</span>
          </div>
        </div>

        <div className="card-dark" style={{ border: '1px solid #1E3D30', background: '#0D231A' }}>
          <span style={{ fontSize: '0.675rem', color: '#7A8E85', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>ROOFTOP PV GENERATION</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '4px 0' }}>
            <strong style={{ fontSize: '1.75rem', color: '#F59E0B', fontFamily: 'var(--font-mono)' }}>130</strong>
            <span style={{ fontSize: '0.85rem', color: '#7A8E85', fontFamily: 'var(--font-mono)' }}>/ 145 kWp</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', borderTop: '1px solid #1E3D30', paddingTop: '6px', marginTop: '2px' }}>
            <span style={{ color: '#F59E0B', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>48 INVERTERS ONLINE</span>
            <span style={{ color: '#7A8E85', fontFamily: 'var(--font-mono)' }}>RAMPDOWN @ 17:45</span>
          </div>
        </div>

        <div className="card-dark" style={{ border: '1px solid #1E3D30', background: '#0D231A' }}>
          <span style={{ fontSize: '0.675rem', color: '#7A8E85', textTransform: 'uppercase', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>DR FLEXIBILITY AVAILABLE</span>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', margin: '4px 0' }}>
            <strong style={{ fontSize: '1.75rem', color: '#60A5FA', fontFamily: 'var(--font-mono)' }}>38.2</strong>
            <span style={{ fontSize: '0.85rem', color: '#7A8E85', fontFamily: 'var(--font-mono)' }}>/ 45.0 kW</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.725rem', borderTop: '1px solid #1E3D30', paddingTop: '6px', marginTop: '2px' }}>
            <span style={{ color: '#60A5FA', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>194 ENROLLED RESIDENTS</span>
            <span style={{ color: '#7A8E85', fontFamily: 'var(--font-mono)' }}>₹8.50/kWh RATE</span>
          </div>
        </div>
      </div>

      {/* SINGLE LINE DIAGRAM (P0 COMPONENT) */}
      <SingleLineDiagram
        bess={batteryState}
        feeder={selectedFeeder}
        dispatchMode={dispatchMode}
      />

      {/* UPCOMING 4-HOUR DISPATCH TIMELINE & ALERTS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
        {/* Dispatch Timeline */}
        <div className="card-dark" style={{ border: '1px solid #1E3D30', background: '#0D231A' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
              <Clock size={16} color="var(--color-lime)" />
              Next 4-Hour Dispatch Plan
            </h3>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-lime)', fontFamily: 'var(--font-mono)', fontWeight: '800' }}>
              MILP OPTIMIZER v4.2
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#15382B', border: '1px solid #1E3D30', fontSize: '0.8rem' }}>
              <div>
                <strong>16:00 – 17:30 • Pre-Peak Absorption</strong>
                <span style={{ color: '#7A8E85', display: 'block', fontSize: '0.725rem' }}>Charge battery from residual rooftop solar (+10 kW)</span>
              </div>
              <span style={{ color: 'var(--color-lime)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>STANDBY</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: 'rgba(234, 88, 12, 0.12)', border: '1px solid #EA580C', fontSize: '0.8rem' }}>
              <div>
                <strong style={{ color: '#FDBA74' }}>18:30 – 21:00 • Stress Peak Mitigation</strong>
                <span style={{ color: '#FDBA74', display: 'block', fontSize: '0.725rem' }}>Discharge BESS 120 kW + DR 45 kW Peak Shave</span>
              </div>
              <span style={{ color: '#FB923C', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>RELIEF ACTIVE</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', background: '#15382B', border: '1px solid #1E3D30', fontSize: '0.8rem' }}>
              <div>
                <strong>21:00 – 23:00 • Post-Peak Recovery</strong>
                <span style={{ color: '#7A8E85', display: 'block', fontSize: '0.725rem' }}>Taper BESS discharge to 60 kW; resume pump cycles</span>
              </div>
              <span style={{ color: 'var(--color-lime)', fontWeight: '800', fontFamily: 'var(--font-mono)' }}>RECOVERY</span>
            </div>
          </div>
        </div>

        {/* Live System Alerts */}
        <div className="card-dark" style={{ border: '1px solid #1E3D30', background: '#0D231A' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}>
              <AlertTriangle size={16} color="#F59E0B" />
              Active Substation Alerts
            </h3>
            <span style={{ fontSize: '0.7rem', color: '#F59E0B', fontFamily: 'var(--font-mono)', fontWeight: '800' }}>2 ACTIVE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ background: '#15382B', border: '1px solid #F59E0B', padding: '10px 12px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <strong style={{ color: '#FDE68A', fontFamily: 'var(--font-mono)' }}>TICK-104 • DT-04 Oil Temp Warning</strong>
                <span style={{ color: '#FDE68A', fontSize: '0.675rem', fontFamily: 'var(--font-mono)' }}>11:20 AM</span>
              </div>
              <p style={{ margin: 0, color: '#FEF3C7', fontSize: '0.75rem' }}>
                Oil temp reached 74.2°C under sustained 82% load. Fan radiator switch engaged; current temp 64.5°C.
              </p>
            </div>

            <div style={{ background: '#15382B', border: '1px solid #3B82F6', padding: '10px 12px', fontSize: '0.8rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                <strong style={{ color: '#93C5FD', fontFamily: 'var(--font-mono)' }}>TICK-105 • Smart Meter SM-DL-882930</strong>
                <span style={{ color: '#93C5FD', fontSize: '0.675rem', fontFamily: 'var(--font-mono)' }}>13:45 PM</span>
              </div>
              <p style={{ margin: 0, color: '#DBEAFE', fontSize: '0.75rem' }}>
                Cellular 4G fallback heartbeat timeout in Block C. Field tech dispatched for antenna realignment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
