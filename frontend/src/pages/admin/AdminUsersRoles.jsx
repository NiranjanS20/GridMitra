import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Users, ShieldCheck, Key, Lock, CheckCircle2, XCircle } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function AdminUsersRoles() {
  const users = [
    { id: 'USR-01', name: 'Ananya Sharma', email: 'ananya.s@example.com', role: 'Resident (Member)', tenant: 'Mayur Vihar Samiti', permissions: ['View Home Telemetry', 'Participate in DR', 'Cast Governance Votes'], status: 'Active' },
    { id: 'USR-02', name: 'Rajesh K. (OP-04)', email: 'rajesh.ops@gridmitragrid.in', role: 'Microgrid Operator', tenant: 'Mayur Vihar Substation', permissions: ['Control Room SLD', 'Execute Battery Override', 'Manage Work Orders'], status: 'Active' },
    { id: 'USR-03', name: 'Dr. Sudhir Sen', email: 'president@urjasamiti.org', role: 'Cooperative President', tenant: 'Mayur Vihar Samiti', permissions: ['Create Proposals', 'View Financial Ledgers', 'Approve Dividends'], status: 'Active' },
    { id: 'USR-04', name: 'R. Sengupta', email: 'r.sengupta@bsesdelhi.com', role: 'DISCOM Dispatcher', tenant: 'BSES Yamuna Power Ltd', permissions: ['Feeder SCADA Map', 'Broadcast DR Signals', 'Download DERC Filings'], status: 'Active' },
    { id: 'USR-05', name: 'S. Narayanan', email: 'auditor@antigravity.energy', role: 'System Auditor & Admin', tenant: 'Antigravity Core', permissions: ['Model Promotion', 'Inspect Cryptographic Audit', 'Manage RBAC Roles'], status: 'Active' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Access Control & Tenancy Isolation
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Users, Tenants & Role Permissions
          </h1>
        </div>
        <SimulationBadge text="RBAC SECURITY" />
      </div>

      {/* User Roster Table */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
          Registered Platform Users & Role Scopes
        </h3>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Name & Email</th>
                <th>Role</th>
                <th>Tenant Organization</th>
                <th>Granted Capabilities</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td><strong style={{ fontFamily: 'var(--font-mono)' }}>{u.id}</strong></td>
                  <td>
                    <strong>{u.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>{u.email}</span>
                  </td>
                  <td><span className="badge badge-observed">{u.role}</span></td>
                  <td>{u.tenant}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {u.permissions.map((p, idx) => (
                        <span key={idx} style={{ fontSize: '0.7rem', padding: '2px 6px', borderRadius: '4px', background: 'var(--color-cream-surface)', border: '1px solid var(--color-border-light)' }}>
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td><StatusBadge status={u.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
