import React, { useState } from 'react';
import { Users, Copy, Heart, Calendar, DollarSign, Check, MapPin, Eye } from 'lucide-react';
import { COMMUNITY_TRIPS } from '../data/mockData';

export default function Community({ onCopyTripSuccess }) {
  const [copiedTrips, setCopiedTrips] = useState({});
  const [likedTrips, setLikedTrips] = useState({});
  const [previewTrip, setPreviewTrip] = useState(null);

  const handleCopy = (commTrip) => {
    onCopyTripSuccess(commTrip);
    setCopiedTrips(prev => ({ ...prev, [commTrip.id]: true }));
  };

  const handleLike = (id) => {
    setLikedTrips(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="container page-wrapper">
      
      {/* Header Banner */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Community Travel Hub 🌍</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Discover verified itineraries published by fellow globetrotters and clone them into your own trip planner with 1-click **⚡ Copy Trip**.
        </p>
      </div>

      {/* Community Trips Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
        gap: '28px'
      }}>
        {COMMUNITY_TRIPS.map(commTrip => {
          const isCopied = copiedTrips[commTrip.id];
          const isLiked = likedTrips[commTrip.id];
          const currentLikes = commTrip.likes + (isLiked ? 1 : 0);

          return (
            <div key={commTrip.id} className="glass-card glass-card-interactive" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* Cover & Author Banner */}
              <div style={{ position: 'relative', height: '210px' }}>
                <img src={commTrip.coverPhoto} alt={commTrip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(19, 27, 46, 0.9) 0%, transparent 60%)'
                }} />

                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}>
                  <img 
                    src={commTrip.authorAvatar} 
                    alt={commTrip.author}
                    style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #fff', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#fff' }}>{commTrip.author}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Verified GlobeTrotter Explorer</div>
                  </div>
                </div>

                <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={() => handleLike(commTrip.id)}
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      backdropFilter: 'blur(4px)',
                      border: 'none',
                      color: isLiked ? '#ec4899' : '#fff',
                      borderRadius: 'var(--radius-full)',
                      padding: '6px 12px',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart size={14} fill={isLiked ? '#ec4899' : 'none'} /> {currentLikes}
                  </button>
                </div>
              </div>

              {/* Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                    {commTrip.tags?.map((t, i) => (
                      <span key={i} className="badge badge-indigo">#{t}</span>
                    ))}
                  </div>

                  <h3 style={{ fontSize: '1.25rem', marginBottom: '10px' }}>{commTrip.title}</h3>

                  <div style={{ display: 'flex', gap: '16px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    <span>📍 {commTrip.destinations?.join(', ')}</span>
                    <span>🗓️ {commTrip.days} Days</span>
                    <span>💵 ~₹{commTrip.estCost?.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', pt: '16px', borderTop: '1px solid var(--border-color)' }}>
                  <button 
                    className="btn btn-secondary btn-sm"
                    style={{ flex: 1 }}
                    onClick={() => setPreviewTrip(commTrip)}
                  >
                    <Eye size={14} /> Preview
                  </button>

                  <button 
                    className={`btn btn-sm ${isCopied ? 'btn-secondary' : 'btn-accent'}`}
                    style={{ flex: 1.3 }}
                    onClick={() => handleCopy(commTrip)}
                    disabled={isCopied}
                  >
                    {isCopied ? <Check size={16} color="#34d399" /> : <Copy size={16} />}
                    {isCopied ? 'Trip Copied!' : '⚡ Copy Trip'}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

      {/* Itinerary Preview Modal */}
      {previewTrip && (
        <div className="modal-overlay" onClick={() => setPreviewTrip(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '1.4rem' }}>{previewTrip.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>By {previewTrip.author} • {previewTrip.days} Days Itinerary</p>
              </div>
              <button 
                className="btn btn-accent btn-sm"
                onClick={() => { handleCopy(previewTrip); setPreviewTrip(null); }}
              >
                <Copy size={14} /> ⚡ Copy Trip Now
              </button>
            </div>

            <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {previewTrip.itinerary?.map(day => (
                <div key={day.day} style={{ background: 'rgba(15,23,42,0.6)', padding: '14px', borderRadius: '10px' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#818cf8', marginBottom: '8px' }}>
                    Day {day.day}: {day.title}
                  </div>
                  {day.items?.map((item, idx) => (
                    <div key={idx} style={{ fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <span>🕒 {item.time} — {item.title}</span>
                      <span style={{ color: '#34d399' }}>₹{item.cost?.toLocaleString('en-IN')}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
