import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, ArrowRight, ShieldCheck, Zap, Battery, Sliders, Lock, Info } from 'lucide-react';
import { SimulationBadge } from '../../components/common/BadgesAndKpis';

export default function ResidentOnboarding() {
  const navigate = useNavigate();
  const { currentResident, residentLoads, toggleLoadProtection, residentTier, setResidentTier, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState(residentTier || 'Standard');
  const [consentGiven, setConsentGiven] = useState(true);

  const tiers = [
    {
      id: 'Essential',
      name: 'Essential Reliability',
      price: '₹0 / month (Included)',
      allocation: '1.8 kWh',
      description: 'Guarantees medical life-support, emergency lighting, and router during any grid contingency.',
      loads: ['Medical Devices', 'LED Lighting', 'Wi-Fi Router']
    },
    {
      id: 'Standard',
      name: 'Standard Family (Recommended)',
      price: '₹150 / month',
      allocation: '2.4 kWh',
      description: 'Protects refrigerator food preservation, Wi-Fi, work laptop, water purifier, and BLDC fans.',
      loads: ['Refrigerator', 'Workstation', 'Water Purifier', 'LED & Fans']
    },
    {
      id: 'Premium',
      name: 'Premium Continuous',
      price: '₹400 / month',
      allocation: '4.5 kWh',
      description: 'Extended battery runtime including 1 dedicated inverter AC room and full domestic comfort.',
      loads: ['1.5 Ton Inverter AC', 'All Standard Loads', 'EV 2W Emergency Top-up']
    }
  ];

  const handleComplete = () => {
    setResidentTier(selectedTier);
    showToast(`Onboarding complete! Enrolled in ${selectedTier} Reliability Tier.`, 'success');
    navigate('/resident/today');
  };

  return (
    <div style={{ maxWidth: '720px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--color-teal)' }}>
            Welcome to Mohalla Grid
          </span>
          <SimulationBadge text="RESIDENT ONBOARDING (WF-10)" />
        </div>
        <h1 style={{ fontSize: '2.1rem', color: 'var(--color-forest-deep)', marginBottom: '8px' }}>
          Configure Your Neighbourhood Power Security
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--color-charcoal-muted)' }}>
          Step {step} of 4 • Tailored for {currentResident.householdId} (Mayur Vihar)
        </p>
      </div>

      {/* Step Indicators */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative', marginBottom: '16px' }}>
        {[
          { num: 1, label: 'Profile' },
          { num: 2, label: 'Reliability Tier' },
          { num: 3, label: 'Protected Loads' },
          { num: 4, label: 'Consent & Done' }
        ].map((s) => {
          const isDone = s.num < step;
          const isCurrent = s.num === step;
          return (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', zIndex: 2 }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: isDone ? 'var(--color-lime)' : isCurrent ? 'var(--color-forest-deep)' : '#E5E7EB',
                  color: isDone ? '#032E16' : isCurrent ? '#FFFFFF' : '#6B7280',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: '700',
                  fontSize: '0.85rem'
                }}
              >
                {isDone ? <CheckCircle2 size={18} /> : s.num}
              </div>
              <span style={{ fontSize: '0.75rem', fontWeight: isCurrent ? '700' : '500', color: isCurrent ? 'var(--color-forest-deep)' : '#6B7280' }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Household Profile Confirmation */}
      {step === 1 && (
        <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
            Confirm Household Details
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
            We matched your Smart Meter with Mayur Vihar Feeder F-402.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div style={{ background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Consumer Name</span>
              <strong style={{ fontSize: '0.95rem' }}>{currentResident.name}</strong>
            </div>

            <div style={{ background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Smart Meter ID</span>
              <strong style={{ fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}>{currentResident.smartMeterId}</strong>
            </div>

            <div style={{ background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Rooftop Solar PV</span>
              <strong style={{ fontSize: '0.95rem', color: 'var(--color-forest)' }}>{currentResident.rooftopSolarKW} kW Connected</strong>
            </div>

            <div style={{ background: 'var(--color-cream-surface)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border-light)' }}>
              <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>Feeder Node</span>
              <strong style={{ fontSize: '0.95rem' }}>{currentResident.feederName}</strong>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
            <button onClick={() => setStep(2)} className="btn btn-primary">
              Continue to Reliability Tiers →
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Choose Reliability Tier */}
      {step === 2 && (
        <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
              Select Your Community Battery Reliability Tier
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)', margin: '4px 0 0 0' }}>
              Every member receives a guaranteed slice of the 500 kWh Community BESS container.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {tiers.map((t) => {
              const isSelected = selectedTier === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTier(t.id)}
                  style={{
                    border: isSelected ? '2px solid var(--color-forest-deep)' : '1px solid var(--color-border-light)',
                    background: isSelected ? '#F0FDF4' : '#FFFFFF',
                    borderRadius: '12px',
                    padding: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '8px',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="radio"
                        checked={isSelected}
                        onChange={() => setSelectedTier(t.id)}
                        style={{ accentColor: 'var(--color-forest-deep)' }}
                      />
                      <strong style={{ fontSize: '1.05rem', color: 'var(--color-forest-deep)' }}>{t.name}</strong>
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'var(--color-forest)', background: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>
                      {t.allocation} Reserve
                    </span>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--color-charcoal-muted)', margin: 0 }}>
                    {t.description}
                  </p>

                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '4px' }}>
                    {t.loads.map((l, idx) => (
                      <span key={idx} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '4px', background: 'var(--color-cream-surface)', color: 'var(--color-charcoal)' }}>
                        ✓ {l}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <button onClick={() => setStep(1)} className="btn btn-secondary">
              ← Back
            </button>
            <button onClick={() => setStep(3)} className="btn btn-primary">
              Continue to Load Prioritization →
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Select Protected Loads */}
      {step === 3 && (
        <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
              Prioritize Your Household Loads
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)', margin: '4px 0 0 0' }}>
              Check the appliances you want prioritized on your smart circuit during microgrid islanding.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {residentLoads.map((load) => (
              <div
                key={load.id}
                onClick={() => toggleLoadProtection(load.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '10px',
                  border: load.defaultProtected ? '1px solid #A7F3D0' : '1px solid var(--color-border-light)',
                  background: load.defaultProtected ? '#ECFDF5' : '#FFFFFF',
                  cursor: 'pointer'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input
                    type="checkbox"
                    checked={load.defaultProtected}
                    onChange={() => {}}
                    style={{ accentColor: 'var(--color-lime)', width: '18px', height: '18px' }}
                  />
                  <div>
                    <strong style={{ fontSize: '0.95rem', color: 'var(--color-charcoal)' }}>{load.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal-muted)', display: 'block' }}>
                      Category: {load.category} • {load.powerWatts} Watts
                    </span>
                  </div>
                </div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    color: load.defaultProtected ? '#065F46' : '#6B7280'
                  }}
                >
                  {load.defaultProtected ? 'PROTECTED' : 'FLEXIBLE'}
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <button onClick={() => setStep(2)} className="btn btn-secondary">
              ← Back
            </button>
            <button onClick={() => setStep(4)} className="btn btn-primary">
              Continue to Consent →
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: Consent & Launch */}
      {step === 4 && (
        <div className="card animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', color: 'var(--color-forest-deep)', margin: 0 }}>
              Consent & Privacy Protection
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal-muted)', margin: '4px 0 0 0' }}>
              Mohalla Grid respects your privacy and ensures voluntary demand participation.
            </p>
          </div>

          <div style={{ background: 'var(--color-cream-surface)', padding: '16px', borderRadius: '12px', border: '1px solid var(--color-border-light)', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <Lock size={18} color="var(--color-forest)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Zero Household Telemetry Leakage:</strong> Your detailed device data stays private on your local gateway. Only aggregated feeder totals are shared with the utility.
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
              <ShieldCheck size={18} color="var(--color-forest)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Voluntary Demand Response:</strong> You can decline any DR offer without penalty. Comfort is always respected.
              </div>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={consentGiven}
              onChange={(e) => setConsentGiven(e.target.checked)}
              style={{ accentColor: 'var(--color-forest-deep)', width: '18px', height: '18px' }}
            />
            <span>I agree to participate in Mayur Vihar Urja Sahakari Samiti cooperative microgrid.</span>
          </label>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
            <button onClick={() => setStep(3)} className="btn btn-secondary">
              ← Back
            </button>
            <button
              onClick={handleComplete}
              disabled={!consentGiven}
              className="btn btn-lime btn-lg"
              style={{ opacity: consentGiven ? 1 : 0.5 }}
            >
              Launch Resident Dashboard (WF-11) →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
