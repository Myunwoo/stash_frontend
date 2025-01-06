import { useLoadingStore } from '@/stores/loadingStore'

const showLoading = (visible:boolean) => {
  const loadingStore = useLoadingStore()
  loadingStore.showLoading(visible)
}
export { showLoading }
