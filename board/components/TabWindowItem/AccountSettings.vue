<template>
  <TabWindowItem :title="'Settings'">
    <template #actions></template>
    <template #content>
      <div class="d-flex justify-space-between align-center">
        <h4 class="text-subtitle-1 text-medium-emphasis">Do you want to sign out of this site?</h4>
        <v-btn color="green-accent-3" variant="outlined" @click="emit('sign-out')" style="width: 96px">
          Sign Out
        </v-btn>
      </div>
      <!-- <div class="d-flex justify-space-between align-center mt-3">
        <h4 class="text-subtitle-1 text-pink-accent-3">Delete all data from your account</h4>
        <v-btn color="pink-accent-3" variant="outlined" style="width: 96px">Delete</v-btn>
      </div> -->
    </template>
  </TabWindowItem>
</template>

<script setup lang="ts">
const emit = defineEmits(['sign-out', 'delete-account']);
</script>
