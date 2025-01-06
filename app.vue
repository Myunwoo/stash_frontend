<script setup lang="ts">
const dialogStore = useDialogStore()
const loadingStore = useLoadingStore()
const { dialogShow, dialogType, dialogMsg, dialogOptions } = storeToRefs(dialogStore)
const { loadingShow } = storeToRefs(loadingStore)
</script>


<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <AtomLoadingDialog />
      <client-only>
        <Dialog :visible="dialogShow" :type="dialogType" :msg="dialogMsg" :option="dialogOptions"
          @confirm="dialogOnConfirm()" @close="dialogOnCancel()" />
        <LoadingDialog v-if="loadingShow" v-model:visible="loadingShow" />
      </client-only>
    </NuxtLayout>
  </div>
</template>