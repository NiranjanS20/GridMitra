import React, { useState } from 'react';
import { ObservedBadge, ForecastBadge } from './BadgesAndKpis';
import { Sun, Zap, Info, ArrowUpRight } from 'lucide-react';
import WhyDrawer from './WhyDrawer';

export default function ForecastChart({ data = [], onPointClick, showConfidence = true, height = 300 }) {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const maxVal = 500; // max kW scale
  const chartHeight = height - 60;
  const chartWidth = 720;
  const paddingLeft = 45;
  const paddingBottom = 30;

  const pointsCount = data.length || 1;
  const stepX = (chartWidth - paddingLeft - 20) / (pointsCount - 1);

  const getX = (index) => paddingLeft + index * stepX;
  const getY = (val) => chartHeight - (val / maxVal) * (chartHeight - 40);

  // Confidence area path (P10 to P90)
  const p90Points = data.map((d, i) => `${getX(i)},${getY(d.p90)}`).join(' L ');
  const p10Points = [...data].reverse().map((d, i) => `${getX(data.length - 1 - i)},${getY(d.p10)}`).join(' L ');
  const confidencePath = `M ${p90Points} L ${p10Points} Z`;

  // Forecast Line
  const forecastLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.forecastLoadKW)}`).join(' ');

  // Observed Line (where observed is not null)
  const observedData = data.filter(d => d.observedLoadKW !== null);
  const observedLine = observedData.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.observedLoadKW)}`).join(' ');

  // Solar Line
  const solarLine = data.map((d, i) => `${i === 0 ? 'M' : 'L'} ${getX(i)} ${getY(d.solarGenKW)}`).join(' ');

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setDrawerOpen(true);
    if (onPointClick) onPointClick(point);
  };

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Chart Legend & Indicators */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '0.75rem', fontWeight: '700', fontFamily: 'var(--font-mono)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: '#00E676', display: 'inline-block' }}></span>
            OBSERVED LOAD (kW)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: '#F59E0B', borderTop: '2px dashed #F59E0B', display: 'inline-block' }}></span>
            FORECAST DEMAND (P50)
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: '#F59E0B', opacity: 0.3, display: 'inline-block' }}></span>
            P10–P90 CONFIDENCE
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '12px', height: '3px', background: '#3B82F6', display: 'inline-block' }}></span>
            SOLAR GEN (kW)
          </span>
        </div>
        <span style={{ fontSize: '0.725rem', color: 'var(--color-charcoal-muted)', fontFamily: 'var(--font-mono)' }}>
          CLICK POINT FOR CAUSAL DRILLDOWN
        </span>
      </div>

      {/* SVG Container */}
      <div style={{ width: '100%', overflowX: 'auto', background: 'var(--color-cream-surface)', borderRadius: '0px', padding: '14px', border: '1px solid var(--color-border-light)' }}>
        <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} style={{ width: '100%', height: `${height}px`, minWidth: '600px' }}>
          <defs>
            <linearGradient id="confidenceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines & Y-Axis labels */}
          {[0, 100, 200, 300, 400, 500].map((val) => {
            const y = getY(val);
            return (
              <g key={val}>
                <line x1={paddingLeft} y1={y} x2={chartWidth - 20} y2={y} stroke="#D5DFD9" strokeWidth="1" strokeDasharray="3 3" />
                <text x={paddingLeft - 8} y={y + 4} textAnchor="end" fontSize="10" fill="#7A8E85" fontFamily="var(--font-mono)">
                  {val}kW
                </text>
              </g>
            );
          })}

          {/* Evening Stress Zone Highlight (18:00 - 21:00) */}
          <rect
            x={getX(9) - stepX * 0.5}
            y={20}
            width={stepX * 3}
            height={chartHeight - 40}
            fill="rgba(249, 115, 22, 0.08)"
            rx="0"
          />
          <text x={getX(10.5)} y={35} textAnchor="middle" fontSize="10" fontWeight="800" fill="#C2410C" fontFamily="var(--font-mono)">
            ⚠️ PEAK STRESS WINDOW (18:30–21:00)
          </text>

          {/* Confidence Area */}
          {showConfidence && (
            <path d={confidencePath} fill="url(#confidenceGrad)" />
          )}

          {/* Solar Gen Line */}
          <path d={solarLine} fill="none" stroke="#3B82F6" strokeWidth="2" strokeDasharray="4 2" />

          {/* Forecast Demand Line (Dashed) */}
          <path d={forecastLine} fill="none" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />

          {/* Observed Demand Line (Solid Green) */}
          <path d={observedLine} fill="none" stroke="#00E676" strokeWidth="2.5" />

          {/* Data Points with interactive click */}
          {data.map((d, i) => {
            const x = getX(i);
            const yForecast = getY(d.forecastLoadKW);
            const isStress = d.status.includes('Stress');
            return (
              <g key={i} style={{ cursor: 'pointer' }} onClick={() => handlePointClick(d)}>
                {/* Time label */}
                <text x={x} y={chartHeight - 8} textAnchor="middle" fontSize="10" fill="#4A5B53" fontFamily="var(--font-mono)">
                  {d.hour}
                </text>

                {/* Point square for technical SaaS feel */}
                <rect
                  x={x - (isStress ? 4 : 3)}
                  y={yForecast - (isStress ? 4 : 3)}
                  width={isStress ? 8 : 6}
                  height={isStress ? 8 : 6}
                  fill={isStress ? '#EA580C' : '#F59E0B'}
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Why Explanation Drawer */}
      <WhyDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        pointData={selectedPoint}
      />
    </div>
  );
}
