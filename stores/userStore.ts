import type { GetUserInDTO, GetUserOutDTO } from '@/generate/auth/api'
const AuthControllerApi = new API.AUTH.AuthControllerApi(configuration, configuration.basePath, axiosInstance)

export const useUserStore = defineStore('userStore', () => {
  const name = ref('')
  const username = ref('')
  const profileImage = ref(null)

  const fetchUserInfo = async (usernameParam: string) => {
    const param: GetUserInDTO = { username: usernameParam }
    const { data } = await AuthControllerApi.getUser(param)
    name.value = data.name ?? ''
    username.value = `#${data.username}`
  }

  const clearUserInfo = () => {
    name.value = ''
    username.value = ''
    profileImage.value = null
  }

  return {
    name,
    username,
    profileImage,
    fetchUserInfo,
    clearUserInfo,
  }
})
