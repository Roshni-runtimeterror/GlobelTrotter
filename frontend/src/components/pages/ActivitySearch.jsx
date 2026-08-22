import React, { useState } from 'react';
import { Search, Filter, Star, Plus, Check, MapPin, DollarSign, Clock } from 'lucide-react';
import { ACTIVITIES_CATALOG } from '../data/mockData';

export default function ActivitySearch({ activeTrip, onAddActivityToTrip }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [maxPrice, setMaxPrice] = useState(25000);
  const [addedItems, setAddedItems] = useState({});

  const filteredActivities = ACTIVITIES_CATALOG.filter(act => {
    const matchesSearch = act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          act.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || act.category.includes(categoryFilter);
    const matchesPrice = act.price <= maxPrice;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const handleAdd = (act) => {
    if (!activeTrip) {
      alert("Please select or create an active trip first from 'My Trips' to add this activity!");
      return;
    }
    const catKey = act.category.includes('Meals') ? 'meals' :
                   act.category.includes('Transport') ? 'transport' :
                   act.category.includes('Stay') ? 'stay' : 'activities';
                   
    onAddActivityToTrip(activeTrip.id, {
      title: act.title,
      category: catKey,
      cost: act.price,
      time: "10:00",
      location: act.location
    });

    setAddedItems(prev => ({ ...prev, [act.id]: true }));
  };

  return (
    <div className="container page-wrapper">
      
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Activity & Tour Search 🔍</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Search activities, transport tickets, meals, & tours to insert directly into your active trip's itinerary.
        </p>
      </div>

      {/* Filter Control Bar */}
      <div className="glass-card" style={{ padding: '24px', marginBottom: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr', gap: '20px', alignItems: 'center' }}>
          
          {/* Search Box */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Search Keyword / Location</label>
            <div style={{ position: 'relative' }}>
              <Search size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="text"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="e.g. Shibuya, Paragliding, Boat, Train..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Category</label>
            <select 
              className="form-select"
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Activities">🎟️ Activities</option>
              <option value="Meals">🍽️ Meals</option>
              <option value="Transport">🚗 Transport</option>
            </select>
          </div>

          {/* Price Range Slider */}
          <div className="form-group" style={{ margin: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <label className="form-label">Max Price Limit</label>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#34d399' }}>₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input 
              type="range"
              min="0"
              max="30000"
              step="500"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#6366f1', cursor: 'pointer' }}
            />
          </div>

        </div>
      </div>

      {/* Results Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '24px'
      }}>
        {filteredActivities.map(act => {
          const isAdded = addedItems[act.id];
          return (
            <div key={act.id} className="glass-card glass-card-interactive" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              
              <div style={{ position: 'relative', height: '180px' }}>
                <img src={act.image} alt={act.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                  <span className="badge badge-indigo">{act.category}</span>
                </div>
              </div>

              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '1.15rem' }}>{act.title}</h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#fbbf24', fontSize: '0.85rem' }}>
                      <Star size={14} fill="#fbbf24" /> {act.rating}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '12px', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
                    <span>📍 {act.location}</span>
                    <span>🕒 {act.duration}</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  pt: '14px',
                  borderTop: '1px solid var(--border-color)'
                }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#34d399' }}>
                    ₹{act.price?.toLocaleString('en-IN')}
                  </div>

                  <button 
                    className={`btn btn-sm ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => handleAdd(act)}
                    disabled={isAdded}
                  >
                    {isAdded ? <Check size={16} color="#34d399" /> : <Plus size={16} />}
                    {isAdded ? 'Added' : 'Add to Trip'}
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
