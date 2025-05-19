// src/lib/supabase.ts
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabaseInstance: SupabaseClient | null = null;

if (!supabaseUrl || typeof supabaseUrl !== 'string' || !supabaseUrl.startsWith('https://')) {
  console.error(
    'CRITICAL: Supabase URL is missing, not a string, or does not start with "https://". ' +
    'Make sure NEXT_PUBLIC_SUPABASE_URL is correctly set in your .env.local file (e.g., https://your-project-id.supabase.co) ' +
    'and the server is restarted.'
  );
} else if (!supabaseAnonKey || typeof supabaseAnonKey !== 'string' || supabaseAnonKey.length < 50) { // Anon keys are typically long
  console.error(
    'CRITICAL: Supabase Anon Key is missing, not a string, or seems too short. ' +
    'Make sure NEXT_PUBLIC_SUPABASE_ANON_KEY is correctly set in your .env.local file ' +
    'and the server is restarted.'
  );
} else {
  try {
    // Attempt to create the client only if both URL and Key seem plausible
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  } catch (error) {
    // This catch block will be hit if createClient itself throws, e.g., due to "Invalid URL"
    console.error(
        "CRITICAL: Error creating Supabase client. This often means the NEXT_PUBLIC_SUPABASE_URL in your .env.local, " +
        "although starting with 'https://', is still not a valid URL format. " +
        "Please meticulously check it for typos, extra spaces, or incorrect characters (e.g., 'https://<your-project-id>.supabase.co'). " +
        "Original error:", error
    );
    // supabaseInstance will remain null
  }
}

if (!supabaseInstance) {
    // This log will appear if any of the above checks fail or if createClient throws an error.
    console.error(
        "Supabase client could NOT be initialized. This will affect authentication and any other Supabase-dependent features. " +
        "Please meticulously check your .env.local file for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY. " +
        "Ensure the URL is complete and valid (e.g., https://your-project-id.supabase.co) and there are no typos or extra spaces. " +
        "Remember to RESTART your development server after any changes to .env.local."
    );
}

export const supabase = supabaseInstance;

// Type guard for checking if supabase is initialized
export function isSupabaseInitialized(client: SupabaseClient | null): client is SupabaseClient {
  return client !== null;
}
