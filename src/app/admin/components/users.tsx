// In your types file (@/app/types)
import { User } from '@supabase/supabase-js';

// Option 2a: Extend the Supabase User type
// export interface Users extends User {
//   email: string; // Override to make email required
// }

// Option 2b: Or create a more specific type if you only need certain fields
export interface Users {
  id: string;
  email: string; 
  created_at: string;
  user_metadata?: {
    full_name?: string;
  };
  raw_user_meta_data?: {
    full_name?: string;
  };
  // Add other required properties from User type
  app_metadata: Record<string, any>;
  aud: string;
  // Add any other properties you need from the User type
}