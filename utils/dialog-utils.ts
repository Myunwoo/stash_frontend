interface ErrorOption {
  notifyType?: string,
  throwError?: boolean,
  message?: string,
  statusCode?: number,
  path?: string
}

interface DialogOption {
  header?: string,
  size?: string,
  confirmLabel?: string,
  cancelLabel?: string,
  btnCloseShow?: boolean,
  textBtn?: string,
  bgDim?: boolean
}

let resolveCallback: any

const showAlert = (msg: string, options?: DialogOption) => {
  const dialogStore = useDialogStore()
  const defaultOption = {
    btnOkShow: true,
    btnCancelShow: false,
    btnCloseShow: true,
    bgDim: true,
    ...options
  }
  dialogStore.showComAlert(msg, 'alert', defaultOption)
  return new Promise((resolve) => {
    resolveCallback = resolve
  })
}

const showConfirm = (msg:string, options?: DialogOption) => {
  const dialogStore = useDialogStore()
  const defaultOption = {
    btnCancelShow: true,
    btnOkShow: true,
    btnCloseShow: true,
    bgDim: true, // ssp1.0과 동일하게 닫히지 않도록 수정
    ...options
  }

  dialogStore.showComConfirm(msg, 'confirm', defaultOption)
  return new Promise((resolve) => {
    resolveCallback = resolve
  })
}

const closeDialog = () => {
  const dialogStore = useDialogStore()
  dialogStore.dialogInitialState()
}

const dialogOnConfirm = () => {
  closeDialog()
  resolveCallback(true)
}

const dialogOnCancel = () => {
  closeDialog()
  resolveCallback(false)
}

export {
  showAlert,
  showConfirm,
  closeDialog,
  dialogOnConfirm,
  dialogOnCancel
}