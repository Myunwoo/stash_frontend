<template>
  <div class="login-page">
    <div class="login-page__container">
      <img 
        class="login-page__logo" 
        :src="logoSrc" 
        alt="Stash Logo" 
      />
      <div class="login-page__field">
        <label for="username" class="login-page__label">아이디</label>
        <input id="username" type="text" class="login-page__input" v-model="username" />
      </div>
      <div class="login-page__field">
        <label for="password" class="login-page__label">비밀번호</label>
        <input id="password" type="password" class="login-page__input" v-model="password" />
      </div>
      <button class="login-page__button" @click="onClickLogin">로그인</button>
      <div class="login-page__footer">
        <button class="login-page__signup" @click="onClickSignUp">회원가입</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Login' })

import { AxiosError } from 'axios'

const router = useRouter()
const AuthControllerApi = new API.AUTH.AuthControllerApi(configuration, configuration.basePath, axiosInstance)

const username = ref('')
const password = ref('')
const logoSrc = '/images/stash.png'

const onClickLogin = async () => {
  if (validateInput()) return

  const LOGIN_PARAM = {
    username: username.value,
    password: password.value
  }
  try {
    const RES_LOGIN = await AuthControllerApi.login(LOGIN_PARAM)
    const { data: accessToken } = RES_LOGIN
    const { srt: refreshTokenHeader } = RES_LOGIN.headers
    const refreshToken = refreshTokenHeader
      ?.split('; ')
      ?.find((cookie: string) => cookie.startsWith('refreshToken='))
      ?.split('=')[1]
    setCookie('SAT', accessToken)
    setCookie('SRT', refreshToken)
    setCookie('username', username.value)
    router.push('/')
  } catch (e) {
    handleLoginError(e)
  }
}

const onClickSignUp = () => {
  router.push('/account/create')
}

const validateInput = () => [
  [username.value, '아이디를 입력해 주세요.'],
  [password.value, '비밀번호를 입력해 주세요.']
].some(([field, message]) => checkField(field, message))

const checkField = (field: string, message: string) => {
  if (isEmptyString(field)) {
    showAlert(message)
    return true
  }
  return false
}

const handleLoginError = (e: unknown) => {
  if (e instanceof AxiosError) {
    const statusCode = e.response?.status
    const errordata = e.response?.data
    const code = getComCd(errordata)
    const msg = getComMsg(errordata)
    if (code === 'MSG0001') {
      showAlert('잘못된 아이디입니다.')
    } else if (code === 'MSG0002') {
      showAlert('잘못된 비밀번호입니다.')
    } else {
      showAlert('알 수 없는 에러가 발생했습니다.')
    }
  } else if (e instanceof Error) {
    console.error(`Error ${e.message}`)
  } else {
    console.error('Unkown Error', e)
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background-color: #f4f4f4;
  padding: 3.8rem 1rem;
}

.login-page__container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 400px;
  background: white;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.login-page__logo {
  width: 100px;
  height: auto;
  margin-bottom: 1rem;
}

.login-page__field {
  width: 100%;
  margin-bottom: 1rem;
}

.login-page__label {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  color: #555;
}

.login-page__input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.2s;
}

.login-page__input:focus {
  border-color: #ff7f32;
}

.login-page__button {
  width: 100%;
  padding: 0.75rem;
  background-color: #ff7f32;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.login-page__button:hover {
  background-color: #ff5400;
}

.login-page__footer {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 1rem;
}

.login-page__signup {
  background: none;
  border: none;
  color: #ff7f32;
  font-size: 0.875rem;
  cursor: pointer;
}

.login-page__signup:hover {
  text-decoration: underline;
}
</style>
