import { createClient } from "@supabase/supabase-js";

// ==============================================================================
// SUPABASE CLIENT CONFIGURATION
// Paste your Supabase Project URL and Public Anon Key below:
// Your Supabase Project ID: sqcreimqdrlaxbykrnzy
// ==============================================================================

const SUPABASE_URL = (typeof process !== "undefined" && process.env && (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL))
  ? (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL)
  : (typeof window !== "undefined" && window.ENV && (window.ENV.NEXT_PUBLIC_SUPABASE_URL || window.ENV.SUPABASE_URL))
    ? (window.ENV.NEXT_PUBLIC_SUPABASE_URL || window.ENV.SUPABASE_URL)
    : "https://sqcreimqdrlaxbykrnzy.supabase.co";

const SUPABASE_PUBLIC_KEY = (typeof process !== "undefined" && process.env && (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY))
  ? (process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY)
  : (typeof window !== "undefined" && window.ENV && (window.ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY || window.ENV.SUPABASE_ANON_KEY))
    ? (window.ENV.NEXT_PUBLIC_SUPABASE_ANON_KEY || window.ENV.SUPABASE_ANON_KEY)
    : "";

// Export the initialized Supabase client:
export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);

// Helper for "Continue with Google" OAuth Login
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: typeof window !== "undefined" ? `${window.location.origin}/` : "/"
    }
  });
  if (error) throw error;
  return data;
}
