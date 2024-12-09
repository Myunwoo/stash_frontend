<template>
  <v-container class="d-flex flex-column justify-center align-center" fill-height>
    <h2 class="text-h5 mb-4">회원정보 변경</h2>

    <v-text-field label="이름" v-model="name" outlined clearable prepend-inner-icon="mdi-account-circle" class="mb-4"
      style="max-width: 400px; width: 100%;" />

    <v-text-field label="아이디" v-model="username" outlined readonly prepend-inner-icon="mdi-account" class="mb-4"
      style="max-width: 400px; width: 100%;" />

    <v-text-field label="새 비밀번호 (선택 사항)" v-model="password" outlined clearable prepend-inner-icon="mdi-lock"
      type="password" class="mb-4" style="max-width: 400px; width: 100%;" />

    <v-text-field label="새 비밀번호 확인" v-model="confirmPassword" outlined clearable prepend-inner-icon="mdi-lock-check"
      type="password" class="mb-4" style="max-width: 400px; width: 100%;" />

    <v-btn color="primary" class="my-4" @click="onClickUpdateUser" style="max-width: 400px; width: 100%;">
      변경하기
    </v-btn>

    <v-btn @click="goToHome" class="text-caption" style="max-width: 400px; width: 100%;">
      홈으로 이동
    </v-btn>
  </v-container>
</template>

<script setup lang="ts">
import { AxiosError } from 'axios'
import type { UpdateUserInDTO } from '@/generate/auth/api'

definePageMeta({
  middleware: 'auth',
  layout: 'with-toolbar'
})

const router = useRouter()
const userStore = useUserStore()
const AuthControllerApi = new API.AUTH.AuthControllerApi(configuration, configuration.basePath, axiosInstance)

const name = ref('')
const username = ref('')
const password = ref('')
const confirmPassword = ref('')

onMounted(async () => {
  await userStore.fetchUserInfo(getCookie('username'))
})

const validatePasswordMatch = () => {
  if (password.value !== confirmPassword.value) {
    showAlert('비밀번호와 비밀번호 확인이 일치하지 않습니다.')
    return false
  }
  return true
}

/** event handler */
// 회원정보 변경
const onClickUpdateUser = async () => {
  if (password.value && !validatePasswordMatch()) return

  const param: UpdateUserInDTO = {
    name: name.value,
    username: getCookie('username'),
    password: password.value || undefined,
  }

  console.log('param', param)

  try {
    await AuthControllerApi.updateUser(param)
    showAlert('회원정보가 성공적으로 변경되었습니다.')
    router.push('/')
  } catch (e) {
    handleUpdateUserError(e)
  }
}

// 회원정보 변경 에러 처리
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

// 홈으로 이동
const goToHome = () => {
  router.push('/')
}
</script>

<style scoped>
html,
body,
.v-application {
  height: 100%;
}
</style>
