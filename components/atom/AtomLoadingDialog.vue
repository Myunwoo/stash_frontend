<template>
  <v-dialog v-model="isLoading" persistent max-width="300">
    <v-card class="d-flex align-center justify-center" height="150">
      <v-progress-circular indeterminate color="primary" size="50" class="mr-2"></v-progress-circular>
      <span>Loading...</span>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.loadingShow);
</script>

<style scoped>
.v-card {
  min-width: 200px;
}
</style>