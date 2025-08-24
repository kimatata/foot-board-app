import { createClient } from '@supabase/supabase-js';

export default defineNuxtPlugin(async (nuxtApp) => {
  const config = useRuntimeConfig();
  const supabaseUrl = config.public.supabaseUrl;
  const supabaseKey = config.public.supabaseKey;

  // init supabase client
  const supabase = createClient(supabaseUrl, supabaseKey);
  nuxtApp.provide('supabase', supabase);

  // init supabase user
  const user = useUser();
  const { data, error } = await supabase.auth.getSession();
  if (error || !data.session) {
    return;
  }
  user.value = data.session.user;
});
