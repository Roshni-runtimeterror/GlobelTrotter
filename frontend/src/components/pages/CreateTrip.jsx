import React, { useState } from 'react';
import { Plane, Calendar, DollarSign, Image, MapPin, ArrowRight, Check } from 'lucide-react';

const COVER_PRESETS = [
  "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80",
  "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1000&q=80"
];

export default function CreateTrip({ onCreateTripSuccess }) {
  const [title, setTitle] = useState('');
  const [destinationsInput, setDestinationsInput] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(COVER_PRESETS[0]);
  const [customPhotoUrl, setCustomPhotoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [targetBudget, setTargetBudget] = useState('250000');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !startDate || !endDate) return;

    const destinationsArray = destinationsInput
      ? destinationsInput.split(',').map(s => s.trim())
      : ["Destinations Explorer"];

    const finalCover = customPhotoUrl.trim() ? customPhotoUrl.trim() : coverPhoto;

    const newTrip = {
      id: `trip-${Date.now()}`,
      title,
      destinations: destinationsArray,
      startDate,
      endDate,
      coverPhoto: finalCover,
      description: description || "Custom travel journey created with GlobeTrotter.",
      status: "upcoming",
      targetBudget: parseFloat(targetBudget) || 2500,
      categoriesBudget: {
        transport: Math.round((parseFloat(targetBudget) || 2500) * 0.3),
        stay: Math.round((parseFloat(targetBudget) || 2500) * 0.4),
        activities: Math.round((parseFloat(targetBudget) || 2500) * 0.15),
        meals: Math.round((parseFloat(targetBudget) || 2500) * 0.15)
      },
      itinerary: [
        {
          day: 1,
          title: "Day 1 Arrival & First Impressions",
          items: [
            { id: `item-${Date.now()}-1`, title: "Hotel / Lodging Check-in", category: "stay", cost: Math.round((parseFloat(targetBudget) || 2500) * 0.1), time: "15:00" },
            { id: `item-${Date.now()}-2`, title: "Welcome Dinner at Local Bistro", category: "meals", cost: 45, time: "19:00" }
          ]
        },
        {
          day: 2,
          title: "Day 2 Main Landmarks & Highlights",
          items: [
            { id: `item-${Date.now()}-3`, title: "Morning Guided City Tour", category: "activities", cost: 35, time: "09:30" }
          ]
        }
      ]
    };

    onCreateTripSuccess(newTrip);
  };

  return (
    <div className="container page-wrapper" style={{ maxWidth: '800px' }}>
      
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Create a New Trip ✈️</h1>
        <p style={{ color: 'var(--text-muted)' }}>
          Specify your travel details to generate an interactive day-by-day itinerary & live cost breakdown.
        </p>
      </div>

      <div className="glass-card" style={{ padding: '36px' }}>
        <form onSubmit={handleSubmit}>
          
          {/* Trip Name & Destinations */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Trip Title *</label>
              <div style={{ position: 'relative' }}>
                <Plane size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                  placeholder="e.g. Summer in Santorini & Athens"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Destination(s) (Comma separated)</label>
              <div style={{ position: 'relative' }}>
                <MapPin size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                <input 
                  type="text"
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                  placeholder="Santorini, Athens, Mykonos"
                  value={destinationsInput}
                  onChange={e => setDestinationsInput(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Dates & Target Budget */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input 
                type="date"
                className="form-input"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">End Date *</label>
              <input 
                type="date"
                className="form-input"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Target Budget (₹ INR)</label>
              <div style={{ position: 'relative' }}>
                <DollarSign size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
                <input 
                  type="number"
                  className="form-input"
                  style={{ paddingLeft: '42px' }}
                  placeholder="250000"
                  value={targetBudget}
                  onChange={e => setTargetBudget(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Short Description */}
          <div className="form-group">
            <label className="form-label">Short Description / Travel Notes</label>
            <textarea 
              className="form-textarea"
              rows={3}
              placeholder="What are your goals for this trip? (e.g. relaxation, food tour, hiking peaks, photography spots...)"
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Cover Photo Presets & Custom URL */}
          <div className="form-group">
            <label className="form-label">Choose Cover Photo</label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(6, 1fr)',
              gap: '12px',
              marginBottom: '12px'
            }}>
              {COVER_PRESETS.map((preset, idx) => (
                <div 
                  key={idx}
                  onClick={() => { setCoverPhoto(preset); setCustomPhotoUrl(''); }}
                  style={{
                    height: '70px',
                    borderRadius: 'var(--radius-sm)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    position: 'relative',
                    border: coverPhoto === preset && !customPhotoUrl ? '3px solid #6366f1' : '1px solid transparent'
                  }}
                >
                  <img src={preset} alt="preset" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {coverPhoto === preset && !customPhotoUrl && (
                    <div style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(99, 102, 241, 0.4)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <Check size={20} color="#fff" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div style={{ position: 'relative' }}>
              <Image size={18} style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted)' }} />
              <input 
                type="url"
                className="form-input"
                style={{ paddingLeft: '42px' }}
                placeholder="Or paste custom image URL (https://...)"
                value={customPhotoUrl}
                onChange={e => setCustomPhotoUrl(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '28px' }}>
            <button type="submit" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem' }}>
              Save & Open Itinerary + Budget <ArrowRight size={18} />
            </button>
          </div>

        </form>
      </div>

    </div>
  );
}
