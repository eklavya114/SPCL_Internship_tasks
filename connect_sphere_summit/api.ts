
const BASE_URL = 'http://localhost:3001/api';

/**
 * MOCK DATABASE SYSTEM
 * Provides a full fallback when the backend is unreachable.
 * Stores data in LocalStorage to ensure persistence across refreshes.
 */
class MockDB {
  private static getStore(key: string): any[] {
    return JSON.parse(localStorage.getItem(`mock_${key}`) || '[]');
  }
  private static setStore(key: string, data: any[]) {
    localStorage.setItem(`mock_${key}`, JSON.stringify(data));
  }

  static async register(user: any) {
    const users = this.getStore('users');
    if (users.find(u => u.email === user.email)) throw new Error("Email already exists");
    const newUser = { ...user, id: Date.now(), role: 'user' };
    users.push(newUser);
    this.setStore('users', users);
    return { message: "Success" };
  }

  static async login(creds: any) {
    const users = this.getStore('users');
    const user = users.find(u => u.email === creds.email && u.password === creds.password);
    if (!user) throw new Error("Invalid credentials");
    return { token: 'mock-jwt-token', user };
  }

  static async googleLogin(payload: any) {
    const users = this.getStore('users');
    let user = users.find(u => u.email === payload.email);
    if (!user) {
      user = { ...payload, id: Date.now(), role: 'user' };
      users.push(user);
      this.setStore('users', users);
    }
    return { token: 'mock-google-token', user };
  }

  static async getEvents() {
    return this.getStore('events');
  }

  static async createEvent(event: any) {
    const events = this.getStore('events');
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const newEvent = { 
      ...event, 
      id: Date.now(), 
      created_by: currentUser.id,
      organizer: currentUser.name || 'Anonymous'
    };
    events.push(newEvent);
    this.setStore('events', events);
    return newEvent;
  }

  static async getBookings() {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const bookings = this.getStore('bookings');
    const events = this.getStore('events');
    
    // Filter by current user and join event data for display
    return bookings
      .filter(b => b.user_id === currentUser.id)
      .map(b => {
        const event = events.find(e => e.id === b.event_id) || {};
        return {
          ...b,
          event_name: event.title || 'Unknown Event',
          event_date: event.date || 'TBD'
        };
      });
  }

  static async createBooking(booking: any) {
    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');
    const bookings = this.getStore('bookings');
    const newBooking = { 
      ...booking, 
      id: Date.now(), 
      user_id: currentUser.id,
      created_at: new Date().toISOString()
    };
    bookings.push(newBooking);
    this.setStore('bookings', bookings);
    return newBooking;
  }
}

/**
 * API WRAPPER WITH AUTO-FALLBACK
 */
async function request(path: string, options: RequestInit = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(localStorage.getItem('token') ? { 'Authorization': `Bearer ${localStorage.getItem('token')}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${BASE_URL}${path}`, { ...options, headers });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Server error');
    }
    return await response.json();
  } catch (err: any) {
    // If it's a network error (server down), use MockDB
    if (err.name === 'TypeError' || err.message.includes('fetch')) {
      console.warn(`[API] Server unreachable at ${BASE_URL}. Falling back to Mock DB.`);
      return await handleMockRequest(path, options);
    }
    throw err;
  }
}

async function handleMockRequest(path: string, options: RequestInit) {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body as string) : null;
  
  if (path === '/auth/register') return MockDB.register(body);
  if (path === '/auth/login') return MockDB.login(body);
  if (path === '/auth/google') return MockDB.googleLogin(body);
  
  if (path === '/events') {
    if (method === 'GET') return MockDB.getEvents();
    if (method === 'POST') return MockDB.createEvent(body);
  }
  
  // Support DELETE /events/:id in mock mode
  if (path.startsWith('/events/') && method === 'DELETE') {
    const id = Number(path.split('/').pop());
    const events = this.getStore('events');
    const newEvents = events.filter(e => e.id !== id);
    this.setStore('events', newEvents);
    // Also remove related bookings
    const bookings = this.getStore('bookings');
    this.setStore('bookings', bookings.filter(b => b.event_id !== id));
    return { message: 'Deleted' };
  }
  
  if (path === '/bookings') {
    if (method === 'GET') return MockDB.getBookings();
    if (method === 'POST') return MockDB.createBooking(body);
  }
  
  throw new Error(`Mock endpoint not implemented: ${method} ${path}`);
}

export const api = {
  register: (data: any) => request('/auth/register', { method: 'POST', body: JSON.stringify(data) }),
  login: (data: any) => request('/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  googleLogin: (data: any) => request('/auth/google', { method: 'POST', body: JSON.stringify(data) }),
  getEvents: () => request('/events'),
  createEvent: (data: any) => request('/events', { method: 'POST', body: JSON.stringify(data) }),
  deleteEvent: (id: number | string) => request(`/events/${id}`, { method: 'DELETE' }),
  getMyBookings: () => request('/bookings'),
  createBooking: (data: any) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
  getProfile: () => request('/me'),
};
