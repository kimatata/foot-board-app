<template>
  <DetailPageBase :title="'Game'" :back-button-path="`/teams/${route.params.teamId}`">
    <template #actions>
      <v-btn size="small" prepend-icon="mdi-content-save-outline" color="green-accent-3" @click="updateGame">
        Update
      </v-btn>
    </template>
    <template #content>
      <div v-if="!fetching">
        <div class="px-3">
          <div class="text-subtitle-1 text-medium-emphasis">Name</div>
          <v-text-field v-model="game.name" density="compact" variant="outlined" />

          <div class="text-subtitle-1 text-medium-emphasis">Memo</div>
          <v-text-field v-model="game.memo" density="compact" variant="outlined" />

          <div class="text-subtitle-1 text-medium-emphasis">Opponent</div>
          <v-text-field v-model="game.opponent" density="compact" variant="outlined" />

          <div class="text-subtitle-1 text-medium-emphasis">Date</div>
          <v-date-picker v-model="game.date" />

          <v-select label="Match Result" v-model="game.esult" :items="resultItems" variant="outlined" />

          <v-select label="Formation" v-model="game.formation" :items="formationItems" variant="outlined" />

          <div class="text-subtitle-1 text-medium-emphasis">Match Time (minutes)</div>
          <v-number-input
            v-model="game.matchTime"
            :reverse="false"
            controlVariant="split"
            label="Match Time (minutes)"
            :hideInput="false"
            :inset="false"
          />

          <div v-if="players.length > 0 && game.startingMembers">
            <div class="text-subtitle-1 text-medium-emphasis">Starting Members</div>
            <!-- <v-select
            clearable
            chips
            label="Forwards"
            v-model="game.startingMembers.forwards"
            :items="players"
            multiple
            variant="outlined"
          />
          <v-select
            clearable
            chips
            label="Midfielders"
            v-model="game.startingMembers.midfielders"
            :items="players"
            multiple
            variant="outlined"
          />
          <v-select
            clearable
            chips
            label="Defenders"
            v-model="game.startingMembers.defenders"
            :items="players"
            multiple
            variant="outlined"
          />
          <v-select
            clearable
            chips
            label="Goalkeeper"
            v-model="game.startingMembers.goalkeeper"
            :items="players"
            variant="outlined"
          />
          <v-select
            clearable
            chips
            label="Reserves"
            v-model="game.startingMembers.reserves"
            :items="players"
            multiple
            variant="reserves"
          /> -->

            <div v-if="players.length > 0 && game.scorers">
              <div class="text-subtitle-1 text-medium-emphasis">Scorers</div>
              <v-select
                clearable
                chips
                label="Scorers"
                v-model="game.scorers"
                :items="players"
                multiple
                variant="outlined"
              />
            </div>

            <div v-if="players.length > 0 && game.scorers">
              <div class="text-subtitle-1 text-medium-emphasis">Assists</div>
              <v-select
                clearable
                chips
                label="Assists"
                v-model="game.assists"
                :items="players"
                multiple
                variant="outlined"
              />
            </div>

            <div v-if="players.length > 0 && game.warnings">
              <div class="text-subtitle-1 text-medium-emphasis">Warnings</div>
              <v-select
                clearable
                chips
                label="Warnings"
                v-model="game.warnings"
                :items="players"
                multiple
                variant="outlined"
              />
            </div>

            <div v-if="players.length > 0 && game.substitutions">
              <div class="text-subtitle-1 text-medium-emphasis">Substitutions</div>
              <v-select
                clearable
                chips
                label="Substitutions"
                v-model="game.substitutions"
                :items="players"
                multiple
                variant="outlined"
              />
            </div>
          </div>
        </div>
      </div>
      <div v-if="fetching">
        <v-progress-circular model-value="20"></v-progress-circular>
      </div>
    </template>
  </DetailPageBase>
</template>

<script setup lang="ts">
import type { Game, MatchResult, Formation, Player } from '~/types/base';
import dayjs from 'dayjs';
const route = useRoute();
const user = useUser();
const { $supabase } = useNuxtApp();

const resultItems: MatchResult[] = ['win', 'lose', 'draw'];
const formationItems: Formation[] = ['4-4-2', '4-5-1', '4-3-3', '3-4-3', '3-5-2', '5-3-2', '5-4-1', 'not-set'];

const fetching = ref(true);
const game = ref<Game | null>(null);
const players = ref<Player[]>([]);

onMounted(() => {
  init();
});
watch(user, () => {
  init();
});

const init = async () => {
  fetching.value = true;

  const teamId = route.params.teamId;
  const gameId = route.params.gameId;
  if (!teamId || Array.isArray(teamId) || !gameId || Array.isArray(gameId)) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
  }

  // fetch game
  const { data: gameData, error: gameError } = await $supabase
    .from('games')
    .select()
    .eq('id', gameId)
    .eq('team_id', teamId)
    .single();
  if (gameError) {
    console.error('Failed to fetch game:', gameError);
  } else if (gameData) {
    game.value = gameData;
  } else {
    console.error('Game not found');
  }

  // fetch players
  const { data: playerData, error: playerError } = await $supabase.from('players').select().eq('team_id', teamId);
  if (playerError) {
    console.error('Failed to fetch players:', playerError);
  } else {
    players.value = playerData || [];
  }

  fetching.value = false;
};

const updateGame = async () => {
  if (!user.value || !game.value) {
    return;
  }

  const { data, error } = await $supabase
    .from('games')
    .update({
      name: game.value.name,
      memo: game.value.memo,
      opponent: game.value.opponent,
      date: game.value.date,
      formation: game.value.formation,
      match_time: game.value.matchTime,
      match_result: game.value.matchResult,
      starting_members: game.value.startingMembers,
      scorers: game.value.scorers,
      assists: game.value.assists,
      warnings: game.value.warnings,
      substitutions: game.value.substitutions,
    })
    .eq('id', game.value.id)
    .select();

  if (error) {
    console.error('Failed to update game:', error);
  } else {
    console.log('Game updated successfully:', data);
  }
};

// const init = (gameVal: Game | null) => {
//   if (gameVal) {
//     game.value = gameVal;
//   } else {
//     game.value = initialValue;
//   }
// };
// defineExpose({ init });

// const submit = async () => {
//   const { valid } = await form.value.validate();
//   if (!valid) {
//     return;
//   }

//   emit('submit', name.value, description.value, isPublic.value);
// };

// const closeDialog = () => {
//   emit('update-dialog', false);
// };

/**
 * Game Edit Dialog
 */
// const gameEditDialog = ref();
// const showsGameEditDialog = ref(false);
// const showGameEditDialog = () => {
//   gameEditDialog.value.init(props.team);
//   showsGameEditDialog.value = true;
// };
// const updateGameEditDialog = (shows: boolean) => {
//   showsGameEditDialog.value = shows;
// };
// const updateGame = (newGame: Game) => {
//   emit('update-game', newGame);
//   showsGameEditDialog.value = false;
// };

/**
 * Game Delete Dialog
 */
// const showsGameDeleteDialog = ref(false);
// const showGameDeleteDialog = () => {
//   showsGameDeleteDialog.value = true;
// };
// const deleteGame = () => {
//   emit('delete-game');
//   showsGameDeleteDialog.value = false;
// };
</script>
