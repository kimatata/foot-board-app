<template>
  <TabWindowItem :title="'Games'">
    <template #actions>
      <v-btn size="small" prepend-icon="mdi-plus" color="green-accent-3" @click="emit('create-new-game')">
        New Game
      </v-btn>
    </template>
    <template #content>
      <div v-show="props.games.length > 0">
        <v-table class="rounded elevation-3">
          <thead>
            <tr>
              <th>Result</th>
              <th>Name</th>
              <th>Opponent</th>
              <th>Formation</th>
              <th>Match time</th>
              <th>Created at</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in props.games" :key="index">
              <td>
                <MatchResultIcon :result="game.match_result" />
              </td>
              <td>
                <NuxtLink :to="`/teams/${props.teamId}/games/${game.id}`" class="text-green-accent-3">
                  {{ game.name }}
                </NuxtLink>
              </td>
              <td>{{ game.opponent }}</td>
              <td>{{ game.formation }}</td>
              <td>{{ game.match_time }}</td>
              <td>{{ dayjs(game.date).format('YYYY/MM/DD') }}</td>
            </tr>
          </tbody>
        </v-table>
      </div>
      <v-empty-state
        v-show="games.length === 0"
        icon="mdi-magnify"
        text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
        title="We couldn't find a match."
      >
      </v-empty-state>
    </template>
  </TabWindowItem>

  <!-- <GameDeleteDialog
    :is-show="showsGameDeleteDialog"
    @delete="deleteGame"
    @update-dialog="showsGameDeleteDialog = false"
  /> -->
</template>

<script setup lang="ts">
import type { Game } from '~/types/base';
import dayjs from 'dayjs';

type Props = {
  teamId: number | null;
  games: Game[];
};
const props = defineProps<Props>();
const emit = defineEmits(['create-new-game', 'update-game', 'delete-game']);
const user = useUser();
const { $supabase } = useNuxtApp();

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
