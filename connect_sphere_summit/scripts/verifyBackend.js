(async () => {
  const base = 'http://localhost:3001/api';
  const log = (...args) => console.log('[verify]', ...args);

  const random = Date.now();
  const user = { name: 'Test User', email: `test+${random}@example.com`, password: 'pass1234' };

  try {
    // Register
    log('Registering test user...');
    await fetch(`${base}/auth/register`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify(user) });

    // Login
    log('Logging in...');
    let resp = await fetch(`${base}/auth/login`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ email: user.email, password: user.password }) });
    const data = await resp.json();
    const token = data.token;
    if (!token) throw new Error('Login failed');
    log('Login OK, token received');

    // Create event
    log('Creating event...');
    resp = await fetch(`${base}/events`, { method: 'POST', headers: {'content-type':'application/json','authorization':`Bearer ${token}`}, body: JSON.stringify({ title: 'Verify Event', description: 'Automated', date: '2026-01-01', time: '12:00', venue: 'Test', image_url: '', category: 'testing' }) });
    const ev = await resp.json();
    log('Event creation response:', ev);

    // List events
    log('Listing events...');
    resp = await fetch(`${base}/events`);
    const events = await resp.json();
    log('Events count:', Array.isArray(events) ? events.length : 'unexpected');
    const created = events.find(e => e.title === 'Verify Event');
    if (!created) throw new Error('Created event not found');

    // Book the event
    log('Creating booking...');
    resp = await fetch(`${base}/bookings`, { method: 'POST', headers: {'content-type':'application/json','authorization':`Bearer ${token}`}, body: JSON.stringify({ event_id: created.id, ticket_type: 'General' }) });
    log('Booking response:', await resp.json());

    // Get my bookings
    log('Fetching my bookings...');
    resp = await fetch(`${base}/bookings`, { headers: {'authorization':`Bearer ${token}`} });
    log('My bookings:', await resp.json());

    // Try to delete event as normal user (should succeed because owner)
    log('Deleting event as owner...');
    resp = await fetch(`${base}/events/${created.id}`, { method: 'DELETE', headers: {'authorization':`Bearer ${token}`} });
    log('Delete response:', await resp.json());

    // Login as admin and list users
    log('Logging in as admin...');
    resp = await fetch(`${base}/auth/login`, { method: 'POST', headers: {'content-type':'application/json'}, body: JSON.stringify({ email: 'admin@connectsphere.local', password: process.env.ADMIN_PASSWORD || 'admin123' }) });
    const adminData = await resp.json();
    if (!adminData.token) throw new Error('Admin login failed');
    log('Admin login OK');

    // Admin - list users
    log('Admin fetching users...');
    resp = await fetch(`${base}/users`, { headers: {'authorization':`Bearer ${adminData.token}`} });
    log('Users:', await resp.json());

    log('Verify script completed successfully.');
  } catch (err) {
    console.error('Verify script failed:', err);
    process.exit(1);
  }
})();