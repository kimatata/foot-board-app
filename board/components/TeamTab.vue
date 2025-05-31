<template>
  <v-container class="d-flex justify-center">
    <div>
      <div class="d-flex justify-space-between align-center my-6">
        <h2>
          Team
        </h2>
        <div>
          <v-btn size="small" prepend-icon="mdi-pencil" color="teal-darken-2" class="me-2" @click="showTeamDialog">
            Update Team
          </v-btn>
          <v-btn size="small" prepend-icon="mdi-delete" color="error" variant="outlined">
            Delete Team
          </v-btn>
        </div>
      </div>
      <div v-if="props.team">
        <v-table class="rounded elevation-3 tab-table">
          <tbody>
            <tr>
              <th>Team name</th>
              <td>{{ props.team.name }}</td>
            </tr>
            <tr>
              <th>Team description</th>
              <td>{{ props.team.description }}</td>
            </tr>
            <tr>
              <th>Team Publicity</th>
              <td>{{ props.team.is_public ? 'Public' : 'Private' }}</td>
            </tr>
            <tr>
              <th>Team Owner</th>
              <td></td>
            </tr>
            <tr>
              <th>Team Created at</th>
              <td>{{ dayjs(props.team.created_at).format('YYYY/MM/DD') }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
    </div>
  </v-container>
  <TeamDialog ref="teamDialog" :mode="'edit'" :is-show="showsTeamDialog" @update-dialog="updateTeamDialog"
    @submit="updateTeam" />
</template>

<script setup lang="ts">
import type { Team } from '~/types/base';
import dayjs from 'dayjs';

type Props = {
  team: Team | null;
}
const props = defineProps<Props>()
const emit = defineEmits(['update-team'])

/**
 * Team Dialog
 */
const teamDialog = ref()
const showsTeamDialog = ref(false)
const showTeamDialog = () => {
  teamDialog.value.init(props.team);
  showsTeamDialog.value = true;
}
const updateTeamDialog = (shows: boolean) => {
  showsTeamDialog.value = shows;
}
const updateTeam = (name: string, description: string, isPublic: boolean) => {
  emit('update-team', name, description, isPublic)
  showsTeamDialog.value = false;
}
</script>