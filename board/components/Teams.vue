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
    <v-table class="rounded elevation-3">
      <thead>
        <tr>
          <th>
            Team Name
          </th>
          <th>
            Member
          </th>
          <th>
            Created at
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
          <td>{{ dayjs(team.created_at).format('YYYY/MM/DD') }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
  <v-empty-state v-show="teams.length === 0" icon="mdi-magnify"
    text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
    title="We couldn't find a match.">
  </v-empty-state>
</template>

<script setup lang="ts">
import type { Team } from '~/types/base';
import dayjs from 'dayjs';
const teams = ref<Team[]>([])
const { $supabase } = useNuxtApp()

onMounted(async () => {
  const data = await fetchTeams();
  teams.value = data;
})

const fetchTeams = async () => {
  const { data, error } = await $supabase.from('teams').select()
  if (error) {
    console.error('Supabase error:', error)
    return [];
  }
  return data;
}
</script>