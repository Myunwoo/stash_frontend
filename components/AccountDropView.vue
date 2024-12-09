<template>
  <v-card width="250" class="pa-4 text-center">
    <h3 class="mb-1">{{ userStore.name }}</h3>
    <div class="d-flex align-center justify-center">
      <p class="text-caption text-grey">{{ userStore.username }}</p>
      <v-btn icon small @click="copyToClipboard(userStore.username)">
        <v-icon>mdi-content-copy</v-icon>
      </v-btn>
    </div>
  </v-card>
</template>

<script setup lang="ts">
const userStore = useUserStore()

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    alert(`ID ${text}가 클립보드에 복사되었습니다.`)
  } catch (err) {
    console.error('클립보드에 복사하는 중 오류가 발생했습니다:', err)
  }
}

/** life cycle functions */
onMounted(async () => {
  await userStore.fetchUserInfo(getCookie('username'))
})
</script>

<style scoped>
.text-grey {
  color: grey;
}
</style>
