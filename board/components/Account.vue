<template>
  <v-container>
    <v-card v-if="user" class="pa-6 mx-auto" max-width="448" rounded="lg">
      <h4>Account</h4>
      <div class="mt-3 text-caption text-medium-emphasis">Email</div>
      <v-text-field autocomplete="email" hide-details v-model="user.email" density="compact" disabled
        variant="outlined" />

      <div class="mt-3 text-caption text-medium-emphasis">User Name</div>
      <v-text-field autocomplete="name" v-model="username" density="compact" variant="outlined" />
      <v-btn color="teal-darken-2" :loading="loading" @click="updateProfile">Update Profile</v-btn>
    </v-card>

    <!-- <v-card class="mx-auto mt-8 pa-6" max-width="448" rounded="lg">
      <h4 class="mt-3">Your teams</h4>
    </v-card> -->

    <v-card class="mx-auto mt-8 pa-6" max-width="448" rounded="lg">
      <h4 class="my-3">Other Actions</h4>
      <v-btn color="teal-darken-2" variant="outlined" @click="signOut">Sign Out</v-btn>
      <v-btn color="error" variant="outlined" class="ms-3">Delete Account</v-btn>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import type { User } from '@supabase/supabase-js'
const { $supabase } = useNuxtApp()

const user = ref<User | null>(null)
const loading = ref(false)
const username = ref('')
const avatar_path = ref('')

onMounted(async () => {
  getUser()
  if (user.value) {
    fetchUser(user.value.id)
  }
})

const getUser = async () => {
  const { data, error } = await $supabase.auth.getSession()
  if (error || !data.session) {
    await navigateTo('account/signin')
    return;
  }

  user.value = data.session.user
}

const fetchUser = async (userId: string) => {
  const { data } = await $supabase
    .from('profiles')
    .select(`username, avatar_url`)
    .eq('id', userId)
    .single()

  if (data) {
    username.value = data.username
    avatar_path.value = data.avatar_url
  }
}

const updateProfile = async () => {
  // try {
  //   loading.value = true
  //   const user = useSupabaseUser()

  //   const updates = {
  //     id: user.value.id,
  //     username: username.value,
  //     website: website.value,
  //     avatar_url: avatar_path.value,
  //     updated_at: new Date(),
  //   }

  //   const { error } = await $supabase.from('profiles').upsert(updates, {
  //     returning: 'minimal', // Don't return the value after inserting
  //   })
  //   if (error) throw error
  // } catch (error) {
  //   alert(error.message)
  // } finally {
  //   loading.value = false
  // }
}

const signOut = async () => {
  try {
    loading.value = true
    const { error } = await $supabase.auth.signOut()
    if (error) {
      throw error
    } else {
      user.value = null
      navigateTo('/account/signin')
    }
  } catch (error: any) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>