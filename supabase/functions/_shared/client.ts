import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

import { Database } from "./types.ts";

export function supabaseClient(req: Request) {
  return createClient<Database>(
    Deno.env.get("LOCAL_SUPABASE_URL") ?? Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("LOCAL_SUPABASE_ANON_KEY") ??
      "" ??
      Deno.env.get("SUPABASE_ANON_KEY") ??
      "",
  );
}
