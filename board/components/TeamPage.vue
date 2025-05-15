<template>
  <v-container fluid class="pa-0">
    <v-row>
      <v-col>
        <div class="d-flex flex-row">
          <v-tabs v-model="tab" direction="vertical" class="elevation-3 h-screen">
            <v-tab value="games">
              <v-icon icon="mdi-text-box-edit" class="me-1" />
              Game results
            </v-tab>

            <v-tab value="members">
              <v-icon icon="mdi-account-group" class="me-1" />
              Members
            </v-tab>

            <v-tab value="data">
              <v-icon icon="mdi-database" class="me-1" />
              Data
            </v-tab>

            <v-tab value="settings">
              <v-icon icon="mdi-cog" class="me-1" />
              Settings
            </v-tab>
          </v-tabs>
          <v-tabs-window v-model="tab" class="w-100" a>
            <v-tabs-window v-model="tab">
              <v-tabs-window-item :transition="false" :reverse-transition="false" value="games">
                <GamesTab :team-id="teamId" :games="games" />
              </v-tabs-window-item>

              <v-tabs-window-item :transition="false" :reverse-transition="false" value="members">
                Members
              </v-tabs-window-item>

              <v-tabs-window-item :transition="false" :reverse-transition="false" value="data">
                Data
              </v-tabs-window-item>

              <v-tabs-window-item :transition="false" :reverse-transition="false" value="settings">
                Settings
              </v-tabs-window-item>
            </v-tabs-window>
          </v-tabs-window>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default'
})

import type { Game } from '~/types/base';

const tab = ref("home")
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