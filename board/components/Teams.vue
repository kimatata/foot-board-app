<template>
  <v-container>
    <div class="d-flex justify-space-between align-center my-6">
      <h2>
        Teams
      </h2>
      <v-btn prepend-icon="mdi-plus" color="blue-darken-2">
        New Team
      </v-btn>
    </div>
    <div v-if="teams.length > 0">
      <v-row>
        <v-col v-for="(team, index) in teams" :key="index" cols="12" md="4">
          <v-card :title="team.name" class="rounded elevation-3" :to="`teams/${team.id}`" link>
            <template v-slot:text>
              <div class="d-flex">
                <div class="me-2">{{ 3 }} members</div>
                <div class="me-2">{{ dayjs(team.created_at).format('YYYY/MM/DD') }}</div>
              </div>
            </template>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-empty-state v-else icon="mdi-magnify"
      text="Try adjusting your search terms or filters. Sometimes less specific terms or broader queries can help you find what you're looking for."
      title="We couldn't find a match.">
    </v-empty-state>
  </v-container>
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