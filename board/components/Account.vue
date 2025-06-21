<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col>
        <div class="d-flex flex-row">
          <v-tabs v-model="tab" direction="vertical" class="elevation-3 h-screen">
            <v-tab value="account">
              <v-icon icon="mdi-account-circle-outline" class="me-1" />
              Account
            </v-tab>

            <v-tab value="settings">
              <v-icon icon="mdi-cog" class="me-1" />
              Settings
            </v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab" class="w-100">
            <v-tabs-window v-model="tab">
              <v-tabs-window-item :transition="false" :reverse-transition="false" value="account">
                <TabWindowItemAccount :user="user" @on-update-user="onUpdateUser" />
              </v-tabs-window-item>

              <v-tabs-window-item :transition="false" :reverse-transition="false" value="settings">
                <TabWindowItemAccountSettings @sign-out="signOut" @delete-account="deleteAccount" />
              </v-tabs-window-item>
            </v-tabs-window>
          </v-tabs-window>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { User } from '@supabase/supabase-js';
const { $supabase } = useNuxtApp();
const messages = useMessages();

const tab = ref('account');
const user = ref<User | null>(null);
const loading = ref(false);
const username = ref('');
const avatar_path = ref('');

onMounted(async () => {
  getUser();
  if (user.value) {
    fetchUser(user.value.id);
  }
});

const getUser = async () => {
  const { data, error } = await $supabase.auth.getSession();
  if (error || !data.session) {
    await navigateTo('account/signin');
    return;
  }

  user.value = data.session.user;
};

const fetchUser = async (userId: string) => {
  const { data } = await $supabase.from('profiles').select(`username, avatar_url`).eq('id', userId).single();

  if (data) {
    username.value = data.username;
    avatar_path.value = data.avatar_url;
  }
};

const onUpdateUser = (newUser: User) => {
  user.value = newUser;
};

const signOut = async () => {
  try {
    loading.value = true;
    const { error } = await $supabase.auth.signOut();
    if (error) {
      throw error;
    } else {
      user.value = null;
      messages.value.push({
        text: 'You have signed out successfully',
        color: 'green-accent-3',
      });
      navigateTo('/account/signin');
    }
  } catch (error: any) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
};

const deleteAccount = async () => {
  console.log('Delete account');
};
</script>
