<template>
  <v-container fluid>
    <v-row dense justify="center">
      <v-col v-for="(stash, index) in stashStore.stashList.stashDtlList" :key="index" cols="12" sm="6" md="4" lg="3"
        class="my-4">
        <StashCard v-bind="stash" @delete="onDeleteStash" @update="onUpdateStash" />
      </v-col>
    </v-row>

    <AtomPlus :isFloating="true" size="big" @click="onFloatingButtonClick" />
    <AddModifyStashDialog :isCreateMode="true" :isOpen="isAddDialogOpen" @update:isOpen="isAddDialogOpen = $event"
      @create="onCreateStash" />
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'with-toolbar'
})
import type { CreateStashInDTO, UpdateStashInDTO } from '@/generate/stash/api'
// Store
const stashStore = useStashStore()

// 등록 다이얼로그 노출 여부
const isAddDialogOpen = ref(false)

/** event handler */
// 플로팅 버튼 클릭
const onFloatingButtonClick = () => {
  isAddDialogOpen.value = true
}
// 일정 삭제
const onDeleteStash = async (stash_id: number) => {
  await stashStore.deleteStash(stash_id)
}
// 일정 수정
const onUpdateStash = async (data: any) => {
  await stashStore.updateStash(data)
}
// 일정 생성
const onCreateStash = async (data: CreateStashInDTO) => {
  await stashStore.createStash(data)
}

/** lifecycle functions */
onMounted(async () => {
  await stashStore.fetchStashList()
})
</script>

<style scoped>
.my-4 {
  padding: 8px;
  /* 카드 간의 여백 */
}
</style>
