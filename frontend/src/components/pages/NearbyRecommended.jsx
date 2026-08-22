import React, { useState } from 'react';
import { Sparkles, MapPin, Star, Plus, Check, Compass, Filter } from 'lucide-react';
import { NEARBY_RECOMMENDED_DATA } from '../data/mockData';

const CATEGORIES = [
  { label: "All Categories", key: "all", icon: "🌐" },
  { label: "📍 Nearby places", key: "nearby", icon: "📍" },
  { label: "🏖️ Beaches", key: "beaches", icon: "🏖️" },
  { label: "🥾 Hiking", key: "hiking", icon: "🥾" },
  { label: "🍜 Food", key: "food", icon: "🍜" },
  { label: "🌿 Nature", key: "nature", icon: "🌿" },
  { label: "🏛️ Historical places", key: "historical", icon: "🏛️" },
  { label: "📸 Photography", key: "photography", icon: "photography" }
];

export default function NearbyRecommended({ activeTrip, onAddActivityToTrip }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [aiGuideEnabled, setAiGuideEnabled] = useState(true);
  const [addedItems, setAddedItems] = useState({});

  const filteredItems = NEARBY_RECOMMENDED_DATA.filter(item => {
    if (selectedCategory === "all" || selectedCategory === "nearby") return true;
    return item.categoryKey === selectedCategory;
  });

  const handleAdd = (item) => {
    if (!activeTrip) {
      alert("Please select or create an active trip first from 'My Trips' to add this recommendation!");
      return;
    }
    const formattedItem = {
      title: item.name,
      category: item.categoryKey === "food" ? "meals" : "activities",
      cost: item.costEstimate,
      time: "11:00",
      location: item.location
    };
    onAddActivityToTrip(activeTrip.id, formattedItem);
    setAddedItems(prev => ({ ...prev, [item.id]: true }));
  };

  return (
    <div className="container page-wrapper">
      
      {/* Header & AI Toggle Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px',
        marginBottom: '28px'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Nearby & Recommended 📍</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Discover top spots, hidden gems, and AI-curated travel experiences.
          </p>
        </div>

        {/* ✨ AI Travel Guide Toggle Box */}
        <div className="glass-card" style={{
          padding: '12px 20px',
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          background: aiGuideEnabled 
            ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.25) 0%, rgba(236, 72, 153, 0.2) 100%)' 
            : 'rgba(255, 255, 255, 0.04)',
          borderColor: aiGuideEnabled ? '#8b5cf6' : 'var(--border-color)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color={aiGuideEnabled ? '#ec4899' : 'var(--text-dim)'} />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', color: aiGuideEnabled ? '#a78bfa' : 'var(--text-main)' }}>
                ✨ AI Travel Guide
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {aiGuideEnabled ? 'Surfacing personalized insider tips & match scores' : 'Standard location listing mode'}
              </div>
            </div>
          </div>

          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <input 
              type="checkbox"
              checked={aiGuideEnabled}
              onChange={e => setAiGuideEnabled(e.target.checked)}
              style={{ display: 'none' }}
            />
            <div style={{
              width: '46px',
              height: '26px',
              borderRadius: '13px',
              background: aiGuideEnabled ? 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)' : 'rgba(255,255,255,0.2)',
              position: 'relative',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '20px',
                height: '20px',
                borderRadius: '50%',
                background: '#fff',
                position: 'absolute',
                top: '3px',
                left: aiGuideEnabled ? '23px' : '3px',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }} />
            </div>
          </label>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        overflowX: 'auto',
        paddingBottom: '12px',
        marginBottom: '28px'
      }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            className={`btn btn-sm ${selectedCategory === cat.key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setSelectedCategory(cat.key)}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Recommendations Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '24px'
      }}>
        {filteredItems.map(item => {
          const isAdded = addedItems[item.id];
          return (
            <div key={item.id} className="glass-card glass-card-interactive" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              {/* Image & Badges */}
              <div style={{ position: 'relative', height: '200px' }}>
                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                
                <div style={{
                  position: 'absolute',
                  top: '12px',
                  left: '12px',
                  display: 'flex',
                  gap: '6px',
                  flexWrap: 'wrap'
                }}>
                  <span className="badge badge-indigo">{item.category}</span>
                  <span className="badge badge-emerald">📍 {item.distance}</span>
                </div>

                {/* AI Match Score Badge (When AI Guide ON) */}
                {aiGuideEnabled && item.aiMatch && (
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    background: 'rgba(139, 92, 246, 0.9)',
                    backdropFilter: 'blur(8px)',
                    color: '#fff',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(139, 92, 246, 0.4)'
                  }}>
                    ✨ {item.aiMatch}% AI Match
                  </div>
                )}
              </div>

              {/* Content Body */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.25rem' }}>{item.name}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.9rem', fontWeight: 600 }}>
                      <Star size={16} fill="#fbbf24" /> {item.rating}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                    {item.description}
                  </p>

                  {/* AI Insider Tip (surfaced when AI Guide ON) */}
                  {aiGuideEnabled && item.aiInsiderTip && (
                    <div style={{
                      background: 'rgba(139, 92, 246, 0.12)',
                      border: '1px solid rgba(139, 92, 246, 0.3)',
                      borderRadius: '10px',
                      padding: '12px 14px',
                      fontSize: '0.82rem',
                      color: '#d8b4fe',
                      marginBottom: '16px'
                    }}>
                      {item.aiInsiderTip}
                    </div>
                  )}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pt: '16px',
                  borderTop: '1px solid var(--border-color)',
                  marginTop: '12px'
                }}>
                  <div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>Estimated Cost</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399' }}>
                      {item.costEstimate === 0 ? 'Free' : `₹${item.costEstimate.toLocaleString('en-IN')}`}
                    </div>
                  </div>

                  <button 
                    className={`btn btn-sm ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => handleAdd(item)}
                    disabled={isAdded}
                  >
                    {isAdded ? <Check size={16} color="#34d399" /> : <Plus size={16} />}
                    {isAdded ? 'Added to Trip' : 'Add to Itinerary'}
                  </button>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
