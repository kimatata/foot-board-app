<template>
  <v-container>
    <div class="d-flex align-center my-6">
      <h2>Teams</h2>
      <v-btn
        size="small"
        prepend-icon="mdi-plus"
        color="teal-darken-2"
        class="ms-8"
        @click="showTeamDialog"
        :disabled="!user"
      >
        New Team
      </v-btn>
    </div>
    <div v-if="sortedTeams.length > 0">
      <v-row>
        <v-col v-for="(team, index) in sortedTeams" :key="index" cols="12" md="4">
          <v-card :title="team.name" class="rounded elevation-3" :to="`teams/${team.id}`" link>
            <template v-slot:text>
              <div class="text-caption text-medium-emphasis mb-2 text-no-wrap overflow-hidden" style="min-height: 30px">
                {{ team.description }}
              </div>
              <div class="d-flex">
                <v-chip size="x-small" :color="team.is_public ? 'green' : 'default'" class="me-2">
                  {{ team.is_public ? 'Public' : 'Private' }}
                </v-chip>
                <v-chip size="x-small" class="me-2"> {{ 3 }} members </v-chip>
                <v-chip size="x-small" class="me-2">
                  {{ dayjs(team.created_at).format('YYYY/MM/DD') }}
                </v-chip>
              </div>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-empty-state
      v-else
      icon="mdi-magnify"
      text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
      title="We couldn't find a match."
    >
    </v-empty-state>
  </v-container>

  <TeamDialog
    ref="teamDialog"
    :mode="'new'"
    :is-show="showsTeamDialog"
    @update-dialog="updateTeamDialog"
    @submit="createTeam"
  />
</template>

<script setup lang="ts">
import type { Team } from '~/types/base';
import dayjs from 'dayjs';
const teams = ref<Team[]>([]);
const user = useUser();
const { $supabase } = useNuxtApp();

onMounted(async () => {
  await fetchTeams();
});

const sortedTeams = computed(() => {
  return teams.value.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
});

const fetchTeams = async () => {
  const { data, error } = await $supabase.from('teams').select();
  if (error) {
    console.error('Supabase error:', error);
    return [];
  } else {
    teams.value = data || [];
  }
};

/**
 * Team Dialog
 */
const teamDialog = ref();
const showsTeamDialog = ref(false);
const showTeamDialog = () => {
  teamDialog.value.init(null);
  showsTeamDialog.value = true;
};
const updateTeamDialog = (shows: boolean) => {
  showsTeamDialog.value = shows;
};
const createTeam = async (name: string, description: string, isPublic: boolean) => {
  if (!user.value) {
    return;
  }

  showsTeamDialog.value = false;
  const { data, error } = await $supabase
    .from('teams')
    .insert({ name: name, description: description, user_uuid: user.value.id, is_public: isPublic })
    .select();

  if (data && data.length > 0) {
    teams.value.push(data[0]);
  } else {
    console.error('failed to create team', error);
  }
};
</script>
