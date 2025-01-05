<template>
  <div class="layout">
    <div class="layout__header">
      <img 
        src="/images/setting.png" 
        alt="Account" 
        class="layout__header-image" 
        @click="goToAccount"
      />
    </div>
    <div class="layout__row">
      <div class="layout__column layout__stash">
        <h2 class="layout__title">Stash</h2>
        <div v-for="(stash, index) in stashStore.stashList.stashDtlList" :key="index">
          <StashCard v-bind="stash" @delete="onDeleteStash" @update="onUpdateStash" />
        </div>
      </div>
      <div class="layout__column layout__json">
        <h2 class="layout__title">Saved JSON</h2>
        <div v-for="(stash, index) in stashStore.stashList.stashDtlList" :key="index">
          <StashCard v-bind="stash" @delete="onDeleteStash" @update="onUpdateStash" />
        </div>
      </div>
    </div>
    <button class="layout__floating-button" @click="onFloatingButtonClick">+</button>
    <AddModifyStashDialog
      :isCreateMode="true"
      :isOpen="isAddDialogOpen"
      @update:isOpen="isAddDialogOpen = $event"
      @create="onCreateStash"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import { useRouter } from 'vue-router'
import type { CreateStashInDTO, UpdateStashInDTO } from '@/generate/stash/api'

const router = useRouter()
const stashStore = useStashStore()

const isAddDialogOpen = ref(false)

const onFloatingButtonClick = () => {
  isAddDialogOpen.value = true
}
const onDeleteStash = async (stash_id: number) => {
  await stashStore.deleteStash(stash_id)
}
const onUpdateStash = async (data: any) => {
  await stashStore.updateStash(data)
}
const onCreateStash = async (data: CreateStashInDTO) => {
  await stashStore.createStash(data)
}

const goToAccount = () => {
  router.push('/account')
}

onMounted(async () => {
  await stashStore.fetchStashList()
})
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #f4f4f4;
}

.layout__header {
  position: absolute;
  top: 16px;
  right: 16px;
}

.layout__header-image {
  width: 26px;
  height: 26px;
  cursor: pointer;
  transition: transform 0.2s;
}

.layout__header-image:hover {
  transform: scale(1.1);
}

.layout__row {
  display: flex;
  flex-direction: column;
}

.layout__column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
}

.layout__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.layout__stash {
  flex: 1;
}

.layout__json {
  flex: 1;
}

.layout__floating-button {
  position: fixed;
  bottom: 16px;
  right: 16px;
  width: 56px;
  height: 56px;
  border: none;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.layout__floating-button:hover {
  background-color: #0056b3;
}

@media (max-width: calc(100vw * 0.9)) {
  .layout__row {
    flex-direction: row;
  }
}
</style>
