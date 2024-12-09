interface ErrorOption {
  notifyType?: string, // alert, toast, redirect
  throwError?: boolean, // true 시 에러페이지
  message?: string, // 에러 메시지
  statusCode?: number, // Http 상태 코드
  path?: string // Redirect 시 이동할 경로
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
  closeDialog,
  dialogOnConfirm,
  dialogOnCancel
}