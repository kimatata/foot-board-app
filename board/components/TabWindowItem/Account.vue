<template>
  <TabWindowItem :title="'Account'">
    <template #actions>
      <v-btn size="small" color="teal-darken-2" @click="emit('update-profile')">Update Profile</v-btn>
    </template>
    <template #content>
      <div v-if="props.user">
        <v-text-field autocomplete="email" v-model="props.user.email" density="compact" variant="outlined" readonly />
        <v-text-field density="compact" v-model="props.username" label="Username" variant="outlined" />
        <v-text-field density="compact" v-model="props.avatar_path" label="Avatar URL" variant="outlined" />
      </div>
    </template>
  </TabWindowItem>
</template>

<script setup lang="ts">
const props = defineProps<{
  user: User | null;
}>();

const emit = defineEmits(['update-profile']);
</script>
