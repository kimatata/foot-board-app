<template>
  <TabWindowItem :title="'Games'">
    <template #actions>
      <v-btn size="small" prepend-icon="mdi-plus" color="primary" @click="emit('create-new-game')"> New Game </v-btn>
    </template>
    <template #content>
      <div v-show="props.games.length > 0">
        <v-table density="compact" class="rounded elevation-3">
          <thead>
            <tr>
              <th @click="sort('id')" class="cursor-pointer">
                <span>ID</span>
                <v-icon
                  v-show="sortKey === 'id'"
                  :icon="sortOrder === 'asc' ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="ms-1"
                />
              </th>
              <th @click="sort('match_result')" class="cursor-pointer">
                <span>Result</span>
                <v-icon
                  v-show="sortKey === 'match_result'"
                  :icon="sortOrder === 'asc' ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="ms-1"
                />
              </th>
              <th @click="sort('name')" class="cursor-pointer">
                <span>Name</span>
                <v-icon
                  v-show="sortKey === 'name'"
                  :icon="sortOrder === 'asc' ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="ms-1"
                />
              </th>
              <th @click="sort('opponent')" class="cursor-pointer">
                <span>Opponent</span>
                <v-icon
                  v-show="sortKey === 'opponent'"
                  :icon="sortOrder === 'asc' ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="ms-1"
                />
              </th>
              <th @click="sort('created_at')" class="cursor-pointer">
                <span>Date</span>
                <v-icon
                  v-show="sortKey === 'created_at'"
                  :icon="sortOrder === 'asc' ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="ms-1"
                />
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="game in sortedGames" :key="game.id" @click="showGameEditDialog(game)" class="cursor-pointer">
              <td>
                {{ game.id }}
              </td>
              <td>
                <MatchResultIcon :result="game.match_result" />
              </td>
              <td>
                {{ game.name }}
              </td>
              <td>{{ game.opponent }}</td>
              <td>{{ dayjs(game.date).format('YYYY/MM/DD') }}</td>
              <td>
                <v-btn
                  icon="mdi-delete"
                  color="pink-accent-3"
                  size="x-small"
                  variant="text"
                  @click.stop="showGameDeleteDialog(game.id)"
                />
              </td>
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

  <GameEditDialog
    ref="gameEditDialog"
    :is-show="showsGameEditDialog"
    :players="[]"
    @update-dialog="updateGameEditDialog"
    @submit="updateGame"
  />

  <GameDeleteDialog
    :is-show="showsGameDeleteDialog"
    @delete="deleteGame"
    @update-dialog="showsGameDeleteDialog = false"
  />
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

/**
 * Sorting
 */
export type sortableGameKeys = 'id' | 'name' | 'created_at' | 'opponent' | 'match_result';
const sortKey = ref<sortableGameKeys>('id');
const sortOrder = ref<'asc' | 'desc'>('desc');
const sort = (key: sortableGameKeys) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};
const sortedGames = computed(() => {
  return [...props.games].sort((a, b) => {
    const aValue = a[sortKey.value];
    const bValue = b[sortKey.value];

    if (aValue < bValue) return sortOrder.value === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder.value === 'asc' ? 1 : -1;
    return 0;
  });
});

/**
 * Game Edit Dialog
 */
const gameEditDialog = ref();
const showsGameEditDialog = ref(false);
const showGameEditDialog = (game: Game) => {
  gameEditDialog.value.init(game);
  showsGameEditDialog.value = true;
};
const updateGameEditDialog = (shows: boolean) => {
  showsGameEditDialog.value = shows;
};
const updateGame = (game: Game) => {
  emit('update-game', game);
  showsGameEditDialog.value = false;
};

/**
 * Game Delete Dialog
 */
const showsGameDeleteDialog = ref(false);
const deleteGameId = ref<number | null>(null);
const showGameDeleteDialog = (id: number) => {
  showsGameDeleteDialog.value = true;
  deleteGameId.value = id;
};
const deleteGame = () => {
  if (deleteGameId.value === null) {
    console.error('No game ID to delete');
    return;
  }
  emit('delete-game', deleteGameId.value);
  showsGameDeleteDialog.value = false;
  deleteGameId.value = null;
};
</script>
