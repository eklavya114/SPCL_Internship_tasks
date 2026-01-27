
import sqlite3 from 'sqlite3';
import { promisify } from 'util';

// Initialize the SQLite database connection
const db = new sqlite3.Database('./connectsphere.db');

// Promisify database methods for cleaner async/await usage
export const dbQuery = promisify(db.all).bind(db);
export const dbRun = promisify(db.run).bind(db);
export const dbGet = promisify(db.get).bind(db);

/**
 * Initializes the database tables if they do not exist.
 * This ensures the backend has a consistent real storage structure.
 */
export async function initDatabase() {
  // 1. Users Table: Stores credentials and roles
  await dbRun(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user'
    )
  `);

  // 2. Events Table: Stores summit and workshop details
  await dbRun(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT,
      date TEXT,
      time TEXT,
      venue TEXT,
      image_url TEXT,
      category TEXT,
      organizer TEXT,
      created_by INTEGER,
      FOREIGN KEY(created_by) REFERENCES users(id)
    )
  `);

  // 3. Bookings Table: Links users to events they attend
  await dbRun(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      event_id INTEGER,
      ticket_type TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES users(id),
      FOREIGN KEY(event_id) REFERENCES events(id)
    )
  `);

  // Ensure an admin user exists for management tasks (password can be changed later)
  try {
    const bcrypt = await import('bcryptjs');
    const existingAdmin: any = await dbGet("SELECT * FROM users WHERE role = 'admin' LIMIT 1");
    if (!existingAdmin) {
      const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
      const hashed = await bcrypt.hash(adminPassword, 10);
      await dbRun(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin', 'admin@connectsphere.local', hashed, 'admin']
      );
      console.log('Admin user created with email admin@connectsphere.local and default password (or ADMIN_PASSWORD env var)');
    }
  } catch (err) {
    console.warn('Admin seed step failed:', err);
  }

  console.log('Database Schema Initialized Successfully.');
}
