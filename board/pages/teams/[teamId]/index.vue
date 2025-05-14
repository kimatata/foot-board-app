<template>
  <div class="d-flex justify-space-between align-center my-6">
    <h2 class="">
      Games
    </h2>
    <v-btn prepend-icon="mdi-plus">
      New Game
    </v-btn>
  </div>
  <div v-show="games.length > 0">
    <v-table class="rounded elevation-3">
      <thead>
        <tr>
          <th>
            Result
          </th>
          <th>
            Name
          </th>
          <th>
            Opponent
          </th>
          <th>
            Formation
          </th>
          <th>
            Match time
          </th>
          <th>
            Created at
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in games" :key="index">
          <td>
            <MatchResultIcon :result="game.match_result" />
          </td>
          <td>
            <NuxtLink :to="`teams/${teamId}/games/${game.id}`">
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
  <v-empty-state v-show="games.length === 0" icon="mdi-magnify"
    text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
    title="We couldn't find a match.">
  </v-empty-state>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import type { Game } from '~/types/base';
import dayjs from 'dayjs';
const teamId = ref<number | null>(null)
const games = ref<Game[]>([])
const route = useRoute()
const { $supabase } = useNuxtApp()

onMounted(async () => {
  const paramId = route.params.teamId
  if (!paramId || Array.isArray(paramId)) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  }

  teamId.value = Number(paramId)
  const data = await fetchGames(paramId)
  console.log(data)
  games.value = data;
})

const fetchGames = async (teamId: string) => {
  const { data, error } = await $supabase.from('games').select().eq('team_id', teamId)
  if (error) {
    console.error('Supabase error:', error)
    return [];
  }
  return data;
}
</script>