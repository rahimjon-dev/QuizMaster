import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SUPABASE_URL = 'https://mnlhzkzsfibkujcfcqnh.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable__0zm_mdDOdomO6SdoJJVkg_BaMTVHOL';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
