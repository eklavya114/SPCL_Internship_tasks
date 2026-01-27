-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- VEHICLES TABLE
create table public.vehicles (
  id serial primary key,
  name text not null,
  year integer not null,
  price integer not null,
  mileage text not null, -- Keeping as text for "42,000" format, or could be int
  fuel text not null,
  body_type text not null,
  transmission text not null,
  color text not null,
  image text not null, -- This will hold the import path or URL. For now, we'll store the object key or assume static assets are handled. 
                       -- NOTE: In a real app, these should be Storage URLs. 
                       -- For this migration, we will use the string paths from the code, assuming the frontend can resolve them or they are replaced by public URLs.
                       -- Since the current code uses imports (e.g. `import car1 from "@/assets/car-1.jpg"`), 
                       -- we might need to map these to actual URLs in the bucket. 
                       -- FOR NOW: We will insert placeholder URLs or the asset names.
  badge text,
  vin text,
  engine text,
  horsepower text,
  torque text,
  drivetrain text,
  description text,
  features jsonb, -- Array of strings
  specs jsonb, -- Object with engine, dimensions, performance arrays
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- TESTIMONIALS TABLE
create table public.testimonials (
  id serial primary key,
  name text not null,
  role text not null,
  location text not null,
  avatar text not null, -- initialsb
  image text not null, -- URL
  content text not null,
  rating integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- CONTACT SUBMISSIONS TABLE
create table public.contact_submissions (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  email text not null,
  message text not null,
  vehicle_id integer references public.vehicles(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS POLICIES
alter table public.vehicles enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_submissions enable row level security;

-- Allow read access to everyone for vehicles and testimonials
create policy "Public vehicles are viewable by everyone" on public.vehicles for select using (true);
create policy "Public testimonials are viewable by everyone" on public.testimonials for select using (true);

-- Allow insert access to everyone for contact form (anon)
create policy "Anyone can submit contact form" on public.contact_submissions for insert with check (true);

-- SEED DATA: VEHICLES
-- Note: Images are tricky because they are local imports. 
-- WE RECOMMEND uploading your local assets to Supabase Storage bucket 'vehicles' and updating these URLs.
-- For this seed, we will use placeholders that you should update.

insert into public.vehicles (
  id, name, year, price, mileage, fuel, body_type, transmission, color, image, badge,
  vin, engine, horsepower, torque, drivetrain, description, features, specs
) values 
(
  1, 'Rolls-Royce Silver Shadow', 1972, 185000, '42,000', 'Petrol', 'Sedan', 'Automatic', 'Cream White', 
  '/car-1.jpg', 
  'Rare Find',
  'SRH16266', '6.75L V8', '189 hp', '283 lb-ft', 'Rear-Wheel Drive',
  'This magnificent 1972 Rolls-Royce Silver Shadow represents the pinnacle of British luxury motoring. Meticulously maintained by its previous owner, this exceptional example features matching numbers and comes with complete service history documentation dating back to delivery.',
  '["Original Paint", "Matching Numbers", "Complete Service History", "Power Windows", "Climate Control", "Leather Interior", "Walnut Trim", "Power Steering", "Disc Brakes", "Original Tool Kit"]',
  '{"engine": [{"name": "Engine Type", "value": "6.75L V8 OHV"}, {"name": "Horsepower", "value": "189 hp @ 4,000 rpm"}, {"name": "Torque", "value": "283 lb-ft @ 2,500 rpm"}, {"name": "Fuel System", "value": "Twin SU Carburetors"}, {"name": "Compression Ratio", "value": "8.0:1"}], "dimensions": [{"name": "Length", "value": "211.5\""}, {"name": "Width", "value": "71.5\""}, {"name": "Height", "value": "59.25\""}, {"name": "Wheelbase", "value": "119.5\""}, {"name": "Curb Weight", "value": "4,880 lbs"}], "performance": [{"name": "0-60 mph", "value": "10.9 seconds"}, {"name": "Top Speed", "value": "115 mph"}, {"name": "Fuel Economy", "value": "12 mpg combined"}, {"name": "Fuel Tank", "value": "24 gallons"}]}'
),
(
  2, 'Jaguar E-Type Roadster', 1967, 225000, '38,500', 'Petrol', 'Convertible', 'Manual', 'British Racing Green', 
  '/car-2.jpg', 
  'Concours Winner',
  null, null, null, null, null, null, null, null
),
(
  3, 'Mercedes-Benz 300SL Gullwing', 1956, 1450000, '51,200', 'Petrol', 'Coupe', 'Manual', 'Silver', 
  '/car-3.jpg', 
  'Museum Quality',
  null, null, null, null, null, null, null, null
),
(
  4, 'Aston Martin DB5', 1964, 895000, '45,800', 'Petrol', 'Coupe', 'Manual', 'Silver Birch', 
  '/car-4.jpg', 
  'Iconic Classic',
  null, null, null, null, null, null, null, null
),
(
  5, 'Ferrari 275 GTB', 1966, 2850000, '33,400', 'Petrol', 'Coupe', 'Manual', 'Rosso Corsa', 
  '/car-1.jpg', 
  'Investment Grade',
  null, null, null, null, null, null, null, null
),
(
  6, 'Porsche 356 Speedster', 1958, 425000, '62,100', 'Petrol', 'Convertible', 'Manual', 'Silver Metallic', 
  '/car-2.jpg', 
  'Matching Numbers',
  null, null, null, null, null, null, null, null
);

-- SEED DATA: TESTIMONIALS
insert into public.testimonials (id, name, role, location, avatar, image, content, rating) values
(1, 'James Richardson', 'Collector', 'London, UK', 'JR', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80', 'The team at Prestige Motors exceeded all expectations. They found me a pristine 1965 Ferrari 275 GTB that I had been searching for years. Their expertise and attention to detail is unmatched.', 5),
(2, 'Victoria Chen', 'Entrepreneur', 'Singapore', 'VC', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80', 'An exceptional experience from start to finish. The white-glove delivery service and comprehensive documentation made my first vintage car purchase absolutely seamless.', 5),
(3, 'Michael Sterling', 'Racing Enthusiast', 'Monaco', 'MS', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80', 'Prestige Motors understands what true collectors value. Their authentication process and provenance verification gave me complete confidence in my investment.', 5);

-- Reset sequence
select setval('vehicles_id_seq', (select max(id) from vehicles));
select setval('testimonials_id_seq', (select max(id) from testimonials));
