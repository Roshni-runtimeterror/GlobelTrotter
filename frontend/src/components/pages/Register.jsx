import React, { useState } from 'react';
import { Globe, Lock, Mail, User, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Register({ onRegisterSuccess, onSwitchToLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }
    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 characters.");
      return;
    }
    onRegisterSuccess({ name, email });
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '480px', padding: '40px 36px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(236, 72, 153, 0.4)',
            marginBottom: '16px'
          }}>
            <Globe size={32} color="#fff" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Create Your GlobeTrotter Account</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '6px' }}>
            Start planning journeys, AI recommendations, & collecting pixel stamps!
          </p>
        </div>

        {errorMsg && (
          <div className="badge badge-rose" style={{ width: '100%', padding: '10px 14px', marginBottom: '16px', justifyContent: 'center' }}>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="e.g. Alex Rivera"
                value={name}
                onChange={e => { setName(e.target.value); setErrorMsg(''); }}
                required
              />
            </div>
          </div>

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
                onChange={e => { setEmail(e.target.value); setErrorMsg(''); }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="password"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="At least 6 characters"
                value={password}
                onChange={e => { setPassword(e.target.value); setErrorMsg(''); }}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="password"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={e => { setConfirmPassword(e.target.value); setErrorMsg(''); }}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-accent" style={{ width: '100%', padding: '14px', marginTop: '10px' }}>
            Complete Registration <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
          Already have an account?{' '}
          <button 
            type="button"
            onClick={onSwitchToLogin}
            style={{ background: 'none', border: 'none', color: '#818cf8', fontWeight: 600, cursor: 'pointer' }}
          >
            Sign In here
          </button>
        </div>

      </div>
    </div>
  );
}
