<template>
  <div class="d-flex justify-space-between align-center my-6">
    <h2 class="">
      Teams
    </h2>
    <v-btn prepend-icon="mdi-plus" >
      New Team
    </v-btn>
  </div>
  <div v-show="teams.length > 0">
    <v-table>
      <thead>
        <tr>
          <th>
            Team Name
          </th>
          <th>
            member num
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(team, index) in teams" :key="index">
          <td>
            <NuxtLink :to="`games/${team.uuid}`">
              {{team.name}}
            </NuxtLink>
          </td>
          <td>{{ 3 }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <div v-show="teams.length === 0">
    no team record
  </div>
</template>

<script setup lang="ts">
import type { Team } from '~/types/base';

const teams = ref<Team[]>([
  {
    uuid: "uuid1",
    name: "team 1"
  },
  {
    uuid: "uuid2",
    name: "team 1"
  }
])
</script>