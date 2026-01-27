# Luxury Drive Online

A premium luxury vehicle showcase and sales platform built with modern web technologies.

## Getting Started

### Prerequisites

You need Node.js & npm installed. [Install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

### Installation

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project
cd luxury-drive-online

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080/`

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **Framer Motion** - Animations
- **React Router** - Navigation
- **React Hook Form** - Form management

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page components
├── hooks/         # Custom React hooks
├── lib/           # Utilities and helpers
├── assets/        # Static assets
└── App.tsx        # Main app component
```

## Development

For local development:

1. Make sure Node.js is installed
2. Run `npm install` to install dependencies
3. Run `npm run dev` to start the dev server
4. Open http://localhost:8080 in your browser
5. Make changes and see them update automatically

## Build

To create a production build:

```sh
npm run build
```

The build output will be in the `dist/` directory.

## Backend

### Data Management

The application uses a **client-side data management approach** with static data structures:

#### Vehicle Inventory
- **Location**: `src/pages/Inventory.tsx`
- **Data Structure**: Array of vehicle objects containing:
  - Vehicle ID, name, year, price
  - Mileage, fuel type, body type, transmission
  - Color, images, and specialty badges
- **Current Inventory**: 6+ luxury vehicles including Rolls-Royce, Jaguar, Mercedes-Benz, Aston Martin, Ferrari, and Porsche classics

#### Vehicle Details
- **Location**: `src/pages/VehicleDetail.tsx`
- **Features**:
  - Individual vehicle specifications and pricing
  - Image gallery with navigation
  - Financing calculator with:
    - Down payment adjustment
    - Loan term selection (12-84 months)
    - Interest rate calculation (6.5% base rate)
    - Monthly payment computation

#### Testimonials
- **Location**: `src/components/home/TestimonialsSection.tsx`
- **Features**:
  - Customer testimonials with auto-rotation
  - Profile images and ratings
  - 6-second auto-cycle through testimonials

### Data Fetching

Currently, the application uses **local state management** with:
- Static arrays for vehicle inventory and testimonials
- React `useState` hooks for dynamic state
- Client-side filtering and search functionality
- No external API calls (fully frontend-driven)

### Future Backend Integration

To connect to a real backend API, modify:
1. Use `useEffect` with `fetch()` or axios for API calls
2. Replace static arrays in `Inventory.tsx` with API response data
3. Implement endpoints for:
   - GET `/api/vehicles` - Fetch all vehicles
   - GET `/api/vehicles/:id` - Fetch vehicle details
   - POST `/api/contact` - Handle contact form submissions
   - POST `/api/financing` - Calculate financing options

---

**Created by eklavya**
