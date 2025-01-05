<template>
  <div class="dialog" v-show="isActive">
    <div class="dialog__overlay" :class="{ dimmed: bgDim }"></div>
    <div class="dialog__container">
      <main class="dialog__content">
        <div v-dompurify-html="props.msg"></div>
        <button
          v-show="props.type === 'confirm' && props.option?.textBtn"
          class="dialog__button dialog__button--text"
          @click="emitTxtBtn"
        >
          {{ props.option?.textBtn }}
        </button>
      </main>
      <footer class="dialog__actions">
        <button
          v-show="btnCancelShow"
          class="dialog__button dialog__button--cancel"
          @click="emitClose"
        >
          {{ cancelLabel }}
        </button>
        <button
          v-show="btnOkShow"
          class="dialog__button dialog__button--confirm"
          @click="emitConfirm"
        >
          {{ confirmLabel }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
interface dialogOption {
  btnOkShow?: boolean,
  confirmLabel?: string,
  btnCloseShow?: boolean,
  btnCancelShow?: boolean,
  cancelLabel?: string,
  textBtn?: string,
  bgDim?: boolean,
}

interface Props {
  visible: boolean,
  type?: string,
  msg?: string,
  option?: dialogOption
}

const props = withDefaults(defineProps<Props>(), {
  visible: false,
  type: 'alert',
  msg: ''
})

const emit = defineEmits([
  'confirm',
  'close',
  'txtLink'
])

const btnOkShow = computed(() => props.type !== 'error')
const btnCancelShow = computed(() => props.type === 'confirm' ? true : props.option?.btnCancelShow)
const confirmLabel = computed(() => props.option?.confirmLabel || '확인')
const cancelLabel = computed(() => props.option?.cancelLabel || '취소')
const cProps = computed(() => props)
const bgDim = ref(false)
const isActive = ref(false)

watch(cProps, (newProps) => {
  bgDim.value = newProps.option?.bgDim || false
  isActive.value = newProps.visible
}, { deep: true })

watch(isActive, (newVisible) => {
  if (!newVisible) {
    emitClose()
  }
}, { deep: true })

const emitConfirm = () => {
  emit('confirm', true)
}

const emitClose = () => {
  emit('close', false)
}

const emitTxtBtn = () => {
  emit('txtLink', true)
}
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog__overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog__container {
  position: relative;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 16px;
  max-width: 500px;
  width: 90%;
  z-index: 10;
}

.dialog__content {
  font-size: 1rem;
  color: #444;
  margin-bottom: 16px;
}

.dialog__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.dialog__button {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dialog__button--text {
  background-color: transparent;
  color: #ff7f32;
  text-decoration: underline;
}

.dialog__button--text:hover {
  color: #ff5400;
}

.dialog__button--cancel {
  background-color: #f5f5f5;
  color: #333;
}

.dialog__button--cancel:hover {
  background-color: #e0e0e0;
}

.dialog__button--confirm {
  background-color: #ff7043;
  color: #fff;
}

.dialog__button--confirm:hover {
  background-color: #e64a19;
}
</style>
