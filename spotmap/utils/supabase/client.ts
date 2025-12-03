"use client";

import { useMemo } from "react";
import { createBrowserClient } from "@supabase/ssr";

import type { Database } from "@/types/database.types";

import { getSupabaseConfig } from "./config";

export function createSupabaseBrowserClient() {
  const { supabaseUrl, supabaseAnonKey } = getSupabaseConfig();

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey);
}

/**
 * Memoized helper hook to avoid recreating the Supabase client in every render.
 */
export function useSupabaseBrowserClient() {
  return useMemo(() => createSupabaseBrowserClient(), []);
}
