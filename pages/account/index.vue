<template>
  <v-container class="d-flex flex-column align-center" fill-height>
    <!-- 이름 및 친구 ID -->
    <h2>{{ userStore.name }}</h2>
    <p class="text-caption text-grey">{{ userStore.username }}</p>
    <!-- 회원 정보 수정 버튼 -->
    <v-btn color="primary" class="my-4" @click="onClickModifyUser">회원 정보 수정</v-btn>
    <v-spacer></v-spacer>
    <v-btn color="red" class="mb-4" @click="onClickLogout">로그아웃</v-btn>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'with-toolbar'
})

const router = useRouter()
const userStore = useUserStore()

/** event handler */
// 회원 정보 수정 이동
const onClickModifyUser = () => {
  router.push('/account/update')
}
// 로그아웃
const onClickLogout = () => {
  removeCookie('SAT')
  removeCookie('SRT')
  userStore.clearUserInfo()
  router.push('/login')
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
