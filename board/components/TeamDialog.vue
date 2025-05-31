<template>
  <v-dialog :model-value="props.isShow" max-width="500" @update:model-value="closeDialog">
    <v-card :title="mode === 'new' ? 'Create Team' : 'Update Team'">
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <div class="px-3">
            <div class="text-subtitle-1 text-medium-emphasis">Name</div>
            <v-text-field v-model="name" density="compact" variant="outlined" :rules="nameRules" />

            <div class="text-subtitle-1 text-medium-emphasis">Public</div>
            <div class="text-caption text-medium-emphasis">Making a team public makes it visible to users who are not
              team
              members.</div>
            <v-checkbox label="Public" v-model="isPublic" />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancel" @click="closeDialog" />
          <v-btn :text="props.mode === 'new' ? 'Create' : 'Update'" color="teal-darken-2" type="submit" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Team } from '~/types/base';

type Props = {
  isShow: boolean,
  mode: 'new' | 'edit',
  team?: Team
}
const props = defineProps<Props>()
const emit = defineEmits(['submit', 'update-dialog'])

const form = ref()
const name = ref("")
const isPublic = ref(false)
const nameRules = [
  (v: string) => !!v || 'Name is required',
]

const submit = async () => {
  const { valid } = await form.value.validate()
  if (!valid) {
    return;
  }

  emit('submit', name.value, isPublic.value)

  // 初期化
  name.value = ""
  isPublic.value = false
}

const closeDialog = () => {
  emit('update-dialog', false)
}
</script>