<template>
  <v-container>
    <v-card class="px-6 py-6 mx-auto rounded elevation-3" max-width="344">
      <div class="d-flex justify-space-between align-center">
        <h3>{{ mode === 'signup' ? 'Sign up' : 'Sign in' }}</h3>
        <v-btn variant="plain" size="small" :to="mode === 'signup' ? '/account/signin' : '/account/signup'" nuxt>
          {{ mode === 'signup' ? 'Sign in?' : 'Sign up?' }}
        </v-btn>
      </div>

      <p class="mt-2 mb-4 font-weight-light">Enter your name and email</p>
      <v-form ref="form">
        <v-text-field density="compact" v-model="email" variant="outlined" hide-details
          :rules="[v => !!v || 'email is required']" label="Email" />
        <v-btn class="mt-3" color="blue-darken-2" type="submit" block :disabled="loading" @click="validate">
          Submit
        </v-btn>
      </v-form>
    </v-card>
  </v-container>

  <v-snackbar-queue v-model="messages" color="error"></v-snackbar-queue>
</template>

<script setup lang="ts">
import type { AuthMode } from '~/types/base';

const { $supabase } = useNuxtApp()

type Props = {
  initAuthMode: AuthMode,
}
const props = defineProps<Props>();

const mode = ref<AuthMode>(props.initAuthMode)
const form = ref()
const loading = ref(false)
const email = ref('')
const messages = ref<string[]>([])

const validate = async () => {
  const { valid } = await form.value.validate()
  if (!valid) {
    return;
  }

  if (mode.value === 'signup') {
    await signUp()
  } else {
    await signIn()
  }
}

const signUp = async () => {
  loading.value = true
  const { data, error } = await $supabase.auth.signUp({
    email: 'example@email.com',
    password: 'example-password',
  })
  if (error) {
    messages.value.push('Sign up failed')
  }
  loading.value = false
}

const signIn = async () => {
  loading.value = true
  const { data, error } = await $supabase.auth.signInWithPassword({
    email: 'example@email.com',
    password: 'example-password',
  })
  if (error) {
    messages.value.push('Sign in failed')
  }
  loading.value = false
}

</script>
