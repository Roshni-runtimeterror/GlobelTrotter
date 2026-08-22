import React from 'react';
import { 
  Globe, 
  Compass, 
  MapPin, 
  Briefcase, 
  Sparkles, 
  Users, 
  Camera, 
  User, 
  Search, 
  PlusCircle, 
  LogOut 
} from 'lucide-react';

export default function Navbar({ 
  activeScreen, 
  setActiveScreen, 
  user, 
  onLogout, 
  onOpenAiModal, 
  tripsCount 
}) {
  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '74px',
      background: 'rgba(11, 15, 25, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      padding: '0 24px'
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
        
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveScreen('dashboard')} 
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Globe size={24} color="#ffffff" />
          </div>
          <div>
            <span style={{ 
              fontFamily: 'var(--font-heading)', 
              fontWeight: 800, 
              fontSize: '1.4rem', 
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              GlobeTrotter
            </span>
            <span className="badge badge-pixel" style={{ marginLeft: '8px' }}>v2.0</span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button 
            className={`btn btn-sm ${activeScreen === 'dashboard' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveScreen('dashboard')}
          >
            <Compass size={16} /> Hub
          </button>
          
          <button 
            className={`btn btn-sm ${activeScreen === 'mytrips' || activeScreen === 'itinerary' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveScreen('mytrips')}
          >
            <Briefcase size={16} /> My Trips
            {tripsCount > 0 && (
              <span style={{ 
                background: 'rgba(255,255,255,0.2)', 
                padding: '1px 6px', 
                borderRadius: '10px', 
                fontSize: '0.75rem' 
              }}>
                {tripsCount}
              </span>
            )}
          </button>

          <button 
            className={`btn btn-sm ${activeScreen === 'nearby' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveScreen('nearby')}
          >
            <MapPin size={16} /> Nearby & Recs
          </button>

          <button 
            className={`btn btn-sm ${activeScreen === 'search' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveScreen('search')}
          >
            <Search size={16} /> Activities
          </button>

          <button 
            className={`btn btn-sm ${activeScreen === 'community' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveScreen('community')}
          >
            <Users size={16} /> Community
          </button>

          <button 
            className={`btn btn-sm ${activeScreen === 'passport' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setActiveScreen('passport')}
            style={{ position: 'relative' }}
          >
            <Camera size={16} color="#ec4899" /> Pixel Passport
            <span style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ec4899',
              boxShadow: '0 0 8px #ec4899'
            }} />
          </button>
        </nav>

        {/* Action Buttons & Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* ✨ Floating AI Guide Trigger */}
          <button 
            className="btn btn-ai btn-sm"
            onClick={onOpenAiModal}
            title="Open ✨ AI Travel Guide Assistant"
          >
            <Sparkles size={16} /> AI Guide
          </button>

          {/* Create Trip Quick Action */}
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setActiveScreen('createtrip')}
          >
            <PlusCircle size={16} /> Plan Trip
          </button>

          {/* User Profile Pill */}
          <div 
            onClick={() => setActiveScreen('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '4px 10px 4px 4px',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid var(--border-color)',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
          >
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"} 
              alt="Avatar"
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user?.name?.split(' ')[0]}</span>
          </div>

          <button 
            onClick={onLogout}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px'
            }}
            title="Log Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
