<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col>
        <div class="d-flex flex-row">
          <v-tabs v-model="tab" direction="vertical" class="elevation-3 h-screen">
            <v-tab value="games">
              <v-icon icon="mdi-text-box-edit" class="me-1" />
              Game results
            </v-tab>

            <v-tab value="members">
              <v-icon icon="mdi-account-group" class="me-1" />
              Members
            </v-tab>

            <v-tab value="data">
              <v-icon icon="mdi-database" class="me-1" />
              Data
            </v-tab>

            <v-tab value="settings">
              <v-icon icon="mdi-cog" class="me-1" />
              Settings
            </v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab" class="w-100">
            <v-tabs-window v-model="tab">
              <template v-if="team">
                <v-tabs-window-item :transition="false" :reverse-transition="false" value="games">
                  <TabWindowItemGames
                    :team-id="team.id"
                    :games="games"
                    @create-new-game="createNewGame"
                    @update-game="updateGame"
                    @delete-game="deleteGame"
                  />
                </v-tabs-window-item>

                <v-tabs-window-item :transition="false" :reverse-transition="false" value="members">
                  Members
                </v-tabs-window-item>

                <v-tabs-window-item :transition="false" :reverse-transition="false" value="data">
                  Data
                </v-tabs-window-item>

                <v-tabs-window-item :transition="false" :reverse-transition="false" value="settings">
                  <TabWindowItemTeam :team="team" @update-team="updateTeam" @delete-team="deleteTeam" />
                </v-tabs-window-item>
              </template>
              <template v-else> loading... </template>
            </v-tabs-window>
          </v-tabs-window>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import type { Game, Team } from '~/types/base';

const route = useRoute();
const user = useUser();
const { $supabase } = useNuxtApp();
const tab = ref('home');

onMounted(() => {
  init();
});
watch(user, () => {
  init();
});

const init = async () => {
  const paramId = route.params.teamId;
  if (!paramId || Array.isArray(paramId)) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
  }

  // featch team
  const teamId = Number(paramId);
  await fetchTeam(teamId);

  // fetch games
  const data = await fetchGames(paramId);
  games.value = data;
};

/**
 * Team
 */
const team = ref<Team | null>(null);
const fetchTeam = async (teamId: number) => {
  if (!user.value) {
    return;
  }

  const { data, error } = await $supabase.from('teams').select().eq('id', teamId).single();

  if (data) {
    team.value = data;
  } else {
    console.error('Team not found', error);
  }
};

const updateTeam = async (name: string, description: string, isPublic: boolean) => {
  if (!user.value || !team.value) {
    return;
  }

  const { data, error } = await $supabase
    .from('teams')
    .update({ name: name, description: description, user_uuid: user.value.id, is_public: isPublic })
    .eq('id', team.value.id)
    .select();

  if (data && data.length > 0) {
    team.value = data[0];
  } else {
    console.error('failed to update team', error);
  }
};

const deleteTeam = async () => {
  if (!user.value || !team.value) {
    return;
  }

  const { error } = await $supabase.from('teams').delete().eq('id', team.value.id);
  if (error) {
    console.error('failed to delete team', error);
  } else {
    navigateTo('/');
  }
};

/**
 * Games
 */
const games = ref<Game[]>([]);
const fetchGames = async (teamId: string) => {
  const { data, error } = await $supabase.from('games').select().eq('team_id', teamId);
  if (error) {
    console.error('Supabase error:', error);
    return [];
  }
  return data;
};

const createNewGame = async () => {
  if (!team.value) {
    console.error('Team is not set');
    return;
  }

  const { data, error } = await $supabase
    .from('games')
    .insert({
      name: 'untitled-game',
      team_id: team.value.id,
      memo: '',
      date: new Date().toISOString(),
      formation: 'not-set',
      opponent: '',
      match_time: 0,
      match_result: 'draw',
    })
    .select();
  if (data && data.length > 0) {
    games.value.push(data[0]);
  } else {
    console.error('failed to create game', error);
  }
};

const updateGame = async (newGame: Game) => {
  if (!user.value) {
    return;
  }

  const { data, error } = await $supabase
    .from('games')
    .update({
      name: newGame.name,
      memo: newGame.memo,
      opponent: newGame.opponent,
      date: newGame.date,
      formation: newGame.formation,
      match_time: newGame.match_time,
      match_result: newGame.match_result,
      starting_members: newGame.starting_members,
      scorers: newGame.scorers,
      assists: newGame.assists,
      warnings: newGame.warnings,
      substitutions: newGame.substitutions,
    })
    .eq('id', newGame.id)
    .select();

  if (error) {
    console.error('Failed to update game:', error);
  } else {
    const index = games.value.findIndex((game) => game.id === newGame.id);
    games.value[index] = data[0];
  }
};

const deleteGame = async (gameId: number) => {
  if (!user.value) {
    return;
  }

  const { error } = await $supabase.from('games').delete().eq('id', gameId);
  if (error) {
    console.error('Failed to delete game:', error);
  } else {
    games.value = games.value.filter((game) => game.id !== gameId);
  }
};
</script>
