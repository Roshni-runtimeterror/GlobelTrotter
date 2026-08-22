import React, { useState } from 'react';
import { Globe, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

export default function Login({ onLoginSuccess, onSwitchToRegister }) {
  const [email, setEmail] = useState('alex.rivera@globetrotter.io');
  const [password, setPassword] = useState('password123');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) return;
    onLoginSuccess({ name: "Alex Rivera", email });
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    setResetEmailSent(true);
    setTimeout(() => {
      setResetEmailSent(false);
      setForgotModalOpen(false);
    }, 2000);
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '460px', padding: '40px 36px' }}>
        
        {/* Logo Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
            marginBottom: '16px'
          }}>
            <Globe size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Welcome to GlobeTrotter</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            Your intelligent travel planner & pixel passport
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="email"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="name@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <button 
                type="button"
                onClick={() => setForgotModalOpen(true)}
                style={{ background: 'none', border: 'none', color: '#818cf8', fontSize: '0.8rem', cursor: 'pointer' }}
              >
                Forgot password?
              </button>
            </div>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="password"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px', marginTop: '10px' }}>
            Sign In to Explorer <ArrowRight size={18} />
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0', gap: '12px' }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
          <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border-color)' }} />
        </div>

        {/* Social Auth Options */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => onLoginSuccess({ name: "Alex Rivera (Google)", email })}
            style={{ fontSize: '0.85rem' }}
          >
            🌐 Google
          </button>
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => onLoginSuccess({ name: "Alex Rivera (Apple)", email })}
            style={{ fontSize: '0.85rem' }}
          >
            🍎 Apple ID
          </button>
        </div>

        {/* Switch to Register */}
        <div style={{ textAlign: 'center', marginTop: '28px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Don't have an account yet?{' '}
          <button 
            type="button"
            onClick={onSwitchToRegister}
            style={{ background: 'none', border: 'none', color: '#ec4899', fontWeight: 600, cursor: 'pointer' }}
          >
            Create an account
          </button>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="modal-overlay" onClick={() => setForgotModalOpen(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '12px' }}>Reset Your Password</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              Enter your email address and we'll send you password recovery instructions.
            </p>
            {resetEmailSent ? (
              <div className="badge badge-emerald" style={{ padding: '10px 14px', width: '100%', justifyContent: 'center' }}>
                <ShieldCheck size={16} /> Password reset link sent! Check your inbox.
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit}>
                <div className="form-group">
                  <input type="email" className="form-input" defaultValue={email} required />
                </div>
                <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                  <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setForgotModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                    Send Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
