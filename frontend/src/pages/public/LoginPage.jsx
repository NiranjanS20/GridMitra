import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, LogIn, Key, Mail, Zap, User, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setActiveRole, showToast } = useApp();
  
  const [role, setRole] = useState('resident');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e, forcedRole = null) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    
    const roleToUse = forcedRole || role;

    // Mock Authentication Logic
    setTimeout(() => {
      setIsLoading(false);
      setActiveRole(role);
      
      // Store mock token corresponding to role for api.js
      if (roleToUse === 'resident') localStorage.setItem('token', 'mock-Resident');
      if (roleToUse === 'operator') localStorage.setItem('token', 'mock-Operator');
      if (roleToUse === 'discom') localStorage.setItem('token', 'mock-DISCOM Engineer');
      if (roleToUse === 'cooperative') localStorage.setItem('token', 'mock-Cooperative');
      if (roleToUse === 'admin') localStorage.setItem('token', 'mock-Admin');

      showToast(`Successfully authenticated to GridMitra as ${roleToUse.toUpperCase()}`, 'success');
      
      // Navigate to the respective dashboard
      navigate(`/${roleToUse}`);
    }, 1000);
  };

  const handleDemoLogin = (demoRole) => {
    setRole(demoRole);
    setEmail(`demo.${demoRole}@gridmitra.in`);
    setPassword('demo-password-123');
    handleLogin(null, demoRole);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: `linear-gradient(rgba(13, 35, 26, 0.8), rgba(13, 35, 26, 0.95)), url('/hero_vast_sky.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: '24px'
    }}>
      
      <div 
        className="card-dark"
        style={{
          width: '100%',
          maxWidth: '480px',
          background: 'rgba(20, 53, 39, 0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(16, 185, 129, 0.15)',
          borderRadius: '24px',
          padding: '40px',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--color-forest-deep)',
            border: '2px solid var(--color-lime)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 0 24px rgba(16, 185, 129, 0.2)'
          }}>
            <Zap size={32} color="var(--color-lime)" />
          </div>
          <h2 style={{ fontSize: '2rem', color: '#FFFFFF', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
            Grid Access Portal
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--color-cream-dark)', margin: 0 }}>
            Secure identity verification for GridMitra
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Role Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#8E9B95', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Authorization Role
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', left: '16px', color: 'var(--color-lime)' }}>
                <ShieldCheck size={20} />
              </div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none',
                  appearance: 'none',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-lime)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              >
                <option value="resident" style={{ background: '#0D231A' }}>Resident / Consumer</option>
                <option value="operator" style={{ background: '#0D231A' }}>Microgrid Operator</option>
                <option value="cooperative" style={{ background: '#0D231A' }}>Cooperative Board</option>
                <option value="discom" style={{ background: '#0D231A' }}>DISCOM Engineer</option>
                <option value="admin" style={{ background: '#0D231A' }}>System Administrator</option>
              </select>
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: '#8E9B95', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Grid ID (Email)
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', left: '16px', color: '#8E9B95' }}>
                <Mail size={20} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-lime)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#8E9B95', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <span>Security Key</span>
              <a href="#" style={{ color: 'var(--color-lime)', textTransform: 'none', fontWeight: '400' }}>Recover Access</a>
            </label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', top: '12px', left: '16px', color: '#8E9B95' }}>
                <Lock size={20} />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 16px 12px 48px',
                  background: 'rgba(0, 0, 0, 0.2)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  color: '#FFFFFF',
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-lime)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              marginTop: '12px',
              padding: '14px',
              background: isLoading ? 'rgba(16, 185, 129, 0.5)' : 'var(--color-lime)',
              color: 'var(--color-forest-deep)',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.05rem',
              fontWeight: '700',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s ease',
              boxShadow: '0 4px 16px rgba(16, 185, 129, 0.25)'
            }}
            onMouseOver={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.35)';
              }
            }}
            onMouseOut={(e) => {
              if (!isLoading) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.25)';
              }
            }}
          >
            {isLoading ? (
              'Authenticating...'
            ) : (
              <>
                Initiate Handshake <ArrowRight size={20} />
              </>
            )}
          </button>

          {/* Quick Demo Credentials */}
          <div style={{ marginTop: '8px', padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <p style={{ fontSize: '0.75rem', color: '#8E9B95', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 12px 0', textAlign: 'center', fontWeight: '700' }}>
              Quick Demo Access
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {['resident', 'operator', 'cooperative', 'discom', 'admin'].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => handleDemoLogin(r)}
                  disabled={isLoading}
                  style={{
                    padding: '6px 12px',
                    fontSize: '0.75rem',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    color: 'var(--color-lime)',
                    borderRadius: '8px',
                    cursor: isLoading ? 'not-allowed' : 'pointer',
                    textTransform: 'capitalize',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => { if(!isLoading) e.target.style.background = 'rgba(16, 185, 129, 0.2)'; }}
                  onMouseOut={(e) => { if(!isLoading) e.target.style.background = 'rgba(16, 185, 129, 0.1)'; }}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: '#8E9B95' }}>
              Protected by RSA-2048 Cryptographic Node Authentication
            </span>
          </div>

        </form>
      </div>
    </div>
  );
}
