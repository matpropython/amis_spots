import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { getSupabaseConfig } from "../utils/supabase/config.ts";

const envPath = resolve(process.cwd(), ".env.local");
const envContent = readFileSync(envPath, "utf-8");

for (const line of envContent.split(/\r?\n/)) {
  if (!line || line.trim().startsWith("#")) continue;
  const [key, ...rest] = line.split("=");
  if (!key) continue;
  process.env[key.trim()] = rest.join("=").trim();
}

console.log(getSupabaseConfig());
