import type { GetUserInDTO, GetUserOutDTO, UpdateUserInDTO } from '@/generate/auth/api'
const AuthControllerApi = new API.AUTH.AuthControllerApi(configuration, configuration.basePath, axiosInstance)

export const useUserStore = defineStore('userStore', () => {
  const name = ref('')
  const username = ref('')

  const fetchUserInfo = async (usernameParam: string) => {
    const param: GetUserInDTO = { username: usernameParam }
    const { data } = await AuthControllerApi.getUser(param)
    name.value = data.name ?? ''
    username.value = data.username ?? ''
  }

  const updateUserInfo = async (param: UpdateUserInDTO) => {
    const res = await AuthControllerApi.updateUser(param)
    name.value = res.data.name || ''
    username.value = res.data.username || ''
  }

  const clearUserInfo = () => {
    name.value = ''
    username.value = ''
  }

  return {
    name,
    username,
    fetchUserInfo,
    updateUserInfo,
    clearUserInfo,
  }
})
