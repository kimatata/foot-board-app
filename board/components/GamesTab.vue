<template>
  <v-container class="d-flex justify-center">
    <div>
      <div class="d-flex justify-space-between align-center my-6">
        <h2>
          Games
        </h2>
        <v-btn prepend-icon="mdi-plus" color="teal-darken-2">
          New Game
        </v-btn>
      </div>
      <div v-show="props.games.length > 0">
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
            <tr v-for="(game, index) in props.games" :key="index">
              <td>
                <MatchResultIcon :result="game.match_result" />
              </td>
              <td>
                <NuxtLink :to="`teams/${props.teamId}/games/${game.id}`">
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
    </div>
  </v-container>
</template>

<script setup lang="ts">
import type { Game } from '~/types/base';
import dayjs from 'dayjs';

type Props = {
  teamId: number | null;
  games: Game[]
}
const props = defineProps<Props>()

// import { sampleTeam, sampleOpponentTeam } from '~/assets/gemes';
// const games = ref<Game[]>([
//   {
//     uuid: "uuid1",
//     date: Date.now(),
//     formation: '3-4-3',
//     startingMembers: {
//       forwards: [sampleTeam[0], sampleTeam[1], sampleTeam[2]],
//       midfielders: [sampleTeam[3], sampleTeam[4], sampleTeam[5], sampleTeam[6]],
//       defenders: [sampleTeam[7], sampleTeam[8], sampleTeam[9]],
//       goalkeeper: sampleTeam[10],
//       reserves: [sampleTeam[11], sampleTeam[12], sampleTeam[13]],
//     },
//     opponent: "Sister Industries",
//     matchTime: 92,
//     matchResult: 'win',
//     Scorers: [{ principal: sampleTeam[0], time: 20, isAlly: true }, { principal: sampleTeam[2], time: 43, isAlly: true }, { principal: sampleOpponentTeam[0], time: 65, isAlly: false }],
//     Assists: [],
//     warnings: [],
//     substitutions: [],
//   },
//   {
//     uuid: "uuid2",
//     date: Date.now(),
//     formation: '3-4-3',
//     startingMembers: {
//       forwards: [sampleTeam[0], sampleTeam[1], sampleTeam[2]],
//       midfielders: [sampleTeam[3], sampleTeam[4], sampleTeam[5], sampleTeam[6]],
//       defenders: [sampleTeam[7], sampleTeam[8], sampleTeam[9]],
//       goalkeeper: sampleTeam[10],
//       reserves: [sampleTeam[11], sampleTeam[12], sampleTeam[13]],
//     },
//     opponent: "mizuho team",
//     matchTime: 44,
//     matchResult: 'draw',
//     Scorers: [],
//     Assists: [],
//     warnings: [],
//     substitutions: [],
//   }
// ])
</script>