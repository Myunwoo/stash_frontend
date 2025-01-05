

<template>
  <div class="account-create">
    <div class="account-create__container">
      <h2 class="account-create__title">회원가입</h2>

      <div class="account-create__field">
        <label for="name" class="account-create__label">이름</label>
        <input id="name" type="text" v-model="name" class="account-create__input" placeholder="이름을 입력하세요" />
      </div>

      <div class="account-create__field">
        <label for="username" class="account-create__label">아이디</label>
        <input id="username" type="text" v-model="username" class="account-create__input" placeholder="아이디를 입력하세요" />
      </div>

      <div class="account-create__field">
        <label for="password" class="account-create__label">비밀번호</label>
        <input id="password" type="password" v-model="password" class="account-create__input" placeholder="비밀번호를 입력하세요" />
      </div>

      <div class="account-create__field">
        <label for="confirmPassword" class="account-create__label">비밀번호 확인</label>
        <input
          id="confirmPassword"
          type="password"
          v-model="confirmPassword"
          class="account-create__input"
          placeholder="비밀번호를 입력하세요"
        />
      </div>

      <button class="account-create__button account-create__button--submit" @click="onClickSignUp">
        회원가입
      </button>

      <button class="account-create__button account-create__button--login" @click="goToLogin">
        로그인 페이지로
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import type { CreateUserInDTO } from '@/generate/auth/api'

const router = useRouter()
const AuthControllerApi = new API.AUTH.AuthControllerApi(configuration, configuration.basePath, axiosInstance)

const name = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

const checkField = (field: string, message: string) => {
  if (isEmptyString(field)) {
    showAlert(message)
    return true
  }
  return false
}

const validateInput = () => [
  [name.value, '이름을 입력해 주세요.'],
  [username.value, '아이디를 입력해 주세요.'],
  [password.value, '비밀번호를 입력해 주세요.'],
  [confirmPassword.value, '비밀번호 확인을 입력해 주세요.']
].some(([field, message]) => checkField(field, message))

const validatePasswordMatch = () => {
  if (password.value !== confirmPassword.value) {
    showAlert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    return false
  }
  return true
}

const onClickSignUp = async () => {
  if (validateInput()) return
  if (!validatePasswordMatch()) return

  const param: CreateUserInDTO = {
    name: name.value,
    username: username.value,
    password: password.value,
  }

  try {
    await AuthControllerApi.createUser(param)
    showAlert('회원가입이 완료되었습니다.')
    router.push('/login')
  } catch (e) {
    handleSignUpError(e)
  }
}

const handleSignUpError = (e: unknown) => {
  if (e instanceof AxiosError) {
    const errordata = e.response?.data
    const code = getComCd(errordata)
    const msg = getComMsg(errordata)
    if (code === 'MSG0003') {
      showAlert('이미 존재하는 아이디입니다.')
    } else {
      showAlert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.')
    }
  } else {
    console.error('알 수 없는 오류가 발생했습니다.', e)
  }
}

const goToLogin = () => {
  router.push('/login')
}
</script>

<style scoped>
.account-create {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width:100%;
  height: 100%;
  background-color: #f4f4f4;
  padding: 16px;
}

.account-create__container {
  width: 100%;
  max-width: 400px;
  padding: 2rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.account-create__title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 1.5rem;
}

.account-create__field {
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
}

.account-create__label {
  font-size: 0.875rem;
  color: #555;
  margin-bottom: 0.5rem;
}

.account-create__input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}

.account-create__input:focus {
  border-color: #ff7043;
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 112, 67, 0.2);
}

.account-create__input--error {
  border-color: #ff4d4f;
}

.account-create__error {
  font-size: 0.75rem;
  color: #ff4d4f;
  margin-top: 0.5rem;
}

.account-create__button {
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.account-create__button--submit {
  background-color: #ff7043;
  color: #fff;
}

.account-create__button--submit:hover {
  background-color: #e64a19;
}

.account-create__button--login {
  background: none;
  color: #ff7f32;
}

.account-create__button--login:hover {
  text-decoration: underline;
}
</style>
