<template>
  <TabWindowItem :title="'Settings'">
    <template #actions>
      <v-btn size="small" color="teal-darken-2" variant="outlined" @click="emit('sign-out')">Sign Out</v-btn>
      <v-btn size="small" color="error" variant="outlined" class="ms-3">Delete Account</v-btn>
    </template>
    <template #content> nothing </template>
  </TabWindowItem>
</template>

<script setup lang="ts">
const emit = defineEmits(['sign-out', 'delete-account']);
</script>
