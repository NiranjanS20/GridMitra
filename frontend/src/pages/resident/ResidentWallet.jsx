import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Wallet, TrendingUp, DollarSign, Download, ArrowUpRight, ArrowDownLeft, ShieldCheck } from 'lucide-react';
import { StatusBadge, SimulationBadge, KpiCard } from '../../components/common/BadgesAndKpis';

export default function ResidentWallet() {
  const { currentResident, walletBalance, creditsEarned } = useApp();

  const transactions = [
    { id: 'TXN-904', date: '2026-10-03', title: 'Demand Response Peak Relief Reward (DR-402)', type: 'credit', amount: 85.00, status: 'Verified' },
    { id: 'TXN-903', date: '2026-10-02', title: 'Rooftop Solar Surplus Export (6.4 kWh @ ₹3.80)', type: 'credit', amount: 24.32, status: 'Settled' },
    { id: 'TXN-902', date: '2026-09-30', title: 'Monthly Cooperative Dividend Share (Q2 FY27)', type: 'credit', amount: 484.00, status: 'Settled' },
    { id: 'TXN-901', date: '2026-09-28', title: 'Standard Reliability Tier Subscription (Sep)', type: 'debit', amount: 150.00, status: 'Paid' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Financial Ledger & Rewards
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Wallet & Billing
          </h1>
        </div>
        <SimulationBadge text="COOPERATIVE REWARD LEDGER" />
      </div>

      {/* Main Balance Card */}
      <div className="card" style={{ background: 'var(--color-forest)', color: '#FFFFFF', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-cream-dark)', textTransform: 'uppercase' }}>Available Wallet Balance</span>
          <h2 style={{ fontSize: '2.5rem', color: 'var(--color-lime-bright)', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            ₹{walletBalance.toFixed(2)}
          </h2>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-dark)' }}>
            Can be adjusted against DISCOM electricity bill or transferred to UPI
          </span>
        </div>

        <div>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-cream-dark)', textTransform: 'uppercase' }}>Demand Response Earnings</span>
          <h3 style={{ fontSize: '1.75rem', color: '#FFFFFF', margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            ₹{creditsEarned.toFixed(2)}
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-cream-dark)' }}>
            Month-to-date rewards from 4 DR shift events
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '8px' }}>
          <button className="btn btn-lime btn-sm" style={{ width: '100%' }}>
            Apply Credits to BSES Bill
          </button>
          <button className="btn btn-outline-white btn-sm" style={{ width: '100%' }}>
            Download Tax Receipt (PDF)
          </button>
        </div>
      </div>

      {/* TARIFF BREAKDOWN TRANSPARENCY */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '12px' }}>
          Transparent Tariff & Reward Rates
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', marginBottom: '16px' }}>
          Approved by Delhi Electricity Regulatory Commission (DERC) and Mayur Vihar Cooperative Board.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)' }}>Grid Incomer Tariff (DISCOM)</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--color-forest-deep)', display: 'block', fontFamily: 'var(--font-mono)' }}>₹6.50 / kWh</strong>
          </div>

          <div style={{ background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)' }}>Solar Export Feed-in Tariff</span>
            <strong style={{ fontSize: '1.1rem', color: '#059669', display: 'block', fontFamily: 'var(--font-mono)' }}>₹3.80 / kWh</strong>
          </div>

          <div style={{ background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)' }}>Demand Response Peak Reward</span>
            <strong style={{ fontSize: '1.1rem', color: '#059669', display: 'block', fontFamily: 'var(--font-mono)' }}>₹8.50 / kWh</strong>
          </div>

          <div style={{ background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)' }}>Standard Reliability Tier</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--color-forest-deep)', display: 'block', fontFamily: 'var(--font-mono)' }}>₹150 / mo</strong>
          </div>
        </div>
      </div>

      {/* TRANSACTION LEDGER */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Itemized Transaction Ledger
          </h3>
          <span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
            Cryptographically signed smart ledger
          </span>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Type</th>
                <th>Amount (INR)</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(txn => (
                <tr key={txn.id}>
                  <td><strong>{txn.date}</strong></td>
                  <td>{txn.title}</td>
                  <td>
                    <span style={{ color: txn.type === 'credit' ? '#059669' : '#DC2626', fontWeight: '700' }}>
                      {txn.type === 'credit' ? '+ Credit' : '- Subscription'}
                    </span>
                  </td>
                  <td>
                    <strong style={{ color: txn.type === 'credit' ? '#059669' : '#DC2626', fontFamily: 'var(--font-mono)' }}>
                      {txn.type === 'credit' ? `+₹${txn.amount.toFixed(2)}` : `-₹${txn.amount.toFixed(2)}`}
                    </strong>
                  </td>
                  <td><StatusBadge status={txn.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/resident/battery" className="btn btn-secondary">
          ← Back to Community Battery
        </Link>
        <Link to="/resident/impact" className="btn btn-primary">
          View My Impact →
        </Link>
      </div>
    </div>
  );
}
