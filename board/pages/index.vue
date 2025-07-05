<template>
  <v-container class="fill-height d-flex flex-column justify-center align-center text-center py-16">
    <v-row>
      <v-col cols="12">
        <h1 class="display-2 font-weight-bold mb-4">FootBoard</h1>
        <h2 class="subtitle-1 mb-8">The smart web app for managing your football matches</h2>
        <v-img src="/icon-512.png" alt="FootBoard Logo" max-width="120" class="mb-8 mx-auto" />
        <p class="mb-6">
          FootBoard helps you easily manage and visualize your football team's matches, members, and match metrics.<br />
          Keep a record of your team's history, analyze performance, and share results with ease.
        </p>
        <v-btn color="green-accent-3" large :to="user ? '/account' : '/account/signin'" class="mb-10"
          >Get Started</v-btn
        >
      </v-col>
    </v-row>
    <v-row class="mt-8 justify-center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="2" class="pa-8">
          <h2 class="font-weight-bold mb-6">Key Features</h2>
          <v-row>
            <v-col cols="12" md="4">
              <v-icon color="amber-accent-2" size="48" class="mb-2">mdi-soccer</v-icon>
              <h3 class="subtitle-2 font-weight-bold mb-2">Match Management</h3>
              <p>
                Register, edit, and view all your team's matches. Record scores, opponents, dates, and match details.
              </p>
              <v-img src="/placeholder/match.png" alt="Match Management Screenshot" height="120" contain class="my-2" />
            </v-col>
            <v-col cols="12" md="4">
              <v-icon color="amber-accent-2" size="48" class="mb-2">mdi-account-group</v-icon>
              <h3 class="subtitle-2 font-weight-bold mb-2">Member Management</h3>
              <p>Add, edit, and organize your team members. Track player stats, positions, and participation.</p>
              <v-img
                src="/placeholder/members.png"
                alt="Member Management Screenshot"
                height="120"
                contain
                class="my-2"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-icon color="amber-accent-2" size="48" class="mb-2">mdi-chart-bar</v-icon>
              <h3 class="subtitle-2 font-weight-bold mb-2">Match Metrics & Analysis</h3>
              <p>
                Visualize match metrics such as scorers, assists, warnings, and more. Analyze your team's performance
                over time.
              </p>
              <v-img src="/placeholder/metrics.png" alt="Metrics Screenshot" height="120" contain class="my-2" />
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
});

const user = useUser();
</script>
