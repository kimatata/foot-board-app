<template>
  <v-chip v-show="props.result === 'win'" color="success" size="small"> Win </v-chip>
  <v-chip v-show="props.result === 'lose'" color="error" size="small"> Lose </v-chip>
  <v-chip v-show="props.result === 'draw'" size="small"> Draw </v-chip>
</template>

<script setup lang="ts">
import type { MatchResult } from '~/types/base';

type Props = {
  result: MatchResult;
};

const props = defineProps<Props>();
console.log(props);
</script>
