<template>
  <v-dialog v-model="isActive" max-width="500">
    <v-card>
      <v-card-title>
        <v-text-field v-model="editableTitle" label="Title" outlined dense></v-text-field>
      </v-card-title>
      <v-card-text>
        <v-textarea v-model="editableDescription" label="Content" outlined rows="4"></v-textarea>
        <v-text-field v-model="editableStartDate" label="Start Date" outlined dense type="date"></v-text-field>
        <v-text-field v-model="editableEndDate" label="End Date" outlined dense type="date"></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text @click="onCancel">취소</v-btn>
        <v-btn text color="primary" @click="onConfirm">{{ props.isCreateMode ? '생성' : '수정' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import dayjs from 'dayjs'

const props = defineProps({
  isOpen: Boolean,
  title: String,
  description: String,
  startDate: String,
  endDate: String,
  isCreateMode: Boolean,
})
const emit = defineEmits(['update:isOpen', 'cancel', 'modify', 'create'])
const isActive = ref(false)
const editableTitle = ref(props.title || '')
const editableDescription = ref(props.description || '')
const editableStartDate = ref(props.startDate || '') // 시작 날짜 상태
const editableEndDate = ref(props.endDate || '') // 끝나는 날짜 상태

watch(
  () => props.isOpen,
  (newVal) => {
    isActive.value = newVal
    if (newVal) {
      editableTitle.value = props.title || ''
      editableDescription.value = props.description || ''
      editableStartDate.value = props.startDate || ''
      editableEndDate.value = props.endDate || ''
    }
  }
)

// 다이얼로그 닫기
const closeDialog = () => {
  isActive.value = false
  emit('update:isOpen', false)
}

// 취소 버튼 클릭
const onCancel = () => {
  closeDialog()
  emit('cancel')
}

// 확인 버튼 클릭
const onConfirm = () => {
  closeDialog()
  const data = {
    title: editableTitle.value,
    description: editableDescription.value,
    start_time: dayjs(editableStartDate.value).format('YYYYMMDD'),
    end_time: dayjs(editableEndDate.value).format('YYYYMMDD'),
  }

  if (props.isCreateMode) {
    emit('create', data)
  } else {
    emit('modify', data)
  }
}
</script>


<style scoped>
.text-grey {
  color: grey;
}
</style>
