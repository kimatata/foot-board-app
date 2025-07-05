<template>
  <AuthCard>
    <div class="d-flex justify-space-between">
      <h4>{{ props.authMode === 'signup' ? 'Resister Account' : 'Sign in' }}</h4>
      <v-btn
        append-icon="mdi-chevron-right"
        variant="text"
        size="small"
        color="primary"
        :to="props.authMode === 'signup' ? '/account/signin' : '/account/signup'"
        nuxt
      >
        {{ props.authMode === 'signup' ? 'Sign in?' : 'Sign up?' }}
      </v-btn>
    </div>

    <v-card v-show="message" class="mt-3" color="pink-accent-3" variant="tonal">
      <v-card-text class="text-caption">
        {{ message }}
      </v-card-text>
    </v-card>

    <v-form ref="form" @submit.prevent="submit">
      <div class="mt-3 text-subtitle-1 text-medium-emphasis">Account</div>
      <v-text-field
        autocomplete="email"
        v-model="email"
        :rules="emailRules"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
      />

      <div class="d-flex justify-space-between align-center">
        <div class="text-subtitle-1 text-medium-emphasis">Password</div>
        <NuxtLink
          v-if="props.authMode === 'signin'"
          class="text-caption text-decoration-none text-primary"
          :to="'/account/forgot-password'"
        >
          Forgot sign in password?
        </NuxtLink>
      </div>
      <v-text-field
        :autocomplete="props.authMode === 'signup' ? 'new-password' : 'current-password'"
        v-model="password"
        :rules="passwordRules"
        :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
        :type="showPassword ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="showPassword = !showPassword"
      />

      <div v-if="props.authMode === 'signup'">
        <div class="text-subtitle-1 text-medium-emphasis">Password (Confirm)</div>
        <v-text-field
          autocomplete="new-password"
          v-model="passwordConfirm"
          :rules="passwordRules"
          :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
          :type="showPassword ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password (confirm)"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="showPassword = !showPassword"
        />
      </div>

      <v-btn class="mt-8" color="primary" size="large" block :loading="loading" type="submit">
        {{ props.authMode === 'signup' ? 'Sign up' : 'Sign in' }}
      </v-btn>
    </v-form>
  </AuthCard>
</template>

<script setup lang="ts">
import type { AuthMode } from '~/types/base';

const { $supabase } = useNuxtApp();

type Props = {
  authMode: AuthMode;
};
const props = defineProps<Props>();

const form = ref();
const loading = ref(false);
const email = ref('');
const showPassword = ref(false);
const password = ref('');
const passwordConfirm = ref('');
const message = ref<string>('');
const emailRules = [(v: string) => !!v || 'Email is required'];
const passwordRules = [(v: string) => (v && v.length >= 6) || 'Password must be 6 characters or more'];

const submit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return;
  }

  if (props.authMode === 'signup' && password.value != passwordConfirm.value) {
    message.value = 'password mismatch';
    return;
  }

  loading.value = true;
  if (props.authMode === 'signup') {
    await signUp();
  } else {
    await signIn();
  }
  loading.value = false;
};

const signUp = async () => {
  const { error } = await $supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    message.value = 'Sign up failed';
  } else {
    navigateTo('/account/check-email');
  }
};

const signIn = async () => {
  const { error } = await $supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });
  if (error) {
    message.value = 'Sign in failed';
  } else {
    navigateTo('/account');
  }
};
</script>
