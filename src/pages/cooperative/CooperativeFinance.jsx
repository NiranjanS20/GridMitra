import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { DollarSign, TrendingUp, PieChart, Award, ShieldCheck, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function CooperativeFinance() {
  const { finances } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Financial Statements & Member Dividends
          </span>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Cooperative Financial Health & Dividend Payouts
          </h1>
        </div>
        <SimulationBadge text="Q2 FY27 AUDITED (WF-31)" />
      </div>

      {/* Financial KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <KpiCard
          title="Gross Revenue (Q2)"
          value={`₹${finances.grossRevenueINR.toLocaleString()}`}
          subtitle="DR + Solar + Arbitrage"
          delta="+18% QoQ"
          deltaType="positive"
          icon={TrendingUp}
        />

        <KpiCard
          title="Operating Expenses"
          value={`₹${finances.operatingCostsINR.toLocaleString()}`}
          subtitle="Maintenance, BMS & Ops"
          delta="Controlled"
          icon={DollarSign}
        />

        <KpiCard
          title="Net Member Surplus"
          value={`₹${finances.netSurplusINR.toLocaleString()}`}
          subtitle="63.8% Profit Margin"
          delta="Profitable"
          deltaType="positive"
          icon={Award}
        />

        <KpiCard
          title="Avg Household Dividend"
          value={`₹${finances.avgMemberDividendINR.toFixed(2)}`}
          subtitle="Paid directly to 280 homes"
          delta="Credited"
          deltaType="positive"
          icon={DollarSign}
        />
      </div>

      {/* REVENUE & EXPENSE FLOW BREAKDOWN */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
          Revenue Streams & Capital Allocation Flow
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          {/* Revenue Inflow Card */}
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '12px', padding: '20px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#166534', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Revenue Inflows (₹2,45,000)
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>DISCOM Demand Response Incentives</span>
                <strong style={{ color: '#15803D', fontFamily: 'var(--font-mono)' }}>₹{finances.discomDRIncentivesINR.toLocaleString()} (58%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Rooftop Solar Surplus Sales</span>
                <strong style={{ color: '#15803D', fontFamily: 'var(--font-mono)' }}>₹{finances.solarSurplusSalesINR.toLocaleString()} (28%)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Battery Price Arbitrage Margin</span>
                <strong style={{ color: '#15803D', fontFamily: 'var(--font-mono)' }}>₹{finances.batteryArbitrageMarginINR.toLocaleString()} (14%)</strong>
              </div>
            </div>
          </div>

          {/* Allocation Outflow Card */}
          <div style={{ background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)', borderRadius: '12px', padding: '20px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-forest-deep)', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Surplus Distribution & Reserve
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Member Dividend Pool (60% Payout)</span>
                <strong style={{ color: 'var(--color-forest-deep)', fontFamily: 'var(--font-mono)' }}>₹{finances.dividendPoolINR.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Battery Replacement Reserve (40%)</span>
                <strong style={{ color: 'var(--color-teal)', fontFamily: 'var(--font-mono)' }}>₹{finances.capitalReserveINR.toLocaleString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                <span>Project CAPEX Payback Progress</span>
                <strong style={{ color: '#059669', fontFamily: 'var(--font-mono)' }}>{finances.projectCapexRecoveryPercentage}% Recovered</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
