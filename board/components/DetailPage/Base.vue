<template>
  <v-container class="d-flex justify-center">
    <div class="tab-size">
      <div class="d-flex justify-space-between align-center my-6">
        <div class="d-flex align-center">
          <v-btn
            size="x-small"
            icon="mdi-chevron-left"
            variant="outlined"
            class="me-2"
            :to="props.backButtonPath"
            nuxt
          />
          <h2>{{ props.title }}</h2>
        </div>
        <div>
          <slot name="actions"></slot>
        </div>
      </div>
      <slot name="content"></slot>
    </div>
  </v-container>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string;
  backButtonPath: string;
}>();
</script>

<style scoped>
/* 1024px以上の幅の場合に適応される */
.tab-size {
  width: 600px;
}
@media screen and (max-width: 1024px) {
  /* 1024pxまでの幅の場合に適応される */
  .tab-size {
    width: 480px;
  }
}
@media screen and (max-width: 768px) {
  /* 768pxまでの幅の場合に適応される */
  .tab-size {
    min-width: 360px;
  }
}
@media screen and (max-width: 480px) {
  /* 480pxまでの幅の場合に適応される */
  .tab-size {
    width: 300px;
  }
}
@media screen and (max-width: 320px) {
  /* 320pxまでの幅の場合に適応される */
  .tab-size {
    width: 200px;
  }
}
</style>
