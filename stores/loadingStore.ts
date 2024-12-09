export const useLoadingStore = defineStore({
  id: 'loading',
  state: () => {
    return {
      loadingShow: false
    }
  },
  actions: {
    showLoading(visible: boolean) {
      this.$patch({
        loadingShow: visible
      })
    }
  }
})