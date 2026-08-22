import React, { useState } from 'react';
import { 
  Calendar, 
  DollarSign, 
  Plus, 
  Trash2, 
  Clock, 
  MapPin, 
  Car, 
  Hotel, 
  Ticket, 
  Utensils, 
  AlertTriangle, 
  CheckCircle2,
  ChevronRight,
  PieChart
} from 'lucide-react';

export default function ItineraryBudget({ trip, onUpdateTrip, setActiveScreen }) {
  if (!trip) {
    return (
      <div className="container page-wrapper" style={{ textAlign: 'center', paddingTop: '100px' }}>
        <h2>No active trip selected</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Please select a trip from My Trips to view its itinerary and budget.</p>
        <button className="btn btn-primary" onClick={() => setActiveScreen('mytrips')}>Go to My Trips</button>
      </div>
    );
  }

  const [activeDay, setActiveDay] = useState(1);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [itemTitle, setItemTitle] = useState('');
  const [itemCategory, setItemCategory] = useState('activities');
  const [itemCost, setItemCost] = useState('');
  const [itemTime, setItemTime] = useState('10:00');

  // Compute live breakdown by category
  let totalTransport = 0;
  let totalStay = 0;
  let totalActivities = 0;
  let totalMeals = 0;

  trip.itinerary?.forEach(day => {
    day.items?.forEach(item => {
      const c = parseFloat(item.cost) || 0;
      if (item.category === 'transport') totalTransport += c;
      else if (item.category === 'stay') totalStay += c;
      else if (item.category === 'activities') totalActivities += c;
      else if (item.category === 'meals') totalMeals += c;
    });
  });

  const totalCalculatedCost = totalTransport + totalStay + totalActivities + totalMeals;
  const isOverBudget = totalCalculatedCost > (trip.targetBudget || 0);

  const currentDayData = trip.itinerary?.find(d => d.day === activeDay) || { day: activeDay, title: `Day ${activeDay}`, items: [] };

  const handleAddItem = (e) => {
    e.preventDefault();
    if (!itemTitle) return;

    const newItem = {
      id: `item-${Date.now()}`,
      title: itemTitle,
      category: itemCategory,
      cost: parseFloat(itemCost) || 0,
      time: itemTime
    };

    const updatedItinerary = [...(trip.itinerary || [])];
    let dayIndex = updatedItinerary.findIndex(d => d.day === activeDay);

    if (dayIndex >= 0) {
      updatedItinerary[dayIndex] = {
        ...updatedItinerary[dayIndex],
        items: [...(updatedItinerary[dayIndex].items || []), newItem]
      };
    } else {
      updatedItinerary.push({
        day: activeDay,
        title: `Day ${activeDay} Highlights`,
        items: [newItem]
      });
    }

    onUpdateTrip({
      ...trip,
      itinerary: updatedItinerary
    });

    setItemTitle('');
    setItemCost('');
    setShowAddItemModal(false);
  };

  const handleDeleteItem = (dayNum, itemId) => {
    const updatedItinerary = trip.itinerary.map(d => {
      if (d.day === dayNum) {
        return {
          ...d,
          items: d.items.filter(i => i.id !== itemId)
        };
      }
      return d;
    });

    onUpdateTrip({
      ...trip,
      itinerary: updatedItinerary
    });
  };

  const handleAddDay = () => {
    const nextDayNum = (trip.itinerary?.length || 0) + 1;
    const updatedItinerary = [
      ...(trip.itinerary || []),
      { day: nextDayNum, title: `Day ${nextDayNum} Exploration`, items: [] }
    ];
    onUpdateTrip({ ...trip, itinerary: updatedItinerary });
    setActiveDay(nextDayNum);
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'transport':
        return <span className="badge badge-indigo"><Car size={12} /> 🚗 Transport</span>;
      case 'stay':
        return <span className="badge badge-emerald"><Hotel size={12} /> 🏨 Stay</span>;
      case 'activities':
        return <span className="badge badge-pink"><Ticket size={12} /> 🎟️ Activity</span>;
      case 'meals':
        return <span className="badge badge-amber"><Utensils size={12} /> 🍽️ Meal</span>;
      default:
        return <span className="badge badge-indigo">Expense</span>;
    }
  };

  return (
    <div className="container page-wrapper">
      
      {/* Header Banner */}
      <div className="glass-card" style={{ padding: '28px 36px', marginBottom: '28px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              {trip.destinations?.map((d, i) => (
                <span key={i} className="badge badge-indigo">📍 {d}</span>
              ))}
              <span className="badge badge-emerald"><Calendar size={12} /> {trip.startDate} – {trip.endDate}</span>
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: 800 }}>{trip.title}</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Combined Day-by-Day Itinerary & Live Budget Breakdown
            </p>
          </div>

          <button className="btn btn-secondary btn-sm" onClick={() => setActiveScreen('mytrips')}>
            ← Back to All Trips
          </button>
        </div>
      </div>

      {/* Main Split Grid: Left = Itinerary Timeline | Right = Live Budget Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '28px' }}>
        
        {/* LEFT COLUMN: Day-by-Day Itinerary Timeline */}
        <div>
          
          {/* Day Accordion / Tabs Bar */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            overflowX: 'auto',
            paddingBottom: '12px',
            marginBottom: '20px'
          }}>
            {trip.itinerary?.map(d => (
              <button
                key={d.day}
                className={`btn btn-sm ${activeDay === d.day ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActiveDay(d.day)}
                style={{ borderRadius: 'var(--radius-full)' }}
              >
                Day {d.day}
              </button>
            ))}
            <button className="btn btn-secondary btn-sm" onClick={handleAddDay} style={{ borderRadius: 'var(--radius-full)' }}>
              <Plus size={14} /> Add Day
            </button>
          </div>

          {/* Selected Day Content */}
          <div className="glass-card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.4rem' }}>{currentDayData.title}</h2>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  {currentDayData.items?.length || 0} scheduled items for Day {activeDay}
                </span>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => setShowAddItemModal(true)}>
                <Plus size={16} /> Add Item / Expense
              </button>
            </div>

            {/* Itinerary Items Timeline List */}
            {(!currentDayData.items || currentDayData.items.length === 0) ? (
              <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-muted)' }}>
                <Clock size={36} style={{ marginBottom: '12px', opacity: 0.5 }} />
                <p>No items planned for Day {activeDay} yet.</p>
                <button className="btn btn-secondary btn-sm" style={{ marginTop: '12px' }} onClick={() => setShowAddItemModal(true)}>
                  <Plus size={14} /> Add First Event
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {currentDayData.items.map((item, idx) => (
                  <div key={item.id || idx} style={{
                    background: 'rgba(15, 23, 42, 0.7)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', width: '50px' }}>
                        {item.time || '10:00'}
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                          <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{item.title}</span>
                          {getCategoryBadge(item.category)}
                        </div>
                        {item.location && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                            📍 {item.location}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34d399' }}>
                        ₹{(item.cost || 0).toLocaleString('en-IN')}
                      </div>
                      <button 
                        onClick={() => handleDeleteItem(activeDay, item.id)}
                        style={{ background: 'none', border: 'none', color: '#fb7185', cursor: 'pointer', padding: '4px' }}
                        title="Remove item"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN: Live Cost Breakdown & Running Total */}
        <div>
          
          {/* Budget Overview Card */}
          <div className="glass-card" style={{ padding: '28px', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <PieChart size={20} color="#6366f1" /> Live Cost Breakdown
            </h2>

            {/* Total Budget vs Spent Meter */}
            <div style={{
              padding: '18px',
              borderRadius: 'var(--radius-sm)',
              background: isOverBudget ? 'rgba(244, 63, 94, 0.15)' : 'rgba(16, 185, 129, 0.12)',
              border: `1px solid ${isOverBudget ? 'rgba(244, 63, 94, 0.4)' : 'rgba(16, 185, 129, 0.3)'}`,
              marginBottom: '24px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Running Total Cost</span>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: isOverBudget ? '#fb7185' : '#34d399' }}>
                  ₹{totalCalculatedCost.toLocaleString('en-IN')}
                </span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '8px' }}>
                <span>Target Allocated Budget</span>
                <span>₹{(trip.targetBudget || 0).toLocaleString('en-IN')}</span>
              </div>

              <div style={{ width: '100%', height: '8px', background: 'rgba(0,0,0,0.3)', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  width: `${Math.min(Math.round((totalCalculatedCost / (trip.targetBudget || 1)) * 100), 100)}%`,
                  height: '100%',
                  background: isOverBudget 
                    ? 'linear-gradient(90deg, #f43f5e 0%, #e11d48 100%)' 
                    : 'linear-gradient(90deg, #6366f1 0%, #10b981 100%)'
                }} />
              </div>

              {isOverBudget ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#fb7185', marginTop: '10px' }}>
                  <AlertTriangle size={14} /> Exceeds target budget by ₹{(totalCalculatedCost - trip.targetBudget).toLocaleString('en-IN')}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: '#34d399', marginTop: '10px' }}>
                  <CheckCircle2 size={14} /> ₹{(trip.targetBudget - totalCalculatedCost).toLocaleString('en-IN')} remaining within target
                </div>
              )}
            </div>

            {/* Category Expenses Breakdown List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Car size={18} color="#818cf8" />
                  <span style={{ fontSize: '0.9rem' }}>🚗 Transport</span>
                </div>
                <span style={{ fontWeight: 700 }}>₹{totalTransport.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Hotel size={18} color="#34d399" />
                  <span style={{ fontSize: '0.9rem' }}>🏨 Stay / Lodging</span>
                </div>
                <span style={{ fontWeight: 700 }}>₹{totalStay.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Ticket size={18} color="#f472b6" />
                  <span style={{ fontSize: '0.9rem' }}>🎟️ Activities & Tours</span>
                </div>
                <span style={{ fontWeight: 700 }}>₹{totalActivities.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Utensils size={18} color="#fbbf24" />
                  <span style={{ fontSize: '0.9rem' }}>🍽️ Meals & Dining</span>
                </div>
                <span style={{ fontWeight: 700 }}>₹{totalMeals.toLocaleString('en-IN')}</span>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Add Item Modal */}
      {showAddItemModal && (
        <div className="modal-overlay" onClick={() => setShowAddItemModal(false)}>
          <div className="modal-content" onClick={e => e.stopPropagation()} style={{ maxWidth: '480px' }}>
            <h3 style={{ marginBottom: '16px' }}>Add Itinerary Event / Expense (Day {activeDay})</h3>
            <form onSubmit={handleAddItem}>
              
              <div className="form-group">
                <label className="form-label">Event / Activity Title *</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="e.g. Shinkansen Bullet Train to Kyoto" 
                  value={itemTitle} 
                  onChange={e => setItemTitle(e.target.value)} 
                  required 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-select"
                    value={itemCategory}
                    onChange={e => setItemCategory(e.target.value)}
                  >
                    <option value="transport">🚗 Transport</option>
                    <option value="stay">🏨 Stay</option>
                    <option value="activities">🎟️ Activity</option>
                    <option value="meals">🍽️ Meal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Estimated Cost (₹)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="45" 
                    value={itemCost} 
                    onChange={e => setItemCost(e.target.value)} 
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Time Slot</label>
                <input 
                  type="time" 
                  className="form-input" 
                  value={itemTime} 
                  onChange={e => setItemTime(e.target.value)} 
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowAddItemModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>
                  Add to Itinerary
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
