import type { JsonListDTO, CreateJsonInDTO, UpdateJsonInDTO } from '@/generate/json/api'
const JsonControllerApi = new API.JSON.JsonControllerApi(configuration, configuration.basePath, axiosInstance)

export const useJsonStore = defineStore('jsonStore', () => {
  const jsonList = reactive<JsonListDTO>({})
  const jsonInput = ref('')
  const eventTriggered = ref(false)

  const triggerEvent = (data: string) => {
    jsonInput.value = data
    eventTriggered.value = true
  }

  const resetEvent = () => {
    eventTriggered.value = false
  }

  const fetchJsonList = async () => {
    const res = await JsonControllerApi.getJsonList()
    Object.assign(jsonList, res.data)
  }

  const createJson = async (data: CreateJsonInDTO) => {
    await JsonControllerApi.createJson(data)
    await fetchJsonList()
  }

  const updateJson = async (data: UpdateJsonInDTO) => {
    await JsonControllerApi.updateJson(data)
    await fetchJsonList()
  }

  const deleteJson = async (json_id: number) => {
    await JsonControllerApi.deleteJson(json_id)
    await fetchJsonList()
  }

  return {
    jsonInput,
    eventTriggered,
    triggerEvent,
    resetEvent,
    jsonList,
    fetchJsonList,
    createJson,
    updateJson,
    deleteJson
  }
})
