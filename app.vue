<script setup lang="ts">
const dialogStore = useDialogStore()
const { dialogShow, dialogType, dialogMsg, dialogOptions } = storeToRefs(dialogStore)
</script>


<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
      <AtomLoadingDialog />
      <client-only>
        <AtomDialog :visible="dialogShow" :type="dialogType" :msg="dialogMsg" :option="dialogOptions"
          @confirm="dialogOnConfirm()" @close="dialogOnCancel()" />
      </client-only>
    </NuxtLayout>
  </div>
</template>