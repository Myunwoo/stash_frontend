<template>
  <div class="dialog" v-if="isActive">
    <div class="dialog__overlay" @click="closeDialog"></div>
    <div class="dialog__content">
      <div class="dialog__header">
        <label class="dialog__label">Title</label>
        <input
          v-model="editableTitle"
          type="text"
          class="dialog__input dialog__input--title"
          placeholder="Title"
        />
      </div>
      <div class="dialog__body">
        <label class="dialog__label">Description</label>
        <textarea
          v-model="editableDescription"
          class="dialog__textarea"
          placeholder="Content"
        ></textarea>
      </div>
      <div class="dialog__footer">
        <button class="dialog__button dialog__button--cancel" @click="onCancel">
          취소
        </button>
        <button
          class="dialog__button dialog__button--confirm"
          @click="onConfirm"
        >
          {{ props.isCreateMode ? '생성' : '수정' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  title: String,
  stash_id: Number,
  description: String,
  startDate: String,
  endDate: String,
  isCreateMode: Boolean,
})

const stashStore = useStashStore()

const emit = defineEmits(['update:isOpen', 'cancel', 'modify', 'create'])
const isActive = ref(false)
const editableTitle = ref('')
const editableDescription = ref('')

const resetFields = () => {
  editableTitle.value = ''
  editableDescription.value = ''
}

watch(
  () => props.isOpen,
  (newVal) => {
    isActive.value = newVal
    if (newVal) {
      editableTitle.value = props.title || ''
      editableDescription.value = props.description || ''
    }
  },
  { immediate: true }
)

const closeDialog = () => {
  isActive.value = false
  emit('update:isOpen', false)
  resetFields()
}

const onCancel = () => {
  closeDialog()
  emit('cancel')
}

const onConfirm = async () => {
  const data = {
    title: editableTitle.value,
    description: editableDescription.value,
    start_time: '20001018',
    end_time: '20001018'
  }

  if (props.isCreateMode) {
    await stashStore.createStash(data)
    emit('create', data)
  } else {
    await stashStore.updateStash({...data, stash_id: props.stash_id})
    emit('modify', data)
  }
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

.dialog__input {
  width: 100%;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 8px;
}

.dialog__textarea {
  width: 100%;
  height: 100px;
  padding: 8px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
}

.dialog__label {
  font-size: 0.875rem;
  color: #555;
}

.dialog__footer {
  margin-top: 12px;
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
