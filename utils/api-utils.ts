import axios, { type AxiosError, type AxiosPromise, type AxiosResponse } from 'axios'
import { Configuration } from '@/generate/configuration'
import * as API from '@/generate'
import { setCookie, getCookie, removeCookie } from '@/utils/cookie-utils'

type AccessToken = string;
type SubscriberCallback = (newAccessToken: AccessToken) => void;
// 현재 처리 중 request 수
let activeRequestCount = 0
const axiosInstance = axios.create()
let isRefreshing = false
let failedQueue: {
  resolve: (token: string) => void
  reject: (error: any) => void
}[] = []
const configuration = new Configuration({
  basePath: '/api'
})

const AuthControllerApi = new API.AUTH.AuthControllerApi(configuration, configuration.basePath, axiosInstance)

let subscribers: SubscriberCallback[] = [];

const goLogin = () => {
  const router = useRouter()
  router.push('/login')
}

const logout = () => {
  removeCookie('SAT')
  removeCookie('SRT')
  const router = useRouter()
  router.push('/login')
}

const onAccessTokenFetched = (accessToken: AccessToken) => {
  subscribers.forEach(callback => callback(accessToken));
  subscribers = [];
}

const addSubscriber = (callback: SubscriberCallback) => {
  subscribers.push(callback);
}

const increaseRequestCount = () => {
  activeRequestCount++
}

const decreaseRequestCount = () => {
  activeRequestCount--
  if (activeRequestCount === 0) {
    showLoading(false)
  }
}

// request interceptor
axiosInstance.interceptors.request.use((config) => {
  increaseRequestCount()
  showLoading(true)
  const accessToken = getCookie('SAT')
  if (isNotEmpty(accessToken)) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
}, (error) => Promise.reject(error))

// response interceptor
axiosInstance.interceptors.response.use((response) => {
  decreaseRequestCount()
  return response
}, async (error: AxiosError) => {
  decreaseRequestCount()

  const originalRequest = error.config
  // 액세스 토큰 만료
  if (error.response?.status === 401) {
    const refreshToken = getCookie('SRT')
    if (!refreshToken) {
      removeCookie('SAT')
      removeCookie('SRT')
      goLogin()
      return
    }

    // 액세스 토큰 재발급 중
    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((accessToken) => {
        if (originalRequest) {
          // failedQueue의 요소들이 resolve 되는 시점에 실행됨
          // 재발급된 accessToken으로 재설정
          if (originalRequest?.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`
          }
          return axios(originalRequest)
        } else {
          throw new Error("Original Request Undefined")
        }
        // failedQueue의 요소들이 reject 되는 시점에 실행됨
      }).catch(err => Promise.reject(err))
    }

    isRefreshing = true
    return new Promise<AxiosResponse>((resolve, reject) => {
      AuthControllerApi.refresh({
        srt: `${refreshToken}`
      })
        .then(({ data }) => {
          console.log('토큰 재발급 성공', data)
          const { sat = '' } = data
          setCookie('SAT', sat)
          if (originalRequest) {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${sat}`
            }
            // 최초 401오류를 발생시켰던 요청을 재호출
            resolve(axios(originalRequest))
            // 실패 큐에 저장된 요청들을 재호출
            failedQueue.forEach(queue => queue.resolve(sat))
          } else {
            throw new Error("Original Request Undefined")
          }
        })
        .catch((error) => {

          failedQueue.forEach(queue => queue.reject(error))
          reject(error)
          logout()
        })
        .finally(() => {
          failedQueue = []
          isRefreshing = false
        })
    })
  } else if (error.response?.status === 403) {
    console.log('403 에러 발생')
    logout()
  }
  return Promise.reject(error)
})

export {
  configuration,
  axiosInstance,
  API,
  logout,
  type AxiosError
}
