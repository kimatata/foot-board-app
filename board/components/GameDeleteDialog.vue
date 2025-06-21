<template>
  <v-dialog :model-value="props.isShow" max-width="500" @update:model-value="closeDialog">
    <v-card title="Delete Game">
      <v-card-text>
        <div class="text-subtitle-1 text-medium-emphasis">Are you sure you want to delete this game?</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn text="Cancel" @click="closeDialog" class="w-25" />
        <v-btn variant="elevated" text="Delete" color="pink-accent-3" @click="emit('delete')" class="w-25" />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
type Props = {
  isShow: boolean;
};
const props = defineProps<Props>();
const emit = defineEmits(['delete', 'update-dialog']);

const closeDialog = () => {
  emit('update-dialog', false);
};
</script>
