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
        <div class="layout__title-wrapper">
          <h2 class="layout__title">Stash</h2>
          <button class="layout__add-button" @click="onFloatingButtonClick">+</button>
        </div>
        <div v-for="(stash, index) in stashStore.stashList.stashDtlList" :key="index">
          <StashCard v-bind="stash" />
        </div>
      </div>
      <div class="layout__column layout__json">
        <h2 class="layout__title">Saved JSON</h2>
        <div v-for="(jsonData, index) in jsonStore.jsonList.jsonDtlList" :key="index">
          <JsonCard v-bind="jsonData" />
        </div>
      </div>
    </div>
    <StashModifyDialog
      :isCreateMode="true"
      :isOpen="isAddDialogOpen"
      @update:isOpen="isAddDialogOpen = $event"
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const stashStore = useStashStore()
const jsonStore = useJsonStore()

const isAddDialogOpen = ref(false)

const onFloatingButtonClick = () => {
  isAddDialogOpen.value = true
}

const goToAccount = () => {
  router.push('/account')
}

onMounted(async () => {
  await stashStore.fetchStashList()
  await jsonStore.fetchJsonList()
})
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 14px;
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
  width: 100%;
  display: flex;
  flex-direction: column;
}

.layout__column {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 16px;
}

.layout__title-wrapper {
  display: flex;
  align-items: center;
}

.layout__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
}

.layout__add-button {
  margin-left: 8px;
  background: none;
  color: #ff7043;
  font-size: 2.5rem;
  border: none;
  cursor: pointer;
  transition: transform 0.1s;
}

.layout__add-button:hover {
  transform: scale(1.2);
}

.layout__stash {
  flex: 1;
}

.layout__json {
  flex: 1;
}
</style>
