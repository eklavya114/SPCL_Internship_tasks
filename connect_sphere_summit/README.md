
# ConnectSphere API Documentation

This project features a real Node.js backend with an SQLite database for persistent event management.

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: SQLite3
- **Security**: JWT (JSON Web Tokens) & BcryptJS

## Database Schema (SQL)

### Users Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | PK, Autoincrement |
| name | TEXT | Full name |
| email | TEXT | Unique email |
| password | TEXT | Hashed password |
| role | TEXT | 'user' or 'admin' |

### Events Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | PK, Autoincrement |
| title | TEXT | Title of the event |
| description | TEXT | Detailed info |
| venue | TEXT | Location |
| category | TEXT | Event type |
| created_by | INTEGER | FK to users.id |

### Bookings Table
| Column | Type | Description |
|--------|------|-------------|
| id | INTEGER | PK, Autoincrement |
| user_id | INTEGER | FK to users.id |
| event_id | INTEGER | FK to events.id |
| ticket_type | TEXT | Pass level |

## API Endpoints

### Authentication
- `POST /api/auth/register`: Register a new user.
- `POST /api/auth/login`: Login and receive token.

### Events
- `GET /api/events`: List all events.
- `POST /api/events`: Create an event (Requires Auth).

### Bookings
- `GET /api/bookings`: List logged-in user's bookings.
- `POST /api/bookings`: Book an event (Requires Auth).

## Running the Backend (local dev)
1. Install dependencies:

```bash
npm install
```

2. Start the backend server (development):

```bash
npm run dev:server
```

- By default the server runs on `http://localhost:3001`.
- A default admin user is seeded at first run: **admin@connectsphere.local** (default password: `admin123`) — you can override with the `ADMIN_PASSWORD` environment variable.
- To change the JWT secret use `JWT_SECRET` environment variable.

## Notes
- The backend uses SQLite (`./connectsphere.db`) for persistence.
- Use `GET /api/me` to fetch the current user's profile once authenticated.
- Admin-only endpoints include `GET /api/users` and `GET /api/bookings/all`.
