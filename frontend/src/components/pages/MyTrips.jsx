import React, { useState } from 'react';
import { 
  PlusCircle, 
  Calendar, 
  DollarSign, 
  Trash2, 
  Edit3, 
  ChevronRight, 
  MapPin, 
  Check, 
  Briefcase 
} from 'lucide-react';

export default function MyTrips({ 
  trips, 
  setActiveScreen, 
  onSelectTrip, 
  onDeleteTrip, 
  onUpdateTrip 
}) {
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingTrip, setEditingTrip] = useState(null);

  const filteredTrips = trips.filter(t => {
    if (filterStatus === 'all') return true;
    return t.status === filterStatus;
  });

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingTrip) return;
    onUpdateTrip(editingTrip);
    setEditingTrip(null);
  };

  return (
    <div className="container page-wrapper">
      
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '28px'
      }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>My Trips 🧳</h1>
          <p style={{ color: 'var(--text-muted)' }}>
            Manage your past, current, and upcoming planned travel adventures.
          </p>
        </div>

        <button className="btn btn-primary" onClick={() => setActiveScreen('createtrip')}>
          <PlusCircle size={18} /> Plan New Trip
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '28px' }}>
        {[
          { label: `All Trips (${trips.length})`, status: 'all' },
          { label: `Upcoming (${trips.filter(t => t.status === 'upcoming').length})`, status: 'upcoming' },
          { label: `Past (${trips.filter(t => t.status === 'past').length})`, status: 'past' }
        ].map(tab => (
          <button
            key={tab.status}
            className={`btn btn-sm ${filterStatus === tab.status ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilterStatus(tab.status)}
            style={{ borderRadius: 'var(--radius-full)' }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Trip Cards Grid */}
      {filteredTrips.length === 0 ? (
        <div className="glass-card" style={{ padding: '48px', textAlign: 'center' }}>
          <Briefcase size={48} color="var(--text-dim)" style={{ marginBottom: '16px' }} />
          <h3>No trips found under this status</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Start planning a new journey now!</p>
          <button className="btn btn-primary" onClick={() => setActiveScreen('createtrip')}>
            <PlusCircle size={18} /> Create Your First Trip
          </button>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))',
          gap: '24px'
        }}>
          {filteredTrips.map(trip => {
            const totalEstSpent = trip.itinerary?.reduce((acc, day) => {
              return acc + (day.items?.reduce((dAcc, item) => dAcc + (item.cost || 0), 0) || 0);
            }, 0) || 0;

            const budgetPercent = Math.min(Math.round((totalEstSpent / (trip.targetBudget || 1)) * 100), 100);

            return (
              <div key={trip.id} className="glass-card glass-card-interactive" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                
                {/* Cover Photo */}
                <div style={{ position: 'relative', height: '210px' }}>
                  <img src={trip.coverPhoto} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  
                  <div style={{ position: 'absolute', top: '12px', left: '12px' }}>
                    <span className={`badge ${trip.status === 'upcoming' ? 'badge-emerald' : 'badge-amber'}`}>
                      {trip.status === 'upcoming' ? '🗓️ Upcoming' : '📜 Past Journey'}
                    </span>
                  </div>

                  <div style={{ position: 'absolute', top: '12px', right: '12px', display: 'flex', gap: '6px' }}>
                    <button 
                      onClick={(e) => { e.stopPropagation(); setEditingTrip({ ...trip }); }}
                      style={{
                        background: 'rgba(0,0,0,0.6)',
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Edit Trip Details"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Are you sure you want to delete "${trip.title}"?`)) {
                          onDeleteTrip(trip.id);
                        }
                      }}
                      style={{
                        background: 'rgba(244, 63, 94, 0.7)',
                        border: 'none',
                        color: '#fff',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                      title="Delete Trip"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                      {trip.destinations?.map((d, i) => (
                        <span key={i} className="badge badge-indigo">📍 {d}</span>
                      ))}
                    </div>

                    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{trip.title}</h3>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '14px' }}>
                      <Calendar size={14} /> {trip.startDate} to {trip.endDate}
                    </div>

                    {/* Live Budget Meter */}
                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)' }}>Estimated Spend</span>
                        <span style={{ fontWeight: 600, color: totalEstSpent > trip.targetBudget ? '#fb7185' : '#34d399' }}>
                          ₹{totalEstSpent.toLocaleString('en-IN')} / ₹{trip.targetBudget?.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${budgetPercent}%`,
                          height: '100%',
                          background: totalEstSpent > trip.targetBudget 
                            ? 'linear-gradient(90deg, #f43f5e 0%, #e11d48 100%)' 
                            : 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)',
                          borderRadius: '3px'
                        }} />
                      </div>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => onSelectTrip(trip)}
                  >
                    Open Itinerary + Budget <ChevronRight size={18} />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Quick Edit Modal */}
      {editingTrip && (
        <div className="modal-overlay" onClick={() => setEditingTrip(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <h3 style={{ marginBottom: '16px' }}>Edit Trip Details</h3>
            <form onSubmit={handleSaveEdit}>
              <div className="form-group">
                <label className="form-label">Trip Title</label>
                <input 
                  type="text" 
                  className="form-input" 
                  value={editingTrip.title} 
                  onChange={e => setEditingTrip({ ...editingTrip, title: e.target.value })}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Target Budget (₹)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  value={editingTrip.targetBudget} 
                  onChange={e => setEditingTrip({ ...editingTrip, targetBudget: parseFloat(e.target.value) || 0 })}
                  required 
                />
              </div>

              <div className="form-group">
                <label className="form-label">Cover Photo URL</label>
                <input 
                  type="url" 
                  className="form-input" 
                  value={editingTrip.coverPhoto} 
                  onChange={e => setEditingTrip({ ...editingTrip, coverPhoto: e.target.value })}
                  required 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setEditingTrip(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
