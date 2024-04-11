import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_ANON_KEY, SUPABASE_URL } from "@/config/constants";
import { Database } from "@/supabase/functions/_shared/types";

/* TODO: generate types for supasbase with the following command:
npx supabase gen types typescript --local > types/supabase.ts

Then, add <Database> after createClient to enable typescript support for the db schema.
*/
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
/*  */
