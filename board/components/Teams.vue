<template>
  <v-container>
    <div class="d-flex align-center my-6">
      <h2>
        Teams
      </h2>
      <v-btn prepend-icon="mdi-plus" color="teal-darken-2" class="ms-8" @click="showsTeamDialog = true"
        :disabled="!user">
        New Team
      </v-btn>
    </div>
    <div v-if="teams.length > 0">
      <v-row>
        <v-col v-for="(team, index) in teams" :key="index" cols="12" md="4">
          <v-card :title="team.name" class="rounded elevation-3" :to="`teams/${team.id}`" link>
            <template v-slot:text>
              <div class="d-flex">
                <v-chip size="x-small" class="me-2">
                  {{ team.is_public ? 'Public' : 'Private' }}
                </v-chip>
                <v-chip size="x-small" class="me-2">
                  {{ 3 }} members
                </v-chip>
                <v-chip size="x-small" class="me-2">
                  {{ dayjs(team.created_at).format('YYYY/MM/DD') }}
                </v-chip>
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

  <TeamDialog :mode="'new'" :is-show="showsTeamDialog" @update-dialog="updateTeamDialog" @submit="createTeam" />
</template>

<script setup lang="ts">
import type { Team } from '~/types/base';
import dayjs from 'dayjs';
const teams = ref<Team[]>([])
const user = useUser()
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

/**
 * Dialog
 */
const showsTeamDialog = ref(false)
const updateTeamDialog = (shows: boolean) => {
  showsTeamDialog.value = shows;
}
const createTeam = async (name: string, isPublic: boolean) => {
  if (!user.value) {
    return;
  }

  showsTeamDialog.value = false;
  const { data, error } = await $supabase
    .from('teams')
    .insert({ name: name, user_uuid: user.value.id, is_public: isPublic })
    .select()

  if (data && data.length > 0) {
    teams.value.push(data[0])
  } else {
    console.error("failed to create team")
  }
}
</script>