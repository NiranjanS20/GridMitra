import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Radio, Map, AlertTriangle, ShieldCheck, Filter, ArrowRight, Zap } from 'lucide-react';
import FeederMap from '../../components/common/FeederMap';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function DiscomNetworkMap() {
  const navigate = useNavigate();
  const { feeders, selectedFeederId, setSelectedFeederId } = useApp();
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredFeeders = filterStatus === 'all'
    ? feeders
    : feeders.filter(f => f.status.toLowerCase() === filterStatus.toLowerCase());

  const handleSelectFeeder = (feederId) => {
    setSelectedFeederId(feederId);
    navigate('/discom/feeder');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#2A8C90' }}>
            Grid Observability & Topology
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            DISCOM Feeder Network Map
          </h1>
        </div>
        <SimulationBadge text="UTILITY SCADA MAP" />
      </div>

      {/* THREE-COLUMN HERO: FILTERS | MAP | AT-RISK FEEDERS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        {/* Filter & Substation Overview Column */}
        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Filter size={18} color="#2A8C90" />
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: 0 }}>
              Feeder Risk Filter
            </h3>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {['all', 'critical', 'tight', 'watch', 'steady'].map(st => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  background: filterStatus === st ? '#2A8C90' : 'rgba(255, 255, 255, 0.08)',
                  color: filterStatus === st ? '#FFFFFF' : '#8E9B95',
                  border: '1px solid transparent',
                  cursor: 'pointer'
                }}
              >
                {st}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px solid #1E3A3E', paddingTop: '14px', fontSize: '0.825rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8E9B95' }}>Monitored Substation Feeders</span>
              <strong style={{ color: '#FFFFFF' }}>4 Active 11kV Circuits</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8E9B95' }}>Aggregated Load</span>
              <strong style={{ color: 'var(--color-lime)' }}>1,605 / 2,250 kW (71.3%)</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8E9B95' }}>Total Distributed Solar</span>
              <strong style={{ color: '#F59E0B' }}>570 kWp Rooftop PV</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8E9B95' }}>Micro-BESS Buffer</span>
              <strong style={{ color: '#60A5FA' }}>900 kWh / 4 Containers</strong>
            </div>
          </div>
        </div>

        {/* At-Risk Feeder Priority Watchlist */}
        <div style={{ background: '#102226', border: '1px solid #1E3A3E', borderRadius: '12px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#FFFFFF', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} color="#F59E0B" />
              Priority At-Risk Feeders
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#8E9B95' }}>Sorted by Risk</span>
          </div>

          {feeders.filter(f => f.status === 'Critical' || f.status === 'Tight').map(f => (
            <div
              key={f.id}
              onClick={() => handleSelectFeeder(f.id)}
              style={{
                background: f.status === 'Critical' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(249, 115, 22, 0.15)',
                border: f.status === 'Critical' ? '1px solid #EF4444' : '1px solid #F97316',
                borderRadius: '8px',
                padding: '12px',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <strong style={{ fontSize: '0.9rem', color: '#FFFFFF' }}>{f.name}</strong>
                <StatusBadge status={f.status} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#E2DDD3' }}>
                <span>Risk: {f.riskWindow}</span>
                <span style={{ fontWeight: '700', color: f.status === 'Critical' ? '#FCA5A5' : '#FDBA74' }}>
                  {f.loadingPercentage}% ({f.currentLoadKW} kW)
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTERACTIVE GEOSPATIAL MAP */}
      <FeederMap
        feeders={filteredFeeders}
        selectedFeederId={selectedFeederId}
        onSelectFeeder={handleSelectFeeder}
      />
    </div>
  );
}
