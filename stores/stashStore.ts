import type { StashListDTO, CreateStashInDTO, UpdateStashInDTO } from '@/generate/stash/api'
const StashControllerApi = new API.STASH.StashControllerApi(configuration, configuration.basePath, axiosInstance)

export const useStashStore = defineStore('stashStore', () => {
  const stashList = reactive<StashListDTO>({})
  const fetchStashList = async () => {
    const res = await StashControllerApi.getStashList()
    Object.assign(stashList, res.data)
  }

  const createStash = async (data: CreateStashInDTO) => {
    await StashControllerApi.createStash(data)
    await fetchStashList()
  }

  const updateStash = async (data: UpdateStashInDTO) => {
    await StashControllerApi.updateStash(data)
    await fetchStashList()
  }

  const deleteStash = async (stash_id: number) => {
    await StashControllerApi.deleteStash(stash_id)
    await fetchStashList()
  }

  return {
    stashList,
    fetchStashList,
    createStash,
    updateStash,
    deleteStash,
  }
})
