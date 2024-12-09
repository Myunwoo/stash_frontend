<script setup lang="ts">
import { setCookie, removeCookie } from '@/utils/cookie-utils'

// dialog
const dialogStore = useDialogStore()
const { dialogShow, dialogType, dialogMsg, dialogOptions } = storeToRefs(dialogStore)

const onClickH2 = async (e: Event) => {
  const StashControllerApi = new API.STASH.StashControllerApi(configuration, configuration.basePath, axiosInstance)
  const STASH_ID = 3
  const res = await StashControllerApi.getStashDetail(STASH_ID)
}
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