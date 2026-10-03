import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Settings, Lock, Bell, Globe, ShieldCheck, Smartphone, Check } from 'lucide-react';
import { SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function ResidentSettings() {
  const { currentResident, notificationPrefs, setNotificationPrefs, showToast } = useApp();
  const [dataShareAggregated, setDataShareAggregated] = useState(true);
  const [allowAutomatedSmartPlug, setAllowAutomatedSmartPlug] = useState(true);

  const handleSave = () => {
    showToast('Preferences and privacy settings updated successfully.', 'success');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '840px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Household Preferences & Control
          </span>
          <h1 style={{ fontSize: '2rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Settings & Privacy
          </h1>
        </div>
        <SimulationBadge text="PRIVACY CONTROL (WF-18)" />
      </div>

      {/* NOTIFICATION CHANNELS */}
      <div className="card">
        <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', marginBottom: '8px' }}>
          Alert & Demand Response Notification Channels
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', marginBottom: '16px' }}>
          Choose how you wish to receive pre-cooling warnings and demand shift reward opportunities.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)', background: 'var(--color-cream-surface)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Smartphone size={18} color="var(--color-forest)" />
              <div>
                <strong style={{ fontSize: '0.9rem' }}>WhatsApp Alerts (Instant 1-Tap Response)</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Connected to {currentResident.phone}</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationPrefs.whatsapp}
              onChange={(e) => setNotificationPrefs({ ...notificationPrefs, whatsapp: e.target.checked })}
              style={{ accentColor: 'var(--color-forest-deep)', width: '18px', height: '18px' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)', background: 'var(--color-cream-surface)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Bell size={18} color="var(--color-forest)" />
              <div>
                <strong style={{ fontSize: '0.9rem' }}>SMS Text Messages (Offline Fallback)</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Used during cellular data congestion</span>
              </div>
            </div>
            <input
              type="checkbox"
              checked={notificationPrefs.sms}
              onChange={(e) => setNotificationPrefs({ ...notificationPrefs, sms: e.target.checked })}
              style={{ accentColor: 'var(--color-forest-deep)', width: '18px', height: '18px' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)', background: 'var(--color-cream-surface)', cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Globe size={18} color="var(--color-forest)" />
              <div>
                <strong style={{ fontSize: '0.9rem' }}>Language & Tone Preference</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Active: {notificationPrefs.language}</span>
              </div>
            </div>
            <select
              value={notificationPrefs.language}
              onChange={(e) => setNotificationPrefs({ ...notificationPrefs, language: e.target.value })}
              style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid var(--color-border-light)', background: '#FFFFFF', fontSize: '0.85rem' }}
            >
              <option value="English & Hindi (Hinglish)">English & Hindi (Hinglish)</option>
              <option value="Pure English">Pure English</option>
              <option value="Pure Hindi (Shuddh)">Pure Hindi (Shuddh)</option>
            </select>
          </label>
        </div>
      </div>

      {/* PRIVACY & DATA GOVERNANCE */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Lock size={20} color="var(--color-forest)" />
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Strict Privacy Safeguards
          </h3>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', marginBottom: '16px' }}>
          Mohalla Grid uses edge computing on your home gateway. We never sell or expose private appliance telemetry.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)', background: 'var(--color-cream-surface)', cursor: 'pointer' }}>
            <div>
              <strong style={{ fontSize: '0.9rem' }}>Share Anonymized Aggregated Feeder Sums</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Required for DISCOM M&V settlement calculation</span>
            </div>
            <input
              type="checkbox"
              checked={dataShareAggregated}
              onChange={(e) => setDataShareAggregated(e.target.checked)}
              style={{ accentColor: 'var(--color-forest-deep)', width: '18px', height: '18px' }}
            />
          </label>

          <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)', background: 'var(--color-cream-surface)', cursor: 'pointer' }}>
            <div>
              <strong style={{ fontSize: '0.9rem' }}>Allow Automated Smart Plug Relief (Optional)</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Automatically adjusts AC thermostat by +1°C during DR events</span>
            </div>
            <input
              type="checkbox"
              checked={allowAutomatedSmartPlug}
              onChange={(e) => setAllowAutomatedSmartPlug(e.target.checked)}
              style={{ accentColor: 'var(--color-forest-deep)', width: '18px', height: '18px' }}
            />
          </label>
        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
        <Link to="/resident/today" className="btn btn-secondary">
          ← Back to Dashboard (WF-11)
        </Link>
        <button onClick={handleSave} className="btn btn-primary">
          Save Settings & Privacy Controls
        </button>
      </div>
    </div>
  );
}
