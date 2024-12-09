export const useDialogStore = defineStore({
  id: 'dialog',
  state: () => {
    return {
      dialogShow: false,
      dialogType: '',
      dialogMsg: '',
      dialogOptions: {
        header: '',
        size: '',
        confirmLabel: '',
        cancelLabel: '',
        btnOkShow: false,
        btnCloseShow: false,
        btnCancelShow: false,
        textBtn: '',
        bgDim: false
      }
    }
  },
  actions: {
    showComAlert(msg: string, dialogType: string, op?: object) {
      this.$patch({
        dialogShow: true,
        dialogType,
        dialogMsg: msg,
        dialogOptions: op
      })
    },

    // open confirm popup
    showComConfirm(msg: string, dialogType: string, op?: object) {
      this.$patch({
        dialogShow: true,
        dialogType,
        dialogMsg: msg,
        dialogOptions: op
      })
    },

    showComError(msg: string, dialogType: string, op?: object) {
      this.$patch({
        dialogShow: true,
        dialogType,
        dialogMsg: msg,
        dialogOptions: op
      })
    },

    dialogInitialState() {
      this.$patch({
        dialogShow: false,
        dialogMsg: '',
        dialogOptions: {
          header: '',
          size: '',
          confirmLabel: '',
          cancelLabel: '',
          btnOkShow: false,
          btnCloseShow: false,
          btnCancelShow: false,
          textBtn: '',
          bgDim: false
        }
      })
    }
  }
})
