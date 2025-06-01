<template>
  <TabWindowItem :title="'Account'">
    <template #actions>
      <v-btn size="small" color="teal-darken-2" prepend-icon="mdi-pencil" @click="showUserDialog"> Edit Profile </v-btn>
    </template>
    <template #content>
      <div v-if="props.user">
        <v-table class="rounded elevation-3 tab-table">
          <tbody>
            <tr>
              <th>Account Email</th>
              <td>{{ props.user.email }}</td>
            </tr>
            <tr>
              <th>Account Name</th>
              <td>{{ props.user.user_metadata.name }}</td>
            </tr>
            <tr>
              <th>Account Created at</th>
              <td>{{ dayjs(props.user.created_at).format('YYYY/MM/DD') }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </template>
  </TabWindowItem>

  <UserDialog ref="userDialog" :is-show="showsUserDialog" @update-dialog="updateUserDialog" @submit="updateProfile" />
</template>

<script setup lang="ts">
import type { User } from '@supabase/supabase-js';
import dayjs from 'dayjs';
const { $supabase } = useNuxtApp();
const props = defineProps<{
  user: User | null;
}>();

const emit = defineEmits(['on-update-user']);

/**
 * User Dialog
 */
const userDialog = ref();
const showsUserDialog = ref(false);
const showUserDialog = () => {
  userDialog.value.init(props.user);
  showsUserDialog.value = true;
};
const updateUserDialog = (shows: boolean) => {
  showsUserDialog.value = shows;
};
const updateProfile = async (newName: string) => {
  const { data, error } = await $supabase.auth.updateUser({
    data: { name: newName },
  });
  if (data) {
    emit('on-update-user', data.user);
    showsUserDialog.value = false;
  } else if (error) {
    console.error('Error updating user:', error);
  }
};
</script>
