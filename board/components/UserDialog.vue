<template>
  <v-dialog :model-value="props.isShow" max-width="500" @update:model-value="closeDialog">
    <v-card title="Update User">
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <div class="px-3">
            <div class="text-subtitle-1 text-medium-emphasis">Name</div>
            <v-text-field v-model="name" density="compact" variant="outlined" :rules="nameRules" />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancel" @click="closeDialog" />
          <v-btn text="Update" color="green-accent-3" type="submit" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { User } from '@supabase/supabase-js';

type Props = {
  isShow: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(['submit', 'update-dialog']);

const form = ref();
const name = ref('');
const nameRules = [(v: string) => !!v || 'Name is required'];

const init = (user: User | null) => {
  if (user) {
    name.value = user.user_metadata.name;
  } else {
    name.value = '';
  }
};
defineExpose({ init });

const submit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return;
  }

  emit('submit', name.value);
};

const closeDialog = () => {
  emit('update-dialog', false);
};
</script>
