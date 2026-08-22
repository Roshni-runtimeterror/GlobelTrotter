import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Map, 
  Award, 
  Camera, 
  Check, 
  Sparkles, 
  Edit3, 
  ShieldCheck 
} from 'lucide-react';

export default function UserProfile({ user, onUpdateUser, tripsCount }) {
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);
  const [preferences, setPreferences] = useState(user.preferences || []);
  const [newPref, setNewPref] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    onUpdateUser({
      ...user,
      name,
      bio,
      avatar,
      preferences
    });
    setIsEditing(false);
  };

  const handleAddPref = () => {
    if (!newPref.trim()) return;
    setPreferences(prev => [...prev, newPref.trim()]);
    setNewPref('');
  };

  const handleRemovePref = (idx) => {
    setPreferences(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="container page-wrapper">
      
      {/* Profile Header Banner */}
      <div className="glass-card" style={{ padding: '0', overflow: 'hidden', marginBottom: '28px' }}>
        
        {/* Cover Background */}
        <div style={{
          height: '180px',
          background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 50%, #8b5cf6 100%)',
          position: 'relative'
        }}>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.15) 0%, transparent 60%)'
          }} />
        </div>

        {/* Profile Details Bar */}
        <div style={{ padding: '0 36px 28px 36px', position: 'relative' }}>
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            marginTop: '-60px',
            marginBottom: '20px',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '20px' }}>
              <img 
                src={avatar} 
                alt={name}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #131b2e',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
                }}
              />
              <div>
                <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>{user.name}</h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{user.email}</p>
              </div>
            </div>

            <button className="btn btn-secondary" onClick={() => setIsEditing(!isEditing)}>
              <Edit3 size={16} /> {isEditing ? 'Cancel Editing' : 'Edit Profile'}
            </button>
          </div>

          <p style={{ color: 'var(--text-main)', fontSize: '0.95rem', maxWidth: '700px', marginBottom: '20px' }}>
            "{user.bio}"
          </p>

          {/* Preferences Tags */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontWeight: 600 }}>Travel Interests:</span>
            {preferences.map((pref, i) => (
              <span key={i} className="badge badge-indigo" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                {pref}
                {isEditing && (
                  <button 
                    onClick={() => handleRemovePref(i)} 
                    style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', marginLeft: '4px' }}
                  >
                    ×
                  </button>
                )}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Profile Edit Form */}
      {isEditing && (
        <div className="glass-card" style={{ padding: '28px', marginBottom: '28px' }}>
          <h3 style={{ marginBottom: '16px' }}>Edit Profile Information</h3>
          <form onSubmit={handleSave}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Display Name</label>
                <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label className="form-label">Avatar Image URL</label>
                <input type="url" className="form-input" value={avatar} onChange={e => setAvatar(e.target.value)} required />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea className="form-textarea" rows={2} value={bio} onChange={e => setBio(e.target.value)} />
            </div>

            <div className="form-group">
              <label className="form-label">Add Travel Interest Tag</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. 🏄‍♂️ Surfing, 🏰 Castles" 
                  value={newPref} 
                  onChange={e => setNewPref(e.target.value)} 
                />
                <button type="button" className="btn btn-secondary" onClick={handleAddPref}>Add Tag</button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ marginTop: '12px' }}>
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* Tabs Switcher */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
        <button 
          className={`btn btn-sm ${activeTab === 'overview' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('overview')}
        >
          <Map size={16} /> Travel Stats & Overview
        </button>
        <button 
          className={`btn btn-sm ${activeTab === 'settings' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('settings')}
        >
          <Settings size={16} /> Account Settings
        </button>
      </div>

      {/* Tab 1: Stats & Overview */}
      {activeTab === 'overview' && (
        <div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            
            <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#818cf8', marginBottom: '4px' }}>
                {user.stats?.countriesVisited || 14}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Countries Visited</div>
            </div>

            <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#34d399', marginBottom: '4px' }}>
                {tripsCount}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Trips Created</div>
            </div>

            <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fbbf24', marginBottom: '4px' }}>
                {user.stats?.budgetSaved || "$1,450"}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Total Budget Saved</div>
            </div>

            <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#f472b6', marginBottom: '4px' }}>
                {user.stats?.milesTraveled || "42,800"}
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Miles Traveled</div>
            </div>

          </div>

          <div className="glass-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>🏆 Explorer Milestones & Badges</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
              <div className="badge badge-pixel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                <span>⛩️ JAPAN NOMAD</span>
                <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Unlocked 3 Kyoto trips</span>
              </div>
              <div className="badge badge-pixel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                <span>🏖️ COASTAL MASTER</span>
                <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Unlocked Amalfi Coast</span>
              </div>
              <div className="badge badge-pixel" style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                <span>✨ AI ADVENTURER</span>
                <span style={{ color: '#94a3b8', fontSize: '0.65rem' }}>Used AI Guide 20+ times</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Account Settings */}
      {activeTab === 'settings' && (
        <div className="glass-card" style={{ padding: '28px', maxWidth: '600px' }}>
          <h3 style={{ marginBottom: '20px' }}>Account Settings</h3>
          
          <div className="form-group">
            <label className="form-label">Default Currency</label>
            <select className="form-select" defaultValue="INR">
              <option value="INR">INR (₹) — Indian Rupee</option>
              <option value="USD">USD ($) — United States Dollar</option>
              <option value="EUR">EUR (€) — Euro</option>
              <option value="GBP">GBP (£) — British Pound</option>
              <option value="JPY">JPY (¥) — Japanese Yen</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Notification Preferences</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                <input type="checkbox" defaultChecked /> Email alerts for upcoming itinerary items
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem' }}>
                <input type="checkbox" defaultChecked /> Community trip copy notifications
              </label>
            </div>
          </div>

          <div style={{ marginTop: '24px', pt: '16px', borderTop: '1px solid var(--border-color)' }}>
            <span className="badge badge-emerald"><ShieldCheck size={14} /> Account Verified & Active</span>
          </div>
        </div>
      )}

    </div>
  );
}
