
import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import { initDatabase, dbRun, dbGet, dbQuery } from './database.js';

const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'connect_sphere_super_secret_key';

app.use(express.json());
app.use(cors({ origin: '*' })); // Allow all origins for testing

// Initialize SQL tables on startup
initDatabase().then(() => {
  console.log('Database system ready.');
}).catch(err => {
  console.error('Database initialization failed:', err);
});

/**
 * Middleware: Authenticate User via JWT
 */
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'Access denied. Please login.' });

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) return res.status(403).json({ error: 'Session expired. Please login again.' });
    req.user = user;
    next();
  });
};

/**
 * Middleware: require a specific role (e.g., 'admin')
 */
const requireRole = (role: string) => {
  return (req: any, res: any, next: any) => {
    if (!req.user) return res.status(401).json({ error: 'Access denied.' });
    if (req.user.role !== role) return res.status(403).json({ error: 'Forbidden. Admins only.' });
    next();
  };
};

// --- AUTHENTICATION ROUTES ---

// User Registration
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await dbRun(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email.toLowerCase().trim(), hashedPassword, role]
    );
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: any) {
    if (err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Registration failed' });
  }
});

// User Login
app.post('/api/auth/login', async (req: any, res: any) => {
  const { email, password } = req.body;
  try {
    const user: any = await dbGet('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }
    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
});

// Google Login Endpoint
app.post('/api/auth/google', async (req: any, res: any) => {
  const { email, name, sub } = req.body; // 'sub' is Google's unique user ID
  
  try {
    // Check if user exists
    let user: any = await dbGet('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    
    if (!user) {
      // Create user if not exists (password is a random string since they use Google)
      const randomPassword = await bcrypt.hash(sub, 10);
      await dbRun(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email.toLowerCase().trim(), randomPassword, 'user']
      );
      user = await dbGet('SELECT * FROM users WHERE email = ?', [email.toLowerCase().trim()]);
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, name: user.name, role: user.role, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: 'Google Login failed' });
  }
});

// Return current logged-in user's profile
app.get('/api/me', authenticateToken, async (req: any, res: any) => {
  try {
    const user: any = await dbGet('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Admin: list all users (no passwords)
app.get('/api/users', authenticateToken, requireRole('admin'), async (req: any, res: any) => {
  try {
    const users = await dbQuery('SELECT id, name, email, role FROM users ORDER BY id DESC');
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Admin: view all bookings across users
app.get('/api/bookings/all', authenticateToken, requireRole('admin'), async (req: any, res: any) => {
  try {
    const bookings = await dbQuery(`
      SELECT b.*, u.name as user_name, u.email as user_email, e.title as event_name
      FROM bookings b
      JOIN users u ON b.user_id = u.id
      JOIN events e ON b.event_id = e.id
      ORDER BY b.created_at DESC
    `);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

// Update current user's profile (name/email)
app.put('/api/me', authenticateToken, async (req: any, res: any) => {
  const { name, email } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'Name and email required' });
  try {
    await dbRun('UPDATE users SET name = ?, email = ? WHERE id = ?', [name, email.toLowerCase().trim(), req.user.id]);
    const updated = await dbGet('SELECT id, name, email, role FROM users WHERE id = ?', [req.user.id]);
    res.json(updated);
  } catch (err: any) {
    if (err.message && err.message.includes('UNIQUE')) return res.status(400).json({ error: 'Email already exists' });
    res.status(500).json({ error: 'Failed to update profile' });
  }
});

// Change password
app.post('/api/me/password', authenticateToken, async (req: any, res: any) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) return res.status(400).json({ error: 'Both old and new passwords are required' });
  try {
    const user: any = await dbGet('SELECT * FROM users WHERE id = ?', [req.user.id]);
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
      return res.status(400).json({ error: 'Invalid current password' });
    }
    const hashed = await bcrypt.hash(newPassword, 10);
    await dbRun('UPDATE users SET password = ? WHERE id = ?', [hashed, req.user.id]);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// Delete an event (owner or admin)
app.delete('/api/events/:id', authenticateToken, async (req: any, res: any) => {
  const id = Number(req.params.id);
  try {
    const event: any = await dbGet('SELECT * FROM events WHERE id = ?', [id]);
    if (!event) return res.status(404).json({ error: 'Event not found' });
    if (req.user.role !== 'admin' && req.user.id !== event.created_by) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await dbRun('DELETE FROM events WHERE id = ?', [id]);
    // Optionally remove related bookings
    await dbRun('DELETE FROM bookings WHERE event_id = ?', [id]);
    res.json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
});

// --- EVENT & BOOKING ROUTES ---

// Get all events
app.get('/api/events', async (req, res) => {
  const events = await dbQuery('SELECT * FROM events ORDER BY id DESC');
  res.json(events);
});

// Added POST /api/events endpoint to handle event creation from ManagePage.tsx
app.post('/api/events', authenticateToken, async (req: any, res) => {
  const { title, description, date, time, venue, image_url, category } = req.body;
  try {
    await dbRun(
      'INSERT INTO events (title, description, date, time, venue, image_url, category, organizer, created_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [title, description, date, time, venue, image_url, category, req.user.name, req.user.id]
    );
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to create event' });
  }
});

// Create a new booking
app.post('/api/bookings', authenticateToken, async (req: any, res) => {
  const { event_id, ticket_type } = req.body;
  try {
    await dbRun('INSERT INTO bookings (user_id, event_id, ticket_type) VALUES (?, ?, ?)', [req.user.id, event_id, ticket_type]);
    res.status(201).json({ message: 'Booking success' });
  } catch (err) {
    res.status(500).json({ error: 'Booking failed' });
  }
});

// Added GET /api/bookings endpoint to retrieve current user's bookings with joined event info
app.get('/api/bookings', authenticateToken, async (req: any, res) => {
  try {
    const bookings = await dbQuery(`
      SELECT b.*, e.title as event_name, e.date as event_date 
      FROM bookings b 
      JOIN events e ON b.event_id = e.id 
      WHERE b.user_id = ?
    `, [req.user.id]);
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.listen(PORT, () => {
  console.log(`ConnectSphere Backend running on http://localhost:${PORT}`);
});
