import type { User } from '@supabase/supabase-js';

export const useUser = () => {
  return useState<User | null>('user', () => null);
};
