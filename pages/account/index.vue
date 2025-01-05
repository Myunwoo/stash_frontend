<template>
  <div class="account">
    <div class="account__container">
      <h2 class="account__name">{{ userStore.name }}</h2>
      <p class="account__username">{{ userStore.username }}</p>
      <button class="account__button account__button--modify" @click="onClickModifyUser">
        회원 정보 수정
      </button>
      <button class="account__button account__button--logout" @click="onClickLogout">
        로그아웃
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const router = useRouter()
const userStore = useUserStore()

const onClickModifyUser = () => {
  router.push('/account/update')
}

const onClickLogout = () => {
  removeCookie('SAT')
  removeCookie('SRT')
  userStore.clearUserInfo()
  router.push('/login')
}

onMounted(async () => {
  await userStore.fetchUserInfo(getCookie('username'))
})
</script>

<style scoped>
.account {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding: 16px;
}

.account__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.account__name {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 8px;
}

.account__username {
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 24px;
}

.account__button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.2s;
}

.account__button--modify {
  width: 80%;
  background-color: #ff7f32;
  color: #fff;
}

.account__button--modify:hover {
  background-color: #ff5400;
}

.account__button--logout {
  background: none;
  border: none;
  color: #ff7f32;
  font-size: 0.875rem;
  cursor: pointer;
}

.account__button--logout:hover {
  text-decoration: underline;
}
</style>
