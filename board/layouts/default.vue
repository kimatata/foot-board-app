<template>
  <v-responsive>
    <v-app :theme="theme">
      <v-app-bar>
        <template v-slot:prepend>
          <NuxtLink to="/" class="d-flex align-center text-decoration-none">
            <img class="ps-2" :height="30" src="/icon-192.png" />
            <Banner />
          </NuxtLink>
        </template>
        <v-spacer></v-spacer>

        <div class="d-none d-md-flex">
          <v-btn prepend-icon="mdi-vector-circle" variant="text" to="/" nuxt> Teams </v-btn>
          <v-btn prepend-icon="mdi-account-circle-outline" variant="text" to="/account" nuxt> Account </v-btn>
        </div>
        <v-btn :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" slim @click="onClick" />
      </v-app-bar>

      <v-bottom-navigation class="d-flex d-md-none">
        <v-btn to="/" nuxt>
          <v-icon>mdi-vector-circle</v-icon>
          <span>Teams</span>
        </v-btn>

        <v-btn to="/account" nuxt>
          <v-icon>mdi-account-circle-outline</v-icon>
          <span>Account</span>
        </v-btn>
      </v-bottom-navigation>

      <v-snackbar-queue v-model="messages" />

      <v-main>
        <slot />
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
const user = useUser();
const theme = useTheme();
const messages = useMessages();
const { $supabase } = useNuxtApp();

const onClick = () => {
  theme.value = theme.value === 'light' ? 'dark' : 'light';
};

onBeforeMount(async () => {
  getUser();
});

const getUser = async () => {
  const { data, error } = await $supabase.auth.getSession();
  if (error || !data.session) {
    return;
  }

  user.value = data.session.user;
};
</script>
