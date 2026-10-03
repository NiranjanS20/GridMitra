import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Clock, Sun, Zap, Info, Calendar, ArrowRight, ShieldAlert } from 'lucide-react';
import ForecastChart from '../../components/common/ForecastChart';
import { SimulationBadge, ForecastBadge, ObservedBadge } from '../../components/common/BadgesAndKpis';
import WhyDrawer from '../../components/common/WhyDrawer';

export default function ResidentOutlook() {
  const { hourlyForecastData } = useApp();
  const [activeTab, setActiveTab] = useState('24h'); // '24h', '7d'
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isWhyDrawerOpen, setIsWhyDrawerOpen] = useState(false);

  const weeklySummary = [
    { day: 'Today (Sat)', solar: 'High (18.4 kWh)', gridRisk: 'Watch (18:30–21:00)', drOffer: '₹85.00' },
    { day: 'Tomorrow (Sun)', solar: 'Moderate (14.1 kWh)', gridRisk: 'Steady', drOffer: '₹40.00' },
    { day: 'Monday', solar: 'Low - Cloudy (8.2 kWh)', gridRisk: 'Tight (19:00–22:00)', drOffer: '₹140.00' },
    { day: 'Tuesday', solar: 'Moderate (15.0 kWh)', gridRisk: 'Steady', drOffer: '₹50.00' },
    { day: 'Wednesday', solar: 'High (19.2 kWh)', gridRisk: 'Steady', drOffer: '₹35.00' },
    { day: 'Thursday', solar: 'High (18.8 kWh)', gridRisk: 'Steady', drOffer: '₹30.00' },
    { day: 'Friday', solar: 'Moderate (13.5 kWh)', gridRisk: 'Watch', drOffer: '₹75.00' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Predictive Intelligence
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Neighborhood Power Outlook
          </h1>
        </div>
        <SimulationBadge text="NOWCAST MODEL v3.2 (WF-12)" />
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '8px' }}>
        <button
          onClick={() => setActiveTab('24h')}
          className={`btn btn-sm ${activeTab === '24h' ? 'btn-primary' : 'btn-secondary'}`}
        >
          24-Hour Detailed Nowcast
        </button>
        <button
          onClick={() => setActiveTab('7d')}
          className={`btn btn-sm ${activeTab === '7d' ? 'btn-primary' : 'btn-secondary'}`}
        >
          7-Day Weather & DR Outlook
        </button>
      </div>

      {activeTab === '24h' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Forecast Chart Card */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
                  24-Hour Demand & Solar Generation Curve
                </h3>
                <p style={{ fontSize: '0.825rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                  Solid green = Observed telemetry • Dashed amber = Forecast demand (P50) with P10–P90 band
                </p>
              </div>
              <Link to="/methodology" style={{ fontSize: '0.8rem', fontWeight: '600', color: 'var(--color-teal)' }}>
                Physics & Models (WF-02) →
              </Link>
            </div>

            <ForecastChart
              data={hourlyForecastData}
              height={320}
              onPointClick={(pt) => {
                setSelectedPoint(pt);
                setIsWhyDrawerOpen(true);
              }}
            />
          </div>

          {/* Causal Breakdown Card */}
          <div className="card" style={{ background: 'var(--color-cream-surface)' }}>
            <h4 style={{ fontSize: '1.05rem', color: 'var(--color-forest-deep)', marginBottom: '12px' }}>
              Why is 18:30 – 21:00 highlighted in orange?
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px' }}>
              <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
                <strong style={{ fontSize: '0.85rem', color: '#D97706', display: 'block', marginBottom: '4px' }}>
                  1. Solar Sunset Cliff
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                  145 kW of rooftop generation terminates rapidly by 18:00 as sun angles decline.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
                <strong style={{ fontSize: '0.85rem', color: '#DC2626', display: 'block', marginBottom: '4px' }}>
                  2. Concurrency Surge
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                  280 households turn on ACs, induction stoves, and television sets simultaneously.
                </p>
              </div>

              <div style={{ background: '#FFFFFF', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
                <strong style={{ fontSize: '0.85rem', color: '#059669', display: 'block', marginBottom: '4px' }}>
                  3. Autonomous Relief
                </strong>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                  Community BESS injects 120 kW while participating residents shift non-urgent loads.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* 7-Day Outlook Table */
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
            7-Day Feeder Outlook & Demand Response Opportunities
          </h3>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Solar Forecast</th>
                  <th>Grid Stress Risk</th>
                  <th>Estimated DR Payout</th>
                  <th>Recommended Prep</th>
                </tr>
              </thead>
              <tbody>
                {weeklySummary.map((row, idx) => (
                  <tr key={idx}>
                    <td><strong>{row.day}</strong></td>
                    <td>{row.solar}</td>
                    <td>
                      <span style={{ color: row.gridRisk.includes('Tight') ? '#DC2626' : row.gridRisk.includes('Watch') ? '#D97706' : '#059669', fontWeight: '600' }}>
                        {row.gridRisk}
                      </span>
                    </td>
                    <td><strong style={{ color: 'var(--color-forest)' }}>{row.drOffer}</strong></td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
                      {row.gridRisk.includes('Tight') ? 'Pre-cool home early; charge EV overnight' : 'Standard comfort schedule'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Why Drawer */}
      <WhyDrawer
        isOpen={isWhyDrawerOpen}
        onClose={() => setIsWhyDrawerOpen(false)}
        pointData={selectedPoint}
      />
    </div>
  );
}
