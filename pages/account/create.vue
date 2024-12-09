<template>
  <v-container class="d-flex flex-column justify-center align-center" fill-height>
    <h2 class="text-h5 mb-4">회원가입</h2>

    <!-- 이름 입력 -->
    <v-text-field label="이름" v-model="name" outlined clearable prepend-inner-icon="mdi-account-circle" class="mb-4"
      style="max-width: 400px; width: 100%;" />

    <!-- 아이디 입력 -->
    <v-text-field label="아이디" v-model="username" outlined clearable prepend-inner-icon="mdi-account" class="mb-4"
      style="max-width: 400px; width: 100%;" />

    <!-- 비밀번호 입력 -->
    <v-text-field label="비밀번호" v-model="password" outlined clearable prepend-inner-icon="mdi-lock" type="password"
      class="mb-4" style="max-width: 400px; width: 100%;" />

    <!-- 비밀번호 확인 입력 -->
    <v-text-field label="비밀번호 확인" v-model="confirmPassword" outlined clearable prepend-inner-icon="mdi-lock-check"
      type="password" class="mb-4" style="max-width: 400px; width: 100%;" />

    <!-- 회원가입 버튼 -->
    <v-btn color="primary" class="my-4" @click="onClickSignUp" style="max-width: 400px; width: 100%;">회원가입</v-btn>

    <v-btn @click="goToLogin" class="text-caption" style="max-width: 400px; width: 100%;">이미 계정이 있으신가요? 로그인</v-btn>
  </v-container>
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

/** event handler */
// 회원가입 클릭
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

// 회원가입 에러 처리
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
html,
body,
.v-application {
  height: 100%;
}
</style>
