import React, { useState } from 'react';
import { Sparkles, X, Send, Bot, MapPin, Plus, Check } from 'lucide-react';

export default function AITravelAssistantModal({ isOpen, onClose, onAddActivityToTrip, activeTrip }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text: "👋 Hi! I'm your ✨ AI Travel Guide. Ask me anything about destinations, budget tips, hidden gems, or custom day itineraries!"
    }
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [addedItems, setAddedItems] = useState({});

  if (!isOpen) return null;

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputQuery.trim()) return;

    const userMsg = { id: Date.now(), sender: 'user', text: inputQuery };
    setMessages(prev => [...prev, userMsg]);
    const promptText = inputQuery;
    setInputQuery('');
    setIsGenerating(true);

    setTimeout(() => {
      let aiResponseText = "";
      let suggestions = [];

      const lower = promptText.toLowerCase();

      if (lower.includes('kyoto') || lower.includes('japan')) {
        aiResponseText = "Here are top AI-recommended spots tailored for Kyoto & Japan travel:";
        suggestions = [
          { title: "Gion Evening Geisha District Guided Walk", category: "activities", cost: 2800, time: "18:00", location: "Kyoto" },
          { title: "Kinkaku-ji (Golden Pavilion) Morning Tour", category: "activities", cost: 1000, time: "09:00", location: "Kyoto" },
          { title: "Matcha Tea Ceremony in Traditional Machiya", category: "activities", cost: 3200, time: "14:00", location: "Kyoto" }
        ];
      } else if (lower.includes('budget') || lower.includes('cheap') || lower.includes('cost')) {
        aiResponseText = "Here are smart budget-saving recommendations for your trip:";
        suggestions = [
          { title: "Local Market Tasting Walk (Nishiki/Mercato)", category: "meals", cost: 1600, time: "12:30", location: "Local Market" },
          { title: "Day Transit Unlimited Regional Pass", category: "transport", cost: 1200, time: "08:00", location: "City Transit" },
          { title: "Free Sunset Viewpoint Hike", category: "activities", cost: 0, time: "17:30", location: "Panorama Peak" }
        ];
      } else {
        aiResponseText = `Based on your request "${promptText}", here is a custom recommendations package:`;
        suggestions = [
          { title: "Scenic Heritage Walk & Hidden Alleyways", category: "activities", cost: 1200, time: "10:00", location: "Old Town" },
          { title: "Boutique Local Specialty Tasting", category: "meals", cost: 2400, time: "13:00", location: "Downtown" },
          { title: "Sunset Rooftop View & Refreshment", category: "activities", cost: 2000, time: "19:00", location: "Skyline Lounge" }
        ];
      }

      setMessages(prev => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'ai',
          text: aiResponseText,
          suggestions
        }
      ]);
      setIsGenerating(false);
    }, 1200);
  };

  const handleAddSuggestion = (item, msgId, idx) => {
    if (!activeTrip) {
      alert("Please select or create an active trip first from 'My Trips' to add this recommendation!");
      return;
    }
    onAddActivityToTrip(activeTrip.id, item);
    setAddedItems(prev => ({ ...prev, [`${msgId}-${idx}`]: true }));
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '680px', height: '600px', display: 'flex', flexDirection: 'column', padding: '0' }} onClick={e => e.stopPropagation()}>
        
        {/* Modal Header */}
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(236, 72, 153, 0.2) 100%)',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Sparkles size={22} color="#fff" />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>✨ AI Travel Guide Assistant</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                Powered by GlobeTrotter AI Engine • {activeTrip ? `Active Trip: ${activeTrip.title}` : 'No active trip selected'}
              </p>
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        {/* Chat Message Stream */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: msg.sender === 'user' ? 'flex-end' : 'flex-start'
            }}>
              <div style={{
                maxWidth: '85%',
                padding: '14px 18px',
                borderRadius: '16px',
                fontSize: '0.95rem',
                background: msg.sender === 'user' 
                  ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
                  : 'rgba(255, 255, 255, 0.07)',
                border: msg.sender === 'ai' ? '1px solid var(--border-color)' : 'none',
                color: '#fff'
              }}>
                {msg.sender === 'ai' && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontSize: '0.75rem', color: '#a78bfa', fontWeight: 600 }}>
                    <Bot size={14} /> AI Travel Guide
                  </div>
                )}
                <p style={{ margin: 0 }}>{msg.text}</p>

                {/* AI Suggestions Cards */}
                {msg.suggestions && msg.suggestions.length > 0 && (
                  <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {msg.suggestions.map((sug, idx) => {
                      const key = `${msg.id}-${idx}`;
                      const isAdded = addedItems[key];
                      return (
                        <div key={idx} style={{
                          background: 'rgba(15, 23, 42, 0.8)',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          borderRadius: '10px',
                          padding: '10px 14px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '10px'
                        }}>
                          <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem', color: '#f8fafc' }}>{sug.title}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '10px', marginTop: '2px' }}>
                              <span>📍 {sug.location}</span>
                              <span>💵 ₹{sug.cost?.toLocaleString('en-IN')}</span>
                              <span>🕒 {sug.time}</span>
                            </div>
                          </div>
                          <button 
                            className={`btn btn-sm ${isAdded ? 'btn-secondary' : 'btn-primary'}`}
                            onClick={() => handleAddSuggestion(sug, msg.id, idx)}
                            disabled={isAdded}
                            style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          >
                            {isAdded ? <Check size={14} color="#10b981" /> : <Plus size={14} />}
                            {isAdded ? 'Added' : 'Add to Trip'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: '#a78bfa', fontSize: '0.85rem' }}>
              <Sparkles size={16} className="animate-pulse-slow" /> AI is crafting personalized suggestions...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} style={{
          padding: '16px 20px',
          borderTop: '1px solid var(--border-color)',
          background: 'rgba(15, 23, 42, 0.9)',
          display: 'flex',
          gap: '10px'
        }}>
          <input 
            type="text"
            className="form-input"
            placeholder="Ask AI: e.g. '3-day Tokyo itinerary under ₹40,000' or 'Best beaches in Amalfi'..."
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            style={{ borderRadius: 'var(--radius-full)' }}
          />
          <button type="submit" className="btn btn-ai" style={{ borderRadius: 'var(--radius-full)', padding: '0 20px' }}>
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
