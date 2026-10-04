import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FileText, ShieldCheck, Lock, Search, Filter, CheckCircle2 } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function AdminAuditLog() {
  const { auditLogs } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLogs = auditLogs.filter(log =>
    log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Immutable System Verification
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Cryptographic Audit Log
          </h1>
        </div>
        <SimulationBadge text="TAMPER-EVIDENT LEDGER" />
      </div>

      {/* Trust & Guarantee Callout */}
      <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Lock size={20} color="#475569" />
          <span style={{ fontSize: '0.85rem', color: '#334155' }}>
            Every manual override, DR commitment, model promotion, and governance ballot is cryptographically chained and immutable.
          </span>
        </div>
        <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669', background: '#ECFDF5', padding: '4px 10px', borderRadius: '4px' }}>
          Hash Chain Integrity: 100% Valid
        </span>
      </div>

      {/* Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search by actor, action, or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '8px', border: '1px solid var(--color-border-light)', background: '#FFFFFF', fontSize: '0.875rem' }}
          />
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Log ID & Timestamp</th>
                <th>Actor</th>
                <th>Action & Category</th>
                <th>Transition State</th>
                <th>Reason / Justification</th>
                <th>SHA-256 Audit Hash</th>
              </tr>
            </thead>
            <tbody>
              {filteredLogs.map(entry => (
                <tr key={entry.id}>
                  <td>
                    <strong style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'block' }}>{entry.id}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)' }}>{entry.timestamp}</span>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.85rem' }}>{entry.actor}</strong>
                  </td>
                  <td>
                    <strong style={{ fontSize: '0.85rem', display: 'block', color: 'var(--color-forest-deep)' }}>{entry.action}</strong>
                    <span style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: '#F1F5F9', color: '#475569', fontWeight: '600' }}>
                      {entry.category}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem' }}>
                    <div style={{ color: '#64748B' }}>Prev: {entry.previousState}</div>
                    <div style={{ color: '#0F172A', fontWeight: '600' }}>New: {entry.newState}</div>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)', maxWidth: '240px' }}>
                    {entry.reason}
                  </td>
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: '#64748B', display: 'block', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }} title={entry.auditHash}>
                      {entry.auditHash}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
