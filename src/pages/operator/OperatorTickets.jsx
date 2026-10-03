import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Wrench, CheckCircle2, Clock, AlertTriangle, UserCheck, Plus, ShieldCheck } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function OperatorTickets() {
  const { tickets, setTickets, showToast, recordAuditEvent } = useApp();
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);

  const handleResolveTicket = (ticketId) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Resolved',
          actionTaken: 'Operator verified telemetry return to normal baseline.'
        };
      }
      return t;
    }));

    recordAuditEvent({
      actor: 'Operator: Duty Engineer (OP-04)',
      action: `Resolved Maintenance Ticket ${ticketId}`,
      category: 'Maintenance Operations',
      target: ticketId,
      previousState: 'In Progress / Open',
      newState: 'Resolved',
      reason: 'Physical inspection completed'
    });

    showToast(`Ticket ${ticketId} marked as Resolved.`, 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-lime)' }}>
            Physical Field Operations
          </span>
          <h1 style={{ fontSize: '2rem', color: '#FFFFFF', margin: 0 }}>
            Maintenance & Service Tickets
          </h1>
        </div>
        <SimulationBadge text="MAINTENANCE WORKFLOW (WF-26)" />
      </div>

      {/* Ticket List & Detail Split View */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        {/* Ticket List */}
        <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '1.15rem', color: '#FFFFFF', margin: '0 0 4px 0' }}>
            Active Service Work Orders ({tickets.length})
          </h3>

          {tickets.map(t => {
            const isSelected = selectedTicket?.id === t.id;
            return (
              <div
                key={t.id}
                onClick={() => setSelectedTicket(t)}
                style={{
                  background: isSelected ? 'rgba(52, 211, 153, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? '1.5px solid var(--color-lime)' : '1px solid var(--color-border-dark)',
                  borderRadius: '10px',
                  padding: '14px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#8E9B95', fontFamily: 'var(--font-mono)' }}>{t.id}</span>
                  <StatusBadge status={t.status} />
                </div>
                <strong style={{ fontSize: '0.95rem', color: '#FFFFFF', display: 'block', marginBottom: '4px' }}>
                  {t.title}
                </strong>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#8E9B95' }}>
                  <span>Assigned: {t.assignedTo}</span>
                  <span>{t.reportedAt}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Ticket Detail Card */}
        {selectedTicket && (
          <div className="card-dark" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-lime)', fontFamily: 'var(--font-mono)', fontWeight: '700' }}>
                  {selectedTicket.id} • Feeder {selectedTicket.feeder}
                </span>
                <h3 style={{ fontSize: '1.25rem', color: '#FFFFFF', margin: '4px 0 0 0' }}>
                  {selectedTicket.title}
                </h3>
              </div>
              <StatusBadge status={selectedTicket.status} />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-border-dark)', borderBottom: '1px solid var(--color-border-dark)', padding: '14px 0', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#8E9B95', display: 'block', fontSize: '0.75rem' }}>Priority Level</span>
                <strong style={{ color: selectedTicket.priority === 'High' ? '#EF4444' : selectedTicket.priority === 'Medium' ? '#F59E0B' : '#10B981' }}>
                  {selectedTicket.priority} Priority
                </strong>
              </div>

              <div>
                <span style={{ color: '#8E9B95', display: 'block', fontSize: '0.75rem' }}>Assigned Engineering Team</span>
                <span style={{ color: '#FFFFFF' }}>{selectedTicket.assignedTo}</span>
              </div>

              <div>
                <span style={{ color: '#8E9B95', display: 'block', fontSize: '0.75rem' }}>Telemetry Root Cause Description</span>
                <p style={{ color: 'var(--color-cream-dark)', margin: '4px 0 0 0' }}>{selectedTicket.description}</p>
              </div>

              <div>
                <span style={{ color: '#8E9B95', display: 'block', fontSize: '0.75rem' }}>Action Taken / Remediation</span>
                <p style={{ color: 'var(--color-lime)', margin: '4px 0 0 0' }}>{selectedTicket.actionTaken}</p>
              </div>
            </div>

            {selectedTicket.status !== 'Resolved' && (
              <button
                onClick={() => handleResolveTicket(selectedTicket.id)}
                className="btn btn-lime btn-sm"
                style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <CheckCircle2 size={16} /> Mark as Resolved & Clear Alert
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
