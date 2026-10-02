import { createClient } from "@supabase/supabase-js";

// ==============================================================================
// SUPABASE CLIENT CONFIGURATION
// Paste your Supabase Project URL and Public Anon Key below:
// Your Supabase Project ID: oubfjolxhvkujjjnzvol
// ==============================================================================

// 1. Paste your Supabase Project URL here:
const SUPABASE_URL = "{{SUPABASE_URL}}"; // e.g. "https://sqcreimqdrlaxbykrnzy.supabase.co"

// 2. Paste your Supabase Public/Anon Key here:
const SUPABASE_PUBLIC_KEY = "{{SUPABASE_KEY}}"; // e.g. "sb_publishable_..."

// Export the initialized Supabase client:
export const supabase = createClient(
  SUPABASE_URL.startsWith("{{") ? "https://sqcreimqdrlaxbykrnzy.supabase.co" : SUPABASE_URL,
  SUPABASE_PUBLIC_KEY.startsWith("{{") ? "sb_publishable_uXIdmQNVJhuwVW0W2-BQxQ_Ko-r34jW" : SUPABASE_PUBLIC_KEY
);

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
