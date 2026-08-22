import React, { useState } from 'react';
import { Camera, Award, Globe, Plus, Sparkles, Image, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PIXEL_PASSPORT_STAMPS, PIXEL_GALLERY_MEMORIES } from '../data/mockData';

export default function PixelPassport({ userTrips }) {
  const [activeTab, setActiveTab] = useState('stamps');
  const [stamps, setStamps] = useState(PIXEL_PASSPORT_STAMPS);
  const [memories, setMemories] = useState(PIXEL_GALLERY_MEMORIES);
  const [showAddMemoryModal, setShowAddMemoryModal] = useState(false);

  const [memoryTitle, setMemoryTitle] = useState('');
  const [memoryLocation, setMemoryLocation] = useState('');
  const [memoryImageUrl, setMemoryImageUrl] = useState('');
  const [memoryTagsInput, setMemoryTagsInput] = useState('');

  const handleUnlockStamp = (stampId) => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    setStamps(prev => prev.map(s => {
      if (s.id === stampId) {
        return {
          ...s,
          status: 'unlocked',
          code: `${s.country.substring(0,3).toUpperCase()}-2026`,
          date: 'Just Unlocked!'
        };
      }
      return s;
    }));
  };

  const handleAddMemory = (e) => {
    e.preventDefault();
    if (!memoryTitle || !memoryImageUrl) return;

    const newMem = {
      id: `mem-${Date.now()}`,
      title: memoryTitle,
      location: memoryLocation || "Global Destination",
      date: "Just now",
      image: memoryImageUrl,
      tags: memoryTagsInput ? memoryTagsInput.split(',').map(t => t.trim()) : ["TravelMemories"],
      tripId: "custom"
    };

    setMemories(prev => [newMem, ...prev]);
    setMemoryTitle('');
    setMemoryLocation('');
    setMemoryImageUrl('');
    setMemoryTagsInput('');
    setShowAddMemoryModal(false);
  };

  return (
    <div className="container page-wrapper">
      
      {/* Header Banner */}
      <div className="glass-card" style={{
        padding: '32px 36px',
        marginBottom: '28px',
        background: 'linear-gradient(135deg, rgba(30, 27, 75, 0.9) 0%, rgba(139, 92, 246, 0.2) 100%)',
        border: '1px solid rgba(167, 139, 250, 0.3)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div className="badge badge-pixel" style={{ marginBottom: '10px' }}>
              👾 SCREEN 11 • PIXEL PASSPORT & MEMORY MAP
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>Pixel Passport & Memory Wall 🛂</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '4px' }}>
              Your digital souvenir scrapbook: collect retro passport stamps & showcase high-res travel photos.
            </p>
          </div>

          <button className="btn btn-accent" onClick={() => setShowAddMemoryModal(true)}>
            <Plus size={16} /> Add Photo Memory
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        <button 
          className={`btn btn-sm ${activeTab === 'stamps' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('stamps')}
        >
          🛂 Digital Passport Stamps ({stamps.filter(s => s.status === 'unlocked').length} Unlocked)
        </button>
        <button 
          className={`btn btn-sm ${activeTab === 'gallery' ? 'btn-primary' : 'btn-secondary'}`}
          onClick={() => setActiveTab('gallery')}
        >
          🖼️ Pixel Gallery Grid ({memories.length} Photos)
        </button>
      </div>

      {/* TAB 1: RETRO PIXEL PASSPORT STAMPS */}
      {activeTab === 'stamps' && (
        <div>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '16px' }}>Collectable Passport Stamps</h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {stamps.map(stamp => (
              <div key={stamp.id} className="pixel-art-stamp" style={{
                padding: '24px',
                borderRadius: '16px',
                position: 'relative',
                overflow: 'hidden',
                opacity: stamp.status === 'unlocked' ? 1 : 0.65
              }}>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                  <span style={{ fontSize: '2.2rem' }}>{stamp.flag}</span>
                  <span className="badge badge-pixel">{stamp.code}</span>
                </div>

                <div style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.9rem', color: '#fff', marginBottom: '4px' }}>
                  {stamp.country}
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                  📍 {stamp.city} • {stamp.date}
                </div>

                {stamp.status === 'unlocked' ? (
                  <div className="badge badge-emerald" style={{ width: '100%', justifyContent: 'center' }}>
                    <Check size={14} /> Stamp Unlocked & Verified
                  </div>
                ) : (
                  <button 
                    className="btn btn-ai btn-sm" 
                    style={{ width: '100%' }}
                    onClick={() => handleUnlockStamp(stamp.id)}
                  >
                    <Sparkles size={14} /> Simulate Trip Stamp Unlock
                  </button>
                )}

              </div>
            ))}
          </div>

          {/* Gamified Scratch Map Tracker */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>📊 Gamified World Exploration Progress</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
              You have explored 6.8% of global countries. Complete more trips to unlock country trophies!
            </p>
            <div style={{ width: '100%', height: '14px', background: 'rgba(255,255,255,0.08)', borderRadius: '7px', overflow: 'hidden' }}>
              <div style={{ width: '18%', height: '100%', background: 'linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)' }} />
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PIXEL GALLERY MEMORIES */}
      {activeTab === 'gallery' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {memories.map(mem => (
            <div key={mem.id} className="glass-card glass-card-interactive" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{ position: 'relative', height: '220px' }}>
                <img src={mem.image} alt={mem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                  <span className="badge badge-indigo">📍 {mem.location}</span>
                </div>
              </div>

              <div style={{ padding: '18px' }}>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '6px' }}>{mem.title}</h4>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '10px' }}>
                  {mem.date}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {mem.tags?.map((t, idx) => (
                    <span key={idx} style={{ fontSize: '0.72rem', color: '#a78bfa' }}>#{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddMemoryModal && (
        <div className="modal-overlay" onClick={() => setShowAddMemoryModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <h3 style={{ marginBottom: '16px' }}>Add Memory Photo to Pixel Wall</h3>
            <form onSubmit={handleAddMemory}>
              
              <div className="form-group">
                <label className="form-label">Photo Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Sunset Over Mount Fuji" 
                  value={memoryTitle} 
                  onChange={e => setMemoryTitle(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Location</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Hakone, Japan" 
                  value={memoryLocation} 
                  onChange={e => setMemoryLocation(e.target.value)} 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Image URL *</label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="https://images.unsplash.com/..." 
                  value={memoryImageUrl} 
                  onChange={e => setMemoryImageUrl(e.target.value)} 
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Tags (Comma separated)</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Japan, Sunset, MountFuji" 
                  value={memoryTagsInput} 
                  onChange={e => setMemoryTagsInput(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowAddMemoryModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-accent" style={{ flex: 1 }}>
                  Add Photo
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
