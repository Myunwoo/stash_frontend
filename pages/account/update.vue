<template>
  <div class="account-update">
    <div class="account-update__container">
      <h2 class="account-update__title">회원정보 변경</h2>

      <div class="account-update__field">
        <label for="username" class="account-update__label">아이디(변경 불가)</label>
        <input
          id="username"
          type="text"
          v-model="username"
          class="account-update__input--readonly"
          disabled
        />
      </div>

      <div class="account-update__field">
        <label for="name" class="account-update__label">이름</label>
        <input
          id="name"
          type="text"
          v-model="name"
          class="account-update__input"
          placeholder="이름을 입력하세요"
        />
      </div>

      <div class="account-update__field">
        <label for="password" class="account-update__label">새 비밀번호 (선택 사항)</label>
        <input
          id="password"
          type="password"
          v-model="inputPassword"
          class="account-update__input"
          placeholder="새 비밀번호를 입력하세요"
        />
      </div>

      <div class="account-update__field">
        <label for="confirmPassword" class="account-update__label">새 비밀번호 확인</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          class="account-update__input"
          :class="{ 'account-update__input--error': inputPassword !== confirmPassword && confirmPassword.length > 0 }"
          placeholder="새 비밀번호를 다시 입력하세요"
        />
        <p v-if="inputPassword !== confirmPassword && confirmPassword.length > 0" class="account-update__error">
          비밀번호와 비밀번호 확인이 일치하지 않습니다.
        </p>
      </div>
      <button class="account-update__button account-update__button--submit" @click="onClickUpdateUser">
        변경하기
      </button>
      <button class="account-update__button account-update__button--home" @click="goToHome">
        홈으로 이동
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'

definePageMeta({
  middleware: 'auth',
});

const router = useRouter()
const userStore = useUserStore()

const name = ref('')
const username = ref('')
const inputPassword = ref('')
const confirmPassword = ref('')

onMounted(async () => {
  await userStore.fetchUserInfo(getCookie('username'))
  initInputs()
})

const initInputs = () => {
  name.value = userStore.name
  username.value = userStore.username
}

const validatePasswordMatch = () => {
  if (inputPassword.value !== confirmPassword.value) {
    showAlert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    return false
  }
  return true
}

const onClickUpdateUser = async () => {
  if (inputPassword.value && !validatePasswordMatch()) return

  const param = {
    name: name.value,
    username: getCookie('username'),
    password: inputPassword.value || undefined,
  }

  try {
    await userStore.updateUserInfo(param)
    showAlert('회원정보가 성공적으로 변경되었습니다.')
    userStore.clearUserInfo()
    logout()
  } catch (e) {
    handleUpdateUserError(e)
  }
}

const handleUpdateUserError = (e: unknown) => {
  if (e instanceof AxiosError) {
    const errordata = e.response?.data
    const code = getComCd(errordata)
    const msg = getComMsg(errordata)
    if (code === 'MSG0004') {
      showAlert('회원정보 변경 중 오류가 발생했습니다.')
    } else {
      showAlert('알 수 없는 오류가 발생했습니다. 다시 시도해주세요.')
    }
  } else {
    console.error('알 수 없는 오류가 발생했습니다.', e)
  }
}

const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
.account-update {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100vh;
  background-color: #f4f4f4;
  padding: 16px;
}

.account-update__container {
  text-align: center;
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
}

.account-update__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 24px;
}

.account-update__field {
  margin-bottom: 16px;
  text-align: left;
}

.account-update__label {
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 4px;
  display: block;
}

.account-update__input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.account-update__input:focus {
  border-color: #007bff;
  outline: none;
  box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
}

.account-update__input--readonly {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.account-update__input--error {
  border-color: #ff4d4f;
}

.account-update__error {
  font-size: 0.75rem;
  color: #ff4d4f;
  margin-top: 4px;
}

.account-update__button {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 16px;
  transition: background-color 0.2s;
}

.account-update__button--submit {
  background-color: #ff7f32;
  color: #fff;
}

.account-update__button--submit:hover {
  background-color: #ff5400;
}

.account-update__button--home {
  background: none;
  border: none;
  color: #ff7f32;
  font-size: 0.875rem;
  cursor: pointer;
}

.account-update__button--home:hover {
  text-decoration: underline;
}
</style>
