import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AITravelAssistantModal from './components/AITravelAssistantModal';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateTrip from './pages/CreateTrip';
import NearbyRecommended from './pages/NearbyRecommended';
import MyTrips from './pages/MyTrips';
import UserProfile from './pages/UserProfile';
import ActivitySearch from './pages/ActivitySearch';
import ItineraryBudget from './pages/ItineraryBudget';
import Community from './pages/Community';
import PixelPassport from './pages/PixelPassport';

import { INITIAL_USER, INITIAL_TRIPS } from './data/mockData';
import { api } from './services/api';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('gt_auth') === 'true';
  });

  const [authView, setAuthView] = useState('login'); // 'login' | 'register'
  const [activeScreen, setActiveScreen] = useState('dashboard');

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gt_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('gt_trips');
    return saved ? JSON.parse(saved) : INITIAL_TRIPS;
  });

  const [activeTripId, setActiveTripId] = useState(() => {
    return trips[0]?.id || null;
  });

  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Persist state & sync with Node.js Backend API
  useEffect(() => {
    async function syncBackend() {
      const serverTrips = await api.getTrips();
      if (serverTrips && Array.isArray(serverTrips)) {
        setTrips(serverTrips);
      }
    }
    syncBackend();
  }, []);

  useEffect(() => {
    localStorage.setItem('gt_auth', isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  useEffect(() => {
    localStorage.setItem('gt_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gt_trips', JSON.stringify(trips));
  }, [trips]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleLoginSuccess = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
    showToast(`Welcome back, ${userData.name}!`);
  };

  const handleRegisterSuccess = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
    setIsAuthenticated(true);
    setActiveScreen('dashboard');
    showToast(`Account created successfully! Welcome to GlobeTrotter.`);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthView('login');
    showToast('Logged out successfully.');
  };

  const handleCreateTripSuccess = (newTrip) => {
    setTrips(prev => [newTrip, ...prev]);
    setActiveTripId(newTrip.id);
    setActiveScreen('itinerary');
    showToast(`Trip "${newTrip.title}" created successfully!`);
  };

  const handleSelectTrip = (trip) => {
    setActiveTripId(trip.id);
    setActiveScreen('itinerary');
  };

  const handleDeleteTrip = (tripId) => {
    setTrips(prev => prev.filter(t => t.id !== tripId));
    if (activeTripId === tripId) {
      const remaining = trips.filter(t => t.id !== tripId);
      setActiveTripId(remaining[0]?.id || null);
    }
    showToast('Trip deleted.');
  };

  const handleUpdateTrip = (updatedTrip) => {
    setTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
    showToast(`Trip "${updatedTrip.title}" updated.`);
  };

  const handleAddActivityToTrip = (tripId, activityItem) => {
    setTrips(prev => prev.map(t => {
      if (t.id === tripId) {
        const firstDay = t.itinerary[0] || { day: 1, title: 'Day 1 Highlights', items: [] };
        const updatedFirstDay = {
          ...firstDay,
          items: [...(firstDay.items || []), { id: `item-${Date.now()}`, ...activityItem }]
        };
        const updatedItinerary = t.itinerary.length > 0 
          ? [updatedFirstDay, ...t.itinerary.slice(1)]
          : [updatedFirstDay];
        return { ...t, itinerary: updatedItinerary };
      }
      return t;
    }));
    showToast(`Added "${activityItem.title}" to trip itinerary!`);
  };

  const handleCopyCommunityTrip = (commTrip) => {
    const clonedTrip = {
      id: `trip-cloned-${Date.now()}`,
      title: `${commTrip.title} (Copy)`,
      destinations: commTrip.destinations,
      startDate: "2026-09-01",
      endDate: "2026-09-08",
      coverPhoto: commTrip.coverPhoto,
      description: `Cloned community itinerary originally created by ${commTrip.author}.`,
      status: "upcoming",
      targetBudget: commTrip.estCost,
      categoriesBudget: {
        transport: Math.round(commTrip.estCost * 0.3),
        stay: Math.round(commTrip.estCost * 0.4),
        activities: Math.round(commTrip.estCost * 0.15),
        meals: Math.round(commTrip.estCost * 0.15)
      },
      itinerary: commTrip.itinerary || []
    };

    setTrips(prev => [clonedTrip, ...prev]);
    setActiveTripId(clonedTrip.id);
    showToast(`⚡ Copied "${commTrip.title}" into My Trips!`);
  };

  const activeTripObj = trips.find(t => t.id === activeTripId) || trips[0];

  // If not authenticated, render Login or Register screen
  if (!isAuthenticated) {
    if (authView === 'register') {
      return <Register onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <Login onLoginSuccess={handleLoginSuccess} onSwitchToRegister={() => setAuthView('register')} />;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      
      {/* Top Navbar */}
      <Navbar 
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        user={user}
        onLogout={handleLogout}
        onOpenAiModal={() => setAiModalOpen(true)}
        tripsCount={trips.length}
      />

      {/* Screen Router */}
      <main>
        {activeScreen === 'dashboard' && (
          <Dashboard 
            user={user}
            trips={trips}
            setActiveScreen={setActiveScreen}
            onSelectTrip={handleSelectTrip}
            onOpenAiModal={() => setAiModalOpen(true)}
          />
        )}

        {activeScreen === 'createtrip' && (
          <CreateTrip 
            onCreateTripSuccess={handleCreateTripSuccess}
          />
        )}

        {activeScreen === 'nearby' && (
          <NearbyRecommended 
            activeTrip={activeTripObj}
            onAddActivityToTrip={handleAddActivityToTrip}
          />
        )}

        {activeScreen === 'mytrips' && (
          <MyTrips 
            trips={trips}
            setActiveScreen={setActiveScreen}
            onSelectTrip={handleSelectTrip}
            onDeleteTrip={handleDeleteTrip}
            onUpdateTrip={handleUpdateTrip}
          />
        )}

        {activeScreen === 'profile' && (
          <UserProfile 
            user={user}
            onUpdateUser={setUser}
            tripsCount={trips.length}
          />
        )}

        {activeScreen === 'search' && (
          <ActivitySearch 
            activeTrip={activeTripObj}
            onAddActivityToTrip={handleAddActivityToTrip}
          />
        )}

        {activeScreen === 'itinerary' && (
          <ItineraryBudget 
            trip={activeTripObj}
            onUpdateTrip={handleUpdateTrip}
            setActiveScreen={setActiveScreen}
          />
        )}

        {activeScreen === 'community' && (
          <Community 
            onCopyTripSuccess={handleCopyCommunityTrip}
          />
        )}

        {activeScreen === 'passport' && (
          <PixelPassport 
            userTrips={trips}
          />
        )}
      </main>

      {/* Global ✨ AI Travel Guide Floating Assistant Modal */}
      <AITravelAssistantModal 
        isOpen={aiModalOpen}
        onClose={() => setAiModalOpen(false)}
        onAddActivityToTrip={handleAddActivityToTrip}
        activeTrip={activeTripObj}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          background: 'linear-gradient(135deg, #131b2e 0%, #1e1b4b 100%)',
          border: '1px solid #6366f1',
          color: '#fff',
          padding: '12px 20px',
          borderRadius: 'var(--radius-md)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
          zIndex: 200,
          fontSize: '0.9rem',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)'
        }}>
          ✨ {toastMessage}
        </div>
      )}

    </div>
  );
}
