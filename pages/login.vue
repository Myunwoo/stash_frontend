<template>
  <v-container class="d-flex flex-column justify-center align-center" fill-height>
    <h2 class="text-h5 mb-4">로그인</h2>
    <v-text-field label="아이디" v-model="username" outlined clearable prepend-inner-icon="mdi-account" class="mb-4"
      style="max-width: 400px; width: 100%;" />
    <v-text-field label="비밀번호" v-model="password" outlined clearable prepend-inner-icon="mdi-lock" type="password"
      style="max-width: 400px; width: 100%;" />

    <v-btn color="primary" class="my-4" @click="onClickLogin" style="max-width: 400px; width: 100%;">로그인</v-btn>
    <v-row class="d-flex justify-space-between" style="max-width: 400px; width: 100%;">
      <v-col class="text-right">
        <v-btn @click="onClickSignUp" class="text-caption">회원가입</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
const router = useRouter()
const AuthControllerApi = new API.AUTH.AuthControllerApi(configuration, configuration.basePath, axiosInstance)
const username = ref('')
const password = ref('')

const checkField = (field: string, message: string) => {
  if (isEmptyString(field)) {
    showAlert(message)
    return true
  }
  return false
}

const validateInput = () => [
  [username.value, '아이디를 입력해 주세요.'],
  [password.value, '비밀번호를 입력해 주세요.']
].some(([field, message]) => checkField(field, message))

const handleLoginError = (e: unknown) => {
  if (e instanceof AxiosError) {
    const statusCode = e.response?.status;
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
    console.error(`[JavaScript Error] ${e.message}`)
  } else {
    console.error('알 수 없는 오류가 발생했습니다.', e)
  }
}

/** event handler */
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
</script>

<style scoped>
html,
body,
.v-application {
  height: 100%;
}
</style>
