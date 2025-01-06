<template>
  <div class="loading-dialog" v-if="isLoading">
    <div class="loading-dialog__overlay"></div>
    <div class="loading-dialog__content">
      <div class="loading-dialog__bar">
        <span class="loading-dialog__text">Stash</span>
        <div class="loading-dialog__progress"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const loadingStore = useLoadingStore();
const isLoading = computed(() => loadingStore.loadingShow);
</script>

<style scoped>
.loading-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
}

.loading-dialog__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
}

.loading-dialog__content {
  position: relative;
  text-align: center;
  background: transparent;
}

.loading-dialog__bar {
  position: relative;
  width: 120px;
  height: 50px;
  background-color: #e0e0e0;
  border-radius: 22px;
  overflow: hidden;
}

.loading-dialog__text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: bold;
  color: white;
  z-index: 10;
}

.loading-dialog__progress {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: #ff7043;
  animation: progress-animation 2s infinite alternate;
}

@keyframes progress-animation {
  0% {
    width: 0;
  }
  100% {
    width: 100%;
  }
}
</style>
