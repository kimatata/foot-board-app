<template>
  <div class="d-flex justify-space-between align-center my-6">
    <h2 class="">
      Games
    </h2>
    <v-btn prepend-icon="mdi-plus" >
      New Game
    </v-btn>
  </div>
  <div v-show="games.length > 0">
    <v-table>
      <thead>
        <tr>
          <th>
            Date
          </th>
          <th>
            Result
          </th>
          <th>
            Opponent
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in games" :key="index">
          <td>
            <NuxtLink :to="`games/${game.id}`">
              {{dayjs(game.date).format('YYYY-MM-DD') }}
            </NuxtLink>
          </td>
          <td>{{ game.matchResult }}</td>
          <td>{{ game.opponent }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div v-show="games.length === 0">
    no game record
  </div>
</template>

<script setup lang="ts">
import type { Game } from '~/types/base';
import { sampleTeam, sampleOpponentTeam } from '~/assets/gemes';
import dayjs from 'dayjs';

const games = ref<Game[]>([
  {
    uuid: "uuid1",
    date: Date.now(),
    formation: '3-4-3',
    startingMembers: {
      forwards: [sampleTeam[0], sampleTeam[1], sampleTeam[2]],
      midfielders: [sampleTeam[3], sampleTeam[4], sampleTeam[5], sampleTeam[6]],
      defenders: [sampleTeam[7], sampleTeam[8], sampleTeam[9]],
      goalkeeper: sampleTeam[10],
      reserves: [sampleTeam[11], sampleTeam[12], sampleTeam[13]],
    },
    opponent: "Sister Industries",
    matchTime: 92,
    matchResult: 'win',
    Scorers: [{ principal: sampleTeam[0], time: 20, isAlly: true }, { principal: sampleTeam[2], time: 43, isAlly: true }, { principal: sampleOpponentTeam[0], time: 65, isAlly: false }],
    Assists: [],
    warnings: [],
    substitutions: [],
  },
  {
    uuid: "uuid2",
    date: Date.now(),
    formation: '3-4-3',
    startingMembers: {
      forwards: [sampleTeam[0], sampleTeam[1], sampleTeam[2]],
      midfielders: [sampleTeam[3], sampleTeam[4], sampleTeam[5], sampleTeam[6]],
      defenders: [sampleTeam[7], sampleTeam[8], sampleTeam[9]],
      goalkeeper: sampleTeam[10],
      reserves: [sampleTeam[11], sampleTeam[12], sampleTeam[13]],
    },
    opponent: "mizuho team",
    matchTime: 44,
    matchResult: 'draw',
    Scorers: [],
    Assists: [],
    warnings: [],
    substitutions: [],
  }
])
</script>