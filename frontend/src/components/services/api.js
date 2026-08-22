const API_BASE_URL = 'http://localhost:5000/api';

export async function fetchApi(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn(`[API] Fallback mode for ${endpoint}:`, err);
    return null;
  }
}

export const api = {
  health: () => fetchApi('/health'),
  login: (credentials) => fetchApi('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  register: (userData) => fetchApi('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  getTrips: () => fetchApi('/trips'),
  createTrip: (trip) => fetchApi('/trips', { method: 'POST', body: JSON.stringify(trip) }),
  updateTrip: (id, trip) => fetchApi(`/trips/${id}`, { method: 'PUT', body: JSON.stringify(trip) }),
  deleteTrip: (id) => fetchApi(`/trips/${id}`, { method: 'DELETE' }),
  getCommunityTrips: () => fetchApi('/community'),
  copyCommunityTrip: (id) => fetchApi(`/community/${id}/copy`, { method: 'POST' }),
  askAiGuide: (query) => fetchApi('/ai/recommend', { method: 'POST', body: JSON.stringify({ query }) })
};
