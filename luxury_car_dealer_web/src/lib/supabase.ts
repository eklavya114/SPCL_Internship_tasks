
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase URL or Anon Key. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.');
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co', 
  supabaseAnonKey || 'placeholder'
);

// Type definitions for our database
export type Vehicle = {
  id: number;
  name: string;
  year: number;
  price: number;
  mileage: string;
  fuel: string;
  body_type: string;
  transmission: string;
  color: string;
  image: string;
  badge?: string;
  vin?: string;
  engine?: string;
  horsepower?: string;
  torque?: string;
  drivetrain?: string;
  description?: string;
  features?: string[];
  specs?: any; // JSON
};

export type Testimonial = {
  id: number;
  name: string;
  role: string;
  location: string;
  avatar: string;
  image: string;
  content: string;
  rating: number;
};
