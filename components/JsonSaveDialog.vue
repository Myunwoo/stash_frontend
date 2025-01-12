<template>
  <div class='dialog' v-if='isActive'>
    <div class='dialog__overlay' @click='closeDialog'></div>
    <div class='dialog__content'>
      <h2 class='dialog__title'>Enter Title</h2>
      <input v-model='editableTitle' type='text' class='dialog__input' placeholder='Enter title here' />
      <div class='dialog__footer'>
        <button class='dialog__button dialog__button--cancel' @click='onCancel'>
          Cancel
        </button>
        <button class='dialog__button dialog__button--confirm' @click='onConfirm'>
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
const props = defineProps({
  isOpen: Boolean
})

const emit = defineEmits(['update:isOpen', 'confirm'])
const isActive = ref(false)
const editableTitle = ref('')

watch(
  () => props.isOpen,
  (newVal) => {
    isActive.value = newVal
    if (!newVal) editableTitle.value = ''
  },
  { immediate: true }
)

const closeDialog = () => {
  isActive.value = false
  emit('update:isOpen', false)
}

const onCancel = () => {
  closeDialog()
}

const onConfirm = () => {
  if (!editableTitle.value.trim()) {
    showAlert('제목을 입력해 주세요.')
    return
  }
  emit('confirm', editableTitle.value)
  closeDialog()
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
  z-index: 1;
}

.dialog__content {
  position: relative;
  z-index: 2;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.dialog__title {
  font-size: 1.5rem;
  margin-bottom: 16px;
  text-align: center;
}

.dialog__input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
}

.dialog__footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.dialog__button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dialog__button--cancel {
  background-color: #f5f5f5;
  color: #333;
}

.dialog__button--cancel:hover {
  background-color: #e0e0e0;
}

.dialog__button--confirm {
  background-color: #ff7f32;
  color: white;
}

.dialog__button--confirm:hover {
  background-color: #ff5400;
}
</style>
