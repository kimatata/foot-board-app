<template>
  <div class="d-flex justify-space-between align-center my-6">
    <h2 class="">
      Teams
    </h2>
    <v-btn prepend-icon="mdi-plus">
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
            <NuxtLink :to="`teams/${team.id}`">
              {{ team.name }}
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
const teams = ref<Team[]>([])
const { $supabase } = useNuxtApp()

const getTeams = async () => {
  const { data, error } = await $supabase.from('teams').select()
  if (error) {
    console.error('Supabase error:', error)
    return
  }
  console.log(data)
  teams.value = data || []
}

onMounted(() => {
  getTeams()
})
</script>