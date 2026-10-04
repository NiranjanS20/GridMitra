import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { MessageSquare, Phone, Smartphone, CheckCheck, Send, CheckCircle2, Zap } from 'lucide-react';
import { SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function ResidentCommunications() {
  const { currentResident, acceptDREvent, declineDREvent, drStatus } = useApp();
  const [activeChannel, setActiveChannel] = useState('whatsapp'); // 'whatsapp', 'sms', 'ivr'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Inclusive Citizen Engagement
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            WhatsApp, SMS & IVR Dispatch
          </h1>
        </div>
        <SimulationBadge text="MULTI-CHANNEL SIMULATOR" />
      </div>

      {/* Channel Switcher */}
      <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border-light)', paddingBottom: '8px' }}>
        <button
          onClick={() => setActiveChannel('whatsapp')}
          className={`btn btn-sm ${activeChannel === 'whatsapp' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Smartphone size={16} /> WhatsApp Bot (Bilingual)
        </button>
        <button
          onClick={() => setActiveChannel('sms')}
          className={`btn btn-sm ${activeChannel === 'sms' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <MessageSquare size={16} /> SMS Text Alerts
        </button>
        <button
          onClick={() => setActiveChannel('ivr')}
          className={`btn btn-sm ${activeChannel === 'ivr' ? 'btn-primary' : 'btn-secondary'}`}
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Phone size={16} /> Automated IVR Voice Call
        </button>
      </div>

      {/* WHATSAPP CHAT SIMULATOR */}
      {activeChannel === 'whatsapp' && (
        <div style={{ maxWidth: '520px', margin: '0 auto', width: '100%', background: '#ECE5DD', borderRadius: '16px', overflow: 'hidden', border: '1px solid #D1D5DB', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
          {/* WhatsApp Header */}
          <div style={{ background: '#075E54', color: '#FFFFFF', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#128C7E', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700' }}>
              ⚡
            </div>
            <div>
              <strong style={{ fontSize: '0.95rem', display: 'block' }}>GridMitra Bot</strong>
              <span style={{ fontSize: '0.75rem', color: '#A7F3D0' }}>Verified Cooperative Bot • Online</span>
            </div>
          </div>

          {/* Chat Messages Body */}
          <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '380px' }}>
            {/* System Message */}
            <div style={{ alignSelf: 'center', background: '#D9FDD3', padding: '4px 12px', borderRadius: '8px', fontSize: '0.7rem', color: '#374151' }}>
              TODAY • OCT 3, 2026
            </div>

            {/* Message 1: Morning Briefing */}
            <div style={{ alignSelf: 'flex-start', background: '#FFFFFF', padding: '10px 14px', borderRadius: '0 12px 12px 12px', maxWidth: '85%', fontSize: '0.825rem', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <p style={{ margin: 0, color: '#111827' }}>
                ☀️ <strong>Namaste Ananya ji!</strong> Aaj Mayur Vihar me afternoon solar achha hai (~14.8 kWh). Lekin sham <strong>18:30 se 21:00</strong> grid par peak stress predicted hai.
              </p>
              <span style={{ fontSize: '0.65rem', color: '#6B7280', display: 'flex', justifyContent: 'flex-end', marginTop: '4px', gap: '2px' }}>
                08:30 AM <CheckCheck size={12} color="#3B82F6" />
              </span>
            </div>

            {/* Message 2: DR Opportunity */}
            <div style={{ alignSelf: 'flex-start', background: '#FFFFFF', padding: '12px 14px', borderRadius: '0 12px 12px 12px', maxWidth: '85%', fontSize: '0.825rem', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
              <p style={{ margin: 0, color: '#111827', fontWeight: '600' }}>
                ⚡ <strong>Demand Response Opportunity (DR-402)</strong>
              </p>
              <p style={{ margin: '6px 0 0 0', color: '#374151' }}>
                Agar aap sham 18:30–21:00 AC ko 25°C par set karein aur geyser/washing machine 21:15 ke baad chalayein, toh aapko <strong>₹85.00 cash credit</strong> milega.
              </p>

              {/* Interactive buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px', borderTop: '1px solid #E5E7EB', paddingTop: '8px' }}>
                {drStatus === 'offer' && (
                  <>
                    <button
                      onClick={acceptDREvent}
                      style={{ background: '#25D366', color: '#FFFFFF', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', textAlign: 'center', cursor: 'pointer' }}
                    >
                      ✓ 1. Accept Offer & Earn ₹85.00
                    </button>
                    <button
                      onClick={declineDREvent}
                      style={{ background: '#F3F4F6', color: '#4B5563', padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', textAlign: 'center', cursor: 'pointer' }}
                    >
                      ✕ 2. Decline (Normal Comfort)
                    </button>
                  </>
                )}

                {drStatus === 'accepted' && (
                  <div style={{ background: '#DCFCE7', color: '#166534', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', textAlign: 'center' }}>
                    ✓ You accepted! Smart meter measuring reduction.
                  </div>
                )}

                {drStatus === 'verified' && (
                  <div style={{ background: '#DCFCE7', color: '#166534', padding: '8px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '700', textAlign: 'center' }}>
                    ✓ Verified! ₹85.00 added to your wallet.
                  </div>
                )}
              </div>
              <span style={{ fontSize: '0.65rem', color: '#6B7280', display: 'flex', justifyContent: 'flex-end', marginTop: '4px', gap: '2px' }}>
                05:30 PM <CheckCheck size={12} color="#3B82F6" />
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SMS & IVR TAB CONTENT */}
      {activeChannel === 'sms' && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '12px' }}>
            Offline SMS Dispatch Template
          </h3>
          <div style={{ background: '#F3F4F6', padding: '16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: '#1F2937' }}>
            [GRIDMITRA-GRID] Alert for Mayur Vihar (Flat 402): High evening feeder load 18:30-21:00. Reply 1 to Shift 1.2kW and earn Rs 85. Reply 2 to skip. Info: gridmitragrid.in/r/402
          </div>
        </div>
      )}

      {activeChannel === 'ivr' && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '12px' }}>
            Automated Voice IVR Call Script (Hindi / English)
          </h3>
          <div style={{ background: '#F0FDF4', padding: '16px', borderRadius: '8px', border: '1px solid #BBF7D0', fontSize: '0.875rem', color: '#166534', lineHeight: 1.6 }}>
            "Namaste. Mayur Vihar Urja Sahakari Samiti se automated sandesh. Sham 6:30 se 9 baje tak feeder par cooling demand high hai. Agar aap geyser aur AC shift karke ₹85 reward kamana chahte hain, toh 1 dabayein. Otherwise phone rakh dein. Dhanyawad."
          </div>
        </div>
      )}

      {/* Navigation Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/resident/today" className="btn btn-secondary">
          ← Back to Resident Today
        </Link>
        <Link to="/operator" className="btn btn-primary">
          Switch to Operator Control Room →
        </Link>
      </div>
    </div>
  );
}
