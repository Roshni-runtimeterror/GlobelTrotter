import express from 'express';
import cors from 'cors';
import { loadDb, saveDb } from './db.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'GlobeTrotter Node.js Backend API', timestamp: new Date().toISOString() });
});

// Authentication Routes
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const db = loadDb();
  const user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());

  if (!user) {
    // Auto-create demo session for convenient login
    const newUser = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0] || "Explorer",
      email,
      password: password || "password123",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Passionate nomad exploring incredible India & the world!",
      preferences: ["🏛️ History", "🍜 Foodie", "🌿 Nature"],
      stats: { countriesVisited: 14, totalTrips: 5, budgetSaved: "₹1,45,000", milesTraveled: "58,400" }
    };
    db.users.push(newUser);
    saveDb(db);
    return res.json({ success: true, user: newUser, token: `jwt-token-${newUser.id}` });
  }

  res.json({ success: true, user, token: `jwt-token-${user.id}` });
});

app.post('/api/auth/register', (req, res) => {
  const { name, email, password } = req.body;
  const db = loadDb();
  
  let user = db.users.find(u => u.email.toLowerCase() === (email || '').toLowerCase());
  if (user) {
    return res.status(400).json({ error: "User with this email already exists!" });
  }

  const newUser = {
    id: `usr-${Date.now()}`,
    name,
    email,
    password,
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
    bio: "Passionate nomad exploring incredible India & the world!",
    preferences: ["🏛️ History", "🍜 Foodie", "🌿 Nature"],
    stats: { countriesVisited: 1, totalTrips: 1, budgetSaved: "₹0", milesTraveled: "0" }
  };

  db.users.push(newUser);
  saveDb(db);
  res.json({ success: true, user: newUser, token: `jwt-token-${newUser.id}` });
});

// Trips Routes
app.get('/api/trips', (req, res) => {
  const db = loadDb();
  res.json(db.trips);
});

app.post('/api/trips', (req, res) => {
  const newTrip = req.body;
  const db = loadDb();
  db.trips.unshift(newTrip);
  saveDb(db);
  res.json({ success: true, trip: newTrip });
});

app.put('/api/trips/:id', (req, res) => {
  const { id } = req.params;
  const updatedTrip = req.body;
  const db = loadDb();
  
  const index = db.trips.findIndex(t => t.id === id);
  if (index >= 0) {
    db.trips[index] = updatedTrip;
    saveDb(db);
    return res.json({ success: true, trip: updatedTrip });
  }
  res.status(404).json({ error: "Trip not found" });
});

app.delete('/api/trips/:id', (req, res) => {
  const { id } = req.params;
  const db = loadDb();
  
  db.trips = db.trips.filter(t => t.id !== id);
  saveDb(db);
  res.json({ success: true, deletedId: id });
});

// Community Routes
app.get('/api/community', (req, res) => {
  const db = loadDb();
  res.json(db.communityTrips);
});

app.post('/api/community/:id/copy', (req, res) => {
  const { id } = req.params;
  const db = loadDb();
  const commTrip = db.communityTrips.find(t => t.id === id);

  if (!commTrip) {
    return res.status(404).json({ error: "Community trip not found" });
  }

  commTrip.copies += 1;
  const clonedTrip = {
    id: `trip-cloned-${Date.now()}`,
    title: `${commTrip.title} (Copy)`,
    destinations: commTrip.destinations,
    startDate: "2026-10-01",
    endDate: "2026-10-08",
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

  db.trips.unshift(clonedTrip);
  saveDb(db);
  res.json({ success: true, clonedTrip });
});

// ✨ AI Assistant Route
app.post('/api/ai/recommend', (req, res) => {
  const { query } = req.body;
  const lower = (query || '').toLowerCase();

  let text = `Based on your AI request "${query}", here are curated travel recommendations:`;
  let suggestions = [
    { title: "Heritage Palace Tour & Sunset Views", category: "activities", cost: 1800, time: "10:00", location: "India" },
    { title: "Local Culinary Tasting Feast", category: "meals", cost: 1200, time: "13:00", location: "Old City" }
  ];

  if (lower.includes('jaipur') || lower.includes('rajasthan')) {
    text = "Here are AI-curated recommendations for Jaipur & Rajasthan:";
    suggestions = [
      { title: "Amber Fort Sheesh Mahal Private Guided Tour", category: "activities", cost: 1500, time: "09:00", location: "Jaipur" },
      { title: "Hawa Mahal Facade Rooftop Kulfi & Tea", category: "meals", cost: 400, time: "17:00", location: "Pink City" }
    ];
  } else if (lower.includes('kerala')) {
    text = "Here are AI-recommended experiences for Kerala Backwaters & Tea Country:";
    suggestions = [
      { title: "Alleppey Sunset Backwaters Kayaking", category: "activities", cost: 1800, time: "16:30", location: "Alleppey" },
      { title: "Munnar Spice Plantation Walk & Lunch", category: "meals", cost: 1200, time: "12:00", location: "Munnar" }
    ];
  }

  res.json({ text, suggestions });
});

app.listen(PORT, () => {
  console.log(`🚀 GlobeTrotter Node.js Express Backend running at http://localhost:${PORT}`);
});
