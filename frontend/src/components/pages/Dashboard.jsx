import React from 'react';
import { 
  PlusCircle, 
  Briefcase, 
  MapPin, 
  Sparkles, 
  Users, 
  Camera, 
  TrendingUp, 
  Calendar, 
  DollarSign, 
  ChevronRight, 
  Compass,
  Award
} from 'lucide-react';

export default function Dashboard({ 
  user, 
  trips, 
  setActiveScreen, 
  onSelectTrip, 
  onOpenAiModal 
}) {
  const upcomingTrips = trips.filter(t => t.status === 'upcoming');
  const activeOrNextTrip = upcomingTrips[0] || trips[0];

  return (
    <div className="container page-wrapper">
      
      {/* Welcome Hero Banner */}
      <div className="glass-card" style={{
        padding: '36px 40px',
        marginBottom: '32px',
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15) 0%, rgba(236, 72, 153, 0.1) 50%, rgba(19, 27, 46, 0.8) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '720px' }}>
          <div className="badge badge-indigo" style={{ marginBottom: '12px' }}>
            <Sparkles size={14} /> GlobeTrotter Explorer Hub
          </div>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, lineHeight: 1.2 }}>
            Welcome back, {user?.name?.split(' ')[0]}! ✈️
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginTop: '10px', marginBottom: '24px' }}>
            Where will your curiosity lead you today? Plan a new journey, discover AI-curated spots, or explore community itineraries.
          </p>

          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => setActiveScreen('createtrip')}>
              <PlusCircle size={18} /> Create New Trip
            </button>
            <button className="btn btn-ai" onClick={onOpenAiModal}>
              <Sparkles size={18} /> ✨ Ask AI Guide
            </button>
            <button className="btn btn-secondary" onClick={() => setActiveScreen('mytrips')}>
              <Briefcase size={18} /> View My Trips ({trips.length})
            </button>
          </div>
        </div>

        {/* Floating Decorative Globe Badge */}
        <div style={{
          position: 'absolute',
          right: '-20px',
          top: '-20px',
          fontSize: '14rem',
          opacity: 0.08,
          pointerEvents: 'none',
          userSelect: 'none'
        }}>
          🌍
        </div>
      </div>

      {/* Quick Action Tiles */}
      <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Quick Actions & Hub Navigation</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        
        <div 
          className="glass-card glass-card-interactive" 
          style={{ padding: '24px', cursor: 'pointer' }}
          onClick={() => setActiveScreen('createtrip')}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#818cf8'
          }}>
            <PlusCircle size={26} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Create Trip</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Build a custom itinerary & set up daily transport, stay, activities & meals.
          </p>
        </div>

        <div 
          className="glass-card glass-card-interactive" 
          style={{ padding: '24px', cursor: 'pointer' }}
          onClick={() => setActiveScreen('nearby')}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(16, 185, 129, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#34d399'
          }}>
            <MapPin size={26} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Nearby & Recs</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Location-based discovery with **✨ AI Travel Guide** toggle & category filters.
          </p>
        </div>

        <div 
          className="glass-card glass-card-interactive" 
          style={{ padding: '24px', cursor: 'pointer' }}
          onClick={() => setActiveScreen('community')}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(245, 158, 11, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#fbbf24'
          }}>
            <Users size={26} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Community Trips</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Browse public itineraries and use ⚡ **Copy Trip** to clone into your trips.
          </p>
        </div>

        <div 
          className="glass-card glass-card-interactive" 
          style={{ padding: '24px', cursor: 'pointer' }}
          onClick={() => setActiveScreen('passport')}
        >
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '14px',
            background: 'rgba(236, 72, 153, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '16px',
            color: '#f472b6'
          }}>
            <Camera size={26} />
          </div>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '6px' }}>Pixel Passport</h3>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Pixel memory wall, unlocked retro stamps, and gamified achievement map.
          </p>
        </div>

      </div>

      {/* Featured / Active Trip Focus */}
      {activeOrNextTrip && (
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.4rem' }}>Upcoming Journey Highlight</h2>
            <button 
              className="btn btn-secondary btn-sm"
              onClick={() => setActiveScreen('mytrips')}
            >
              All Trips <ChevronRight size={16} />
            </button>
          </div>

          <div className="glass-card" style={{ padding: '0', overflow: 'hidden', display: 'grid', gridTemplateColumns: '1fr 1.2fr' }}>
            <div style={{ position: 'relative', minHeight: '260px' }}>
              <img 
                src={activeOrNextTrip.coverPhoto} 
                alt={activeOrNextTrip.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                top: '16px',
                left: '16px'
              }}>
                <span className="badge badge-emerald">
                  <Calendar size={12} /> {activeOrNextTrip.startDate} – {activeOrNextTrip.endDate}
                </span>
              </div>
            </div>

            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                  {activeOrNextTrip.destinations.map((d, i) => (
                    <span key={i} className="badge badge-indigo">📍 {d}</span>
                  ))}
                </div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '10px' }}>{activeOrNextTrip.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                  {activeOrNextTrip.description}
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: '16px', borderTop: '1px solid var(--border-color)' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Target Budget</span>
                  <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#34d399' }}>
                    ₹{activeOrNextTrip.targetBudget?.toLocaleString('en-IN')}
                  </div>
                </div>
                <button 
                  className="btn btn-primary"
                  onClick={() => onSelectTrip(activeOrNextTrip)}
                >
                  Open Itinerary + Budget <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Highlights / Travel Inspiration Grid */}
      <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Curated Travel Inspiration</h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
      }}>
        
        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <img 
            src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" 
            alt="Japan"
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px' }}>
            <span className="badge badge-pink" style={{ marginBottom: '8px' }}>✨ Season Pick</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Sakura Blossoms in Kyoto</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Spring cherry blossom festival peak dates & ancient temple walks.
            </p>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveScreen('nearby')}>
              Explore Spots
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <img 
            src="https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80" 
            alt="Amalfi"
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px' }}>
            <span className="badge badge-amber" style={{ marginBottom: '8px' }}>🏖️ Coastal Escapes</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Positano Cliffside Living</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Limoncello tasting, yacht day trips, and Mediterranean sunset dining.
            </p>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveScreen('community')}>
              View Community Trips
            </button>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
          <img 
            src="https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80" 
            alt="Alps"
            style={{ width: '100%', height: '180px', objectFit: 'cover' }}
          />
          <div style={{ padding: '20px' }}>
            <span className="badge badge-emerald" style={{ marginBottom: '8px' }}>🥾 Alpine Trails</span>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '6px' }}>Swiss Interlaken Glaciers</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
              Paragliding over alpine lakes and panoramic mountain trains.
            </p>
            <button className="btn btn-secondary btn-sm" onClick={() => setActiveScreen('search')}>
              Find Activities
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
