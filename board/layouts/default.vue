<template>
  <v-responsive class="border rounded">
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
          <v-btn prepend-icon="mdi-soccer" variant="text" to="/" nuxt>
            Games
          </v-btn>
          <v-btn prepend-icon="mdi-account-group" variant="text" to="/team" nuxt>
            Team
          </v-btn>
          <v-btn prepend-icon="mdi-information" variant="text" to="/about" nuxt>
            About
          </v-btn>
        </div>
        <v-btn :icon="theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night'" slim @click="onClick" />
      </v-app-bar>



      <v-bottom-navigation class="d-flex d-md-none">
        <v-btn to="/" nuxt>
          <v-icon>mdi-soccer</v-icon>
          <span>Games</span>
        </v-btn>

        <v-btn to="/team" nuxt>
          <v-icon>mdi-account-group</v-icon>
          <span>Team</span>
        </v-btn>

        <v-btn to="/about" nuxt>
          <v-icon>mdi-information</v-icon>
          <span>About</span>
        </v-btn>
      </v-bottom-navigation>

      <v-main>
        <v-container class="pa-0 h-100">
          <slot />
        </v-container>
      </v-main>
    </v-app>
  </v-responsive>
</template>

<script setup lang="ts">
const theme = useTheme()
function onClick() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
}
</script>