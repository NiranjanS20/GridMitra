import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { FileText, Users, CheckCircle2, XCircle, Award, ShieldCheck, Vote, Plus } from 'lucide-react';
import { StatusBadge, SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function CooperativeGovernance() {
  const { proposals, userVotes, castVote, governance } = useApp();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Democratic Community Energy Ownership
          </span>
          <h1 style={{ fontSize: '2.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Cooperative Governance & Proposals
          </h1>
        </div>
        <SimulationBadge text="MEMBER LEDGER" />
      </div>

      {/* ACTIVE VOTING PROPOSALS */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--color-forest-deep)', margin: 0 }}>
              Active Member Ballots & Policy Votes
            </h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
              Every registered household has one equal vote on storage reserves, tariffs, and revenue sharing.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {proposals.map(prop => {
            const hasVoted = userVotes[prop.id];
            const totalVotes = prop.votesFor + prop.votesAgainst;
            const percentFor = totalVotes > 0 ? Math.round((prop.votesFor / totalVotes) * 100) : 0;

            return (
              <div
                key={prop.id}
                className="card"
                style={{
                  border: prop.status.includes('Passed') ? '1.5px solid #10B981' : '1.5px solid var(--color-border-light)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--color-teal)', textTransform: 'uppercase' }}>
                      {prop.id} • {prop.category} • Proposed by {prop.proposer}
                    </span>
                    <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: '4px 0 0 0' }}>
                      {prop.title}
                    </h3>
                  </div>
                  <StatusBadge status={prop.status} />
                </div>

                <p style={{ fontSize: '0.9rem', color: 'var(--color-charcoal-muted)', margin: 0, lineHeight: 1.5 }}>
                  {prop.summary}
                </p>

                {/* Vote Progress Bar */}
                <div style={{ background: 'var(--color-cream-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border-light)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                    <span><strong>{prop.votesFor} For</strong> ({percentFor}%)</span>
                    <span style={{ color: 'var(--color-charcoal-muted)' }}>Quorum: 280 Registered • 196 Voted (70%)</span>
                    <span><strong>{prop.votesAgainst} Against</strong> ({100 - percentFor}%)</span>
                  </div>

                  <div style={{ width: '100%', height: '12px', background: '#EF4444', borderRadius: '6px', overflow: 'hidden', display: 'flex' }}>
                    <div style={{ width: `${percentFor}%`, height: '100%', background: '#10B981', transition: 'width 0.3s ease' }} />
                  </div>
                </div>

                {/* Member Vote Interaction */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--color-border-light)', paddingTop: '12px', flexWrap: 'wrap', gap: '8px' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--color-charcoal-muted)' }}>
                    Voting Deadline: <strong>{prop.deadline}</strong>
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    {hasVoted ? (
                      <span style={{ background: '#ECFDF5', color: '#065F46', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <CheckCircle2 size={16} /> Your Vote ({hasVoted.toUpperCase()}) Recorded
                      </span>
                    ) : (
                      <>
                        <button
                          onClick={() => castVote(prop.id, 'against')}
                          className="btn btn-secondary btn-sm"
                          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <XCircle size={16} color="#DC2626" /> Vote Against
                        </button>
                        <button
                          onClick={() => castVote(prop.id, 'for')}
                          className="btn btn-lime btn-sm"
                          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                          <CheckCircle2 size={16} /> Vote For Proposal
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ELECTED BOARD & BYLAWS SUMMARY */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '16px' }}>
          Elected Cooperative Supervisory Committee
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {governance.boardMembers.map((member, idx) => (
            <div key={idx} style={{ background: 'var(--color-cream-surface)', padding: '14px', borderRadius: '10px', border: '1px solid var(--color-border-light)' }}>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest-deep)', display: 'block' }}>{member.name}</strong>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-teal)', display: 'block' }}>{member.role}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', marginTop: '4px', display: 'block' }}>Term: {member.term}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
