<template>
  <v-dialog :model-value="props.isShow" max-width="500" @update:model-value="closeDialog">
    <v-card title="Game Edit">
      <v-form ref="form" @submit.prevent="submit">
        <v-card-text>
          <div v-if="!editGame">
            <v-progress-circular model-value="20" />
          </div>
          <div v-else class="px-3">
            <v-text-field label="ID" v-model="editGame.id" density="compact" variant="outlined" disabled />

            <v-text-field label="Name" v-model="editGame.name" density="compact" variant="outlined" />

            <v-select
              label="Match Result"
              v-model="editGame.match_result"
              :items="resultItems"
              density="compact"
              variant="outlined"
            />

            <v-text-field label="Opponent" v-model="editGame.opponent" density="compact" variant="outlined" />

            <v-text-field
              v-show="!isEditingDate"
              label="Date"
              density="compact"
              variant="outlined"
              :model-value="dayjs(editGame.date).format('YYYY/MM/DD')"
              @update:focused="isEditingDate = true"
            />
            <div v-show="isEditingDate">
              <v-date-picker
                hide-header
                v-model="editGame.date"
                @update:focused="isEditingDate = false"
                @update:model-value="isEditingDate = false"
              />
            </div>

            <v-select
              label="Formation"
              v-model="editGame.formation"
              :items="formationItems"
              density="compact"
              variant="outlined"
            />

            <v-number-input
              v-model="editGame.match_time"
              :reverse="false"
              controlVariant="split"
              label="Match Time (minutes)"
              :hideInput="false"
              :inset="false"
              density="compact"
              variant="outlined"
            />

            <v-textarea label="Memo" density="compact" v-model="editGame.memo" variant="outlined" />

            <div v-if="players.length > 0 && editGame.starting_members">
              <div class="text-subtitle-1 text-medium-emphasis">Starting Members</div>
              <!-- <v-select
            clearable
            chips
            label="Forwards"
            v-model="game.startingMembers.forwards"
            :items="players"
            multiple
            variant="outlined"
          />
          <v-select
            clearable
            chips
            label="Midfielders"
            v-model="game.startingMembers.midfielders"
            :items="players"
            multiple
            variant="outlined"
          />
          <v-select
            clearable
            chips
            label="Defenders"
            v-model="game.startingMembers.defenders"
            :items="players"
            multiple
            variant="outlined"
          />
          <v-select
            clearable
            chips
            label="Goalkeeper"
            v-model="game.startingMembers.goalkeeper"
            :items="players"
            variant="outlined"
          />
          <v-select
            clearable
            chips
            label="Reserves"
            v-model="game.startingMembers.reserves"
            :items="players"
            multiple
            variant="reserves"
          /> -->

              <div v-if="props.players.length > 0 && editGame.scorers">
                <div class="text-subtitle-1 text-medium-emphasis">Scorers</div>
                <v-select
                  clearable
                  chips
                  label="Scorers"
                  v-model="editGame.scorers"
                  :items="props.players"
                  multiple
                  variant="outlined"
                />
              </div>

              <div v-if="props.players.length > 0 && editGame.scorers">
                <div class="text-subtitle-1 text-medium-emphasis">Assists</div>
                <v-select
                  clearable
                  chips
                  label="Assists"
                  v-model="editGame.assists"
                  :items="props.players"
                  multiple
                  variant="outlined"
                />
              </div>

              <div v-if="props.players.length > 0 && editGame.warnings">
                <div class="text-subtitle-1 text-medium-emphasis">Warnings</div>
                <v-select
                  clearable
                  chips
                  label="Warnings"
                  v-model="editGame.warnings"
                  :items="props.players"
                  multiple
                  variant="outlined"
                />
              </div>

              <div v-if="props.players.length > 0 && editGame.substitutions">
                <div class="text-subtitle-1 text-medium-emphasis">Substitutions</div>
                <v-select
                  clearable
                  chips
                  label="Substitutions"
                  v-model="editGame.substitutions"
                  :items="props.players"
                  multiple
                  variant="outlined"
                />
              </div>
            </div>
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancel" @click="closeDialog" class="w-25" />
          <v-btn variant="elevated" text="Update" color="primary" type="submit" class="w-25" />
        </v-card-actions>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { Formation, Game, MatchResult, Player } from '~/types/base';
import dayjs from 'dayjs';

type Props = {
  isShow: boolean;
  players: Player[];
};
const props = defineProps<Props>();
const emit = defineEmits(['submit', 'update-dialog']);

const resultItems: MatchResult[] = ['win', 'lose', 'draw'];
const formationItems: Formation[] = ['4-4-2', '4-5-1', '4-3-3', '3-4-3', '3-5-2', '5-3-2', '5-4-1', 'not-set'];

const editGame = ref<Game | null>(null);
const form = ref();
const isEditingDate = ref(false);
// const nameRules = [(v: string) => !!v || 'Name is required'];

const init = (newValue: Game) => {
  editGame.value = JSON.parse(JSON.stringify(newValue));
};
defineExpose({ init });

const submit = async () => {
  const { valid } = await form.value.validate();
  if (!valid) {
    return;
  }

  emit('submit', editGame.value);
};

const closeDialog = () => {
  emit('update-dialog', false);
};
</script>
