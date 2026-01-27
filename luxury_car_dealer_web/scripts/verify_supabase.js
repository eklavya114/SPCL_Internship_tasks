
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

// Load env explicitly since we are running this script with node, outside of vite
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

console.log('Testing connection to:', supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Error: Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testConnection() {
    try {
        const { count, error } = await supabase.from('vehicles').select('*', { count: 'exact', head: true });

        if (error) {
            console.error('Connection FAILED:', error.message);
            process.exit(1);
        } else {
            console.error('Connection SUCCESSFUL!');
            console.log(`Successfully connected. Found ${count} vehicles in the database.`);

            if (count === 0) {
                console.log('WARNING: The vehicles table exists but is empty.');
            }
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        process.exit(1);
    }
}

testConnection();
