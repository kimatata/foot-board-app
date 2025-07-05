<template>
  <TabWindowItem :title="'Team'">
    <template #actions>
      <v-btn size="small" prepend-icon="mdi-pencil" color="primary" class="me-2" @click="showTeamDialog">
        Update Team
      </v-btn>
      <v-btn
        size="small"
        prepend-icon="mdi-delete"
        color="pink-accent-3"
        variant="outlined"
        @click="showTeamDeleteDialog"
      >
        Delete Team
      </v-btn>
    </template>
    <template #content>
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
    </template>
  </TabWindowItem>

  <TeamDialog
    ref="teamDialog"
    :mode="'edit'"
    :is-show="showsTeamDialog"
    @update-dialog="updateTeamDialog"
    @submit="updateTeam"
  />

  <TeamDeleteDialog
    :is-show="showsTeamDeleteDialog"
    @delete="deleteTeam"
    @update-dialog="showsTeamDeleteDialog = false"
  />
</template>

<script setup lang="ts">
import type { Team } from '~/types/base';
import dayjs from 'dayjs';

type Props = {
  team: Team | null;
};
const props = defineProps<Props>();
const emit = defineEmits(['update-team', 'delete-team']);

/**
 * Team Dialog
 */
const teamDialog = ref();
const showsTeamDialog = ref(false);
const showTeamDialog = () => {
  teamDialog.value.init(props.team);
  showsTeamDialog.value = true;
};
const updateTeamDialog = (shows: boolean) => {
  showsTeamDialog.value = shows;
};
const updateTeam = (name: string, description: string, isPublic: boolean) => {
  emit('update-team', name, description, isPublic);
  showsTeamDialog.value = false;
};

/**
 * Team Delete Dialog
 */
const showsTeamDeleteDialog = ref(false);
const showTeamDeleteDialog = () => {
  showsTeamDeleteDialog.value = true;
};
const deleteTeam = () => {
  emit('delete-team');
  showsTeamDeleteDialog.value = false;
};
</script>
