<script setup lang="ts">
// props
const props = defineProps({
  stash_id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: ''
  },
  start_time: {
    type: String,
    default: ''
  },
  end_time: {
    type: String,
    default: ''
  },
  is_shared: {
    type: Boolean,
    default: false
  },
  username: {
    type: String,
    default: ''
  }
})

// emits
const emit = defineEmits([
  'update',
  'delete',
  'share'
])

// 로딩 다이얼로그
const loadingStore = useLoadingStore()
// 수정 다이얼로그 노출 여부
const isModifyDialogOpen = ref(false)
// 수정/삭제 다이얼로그 노출 여부
const isConfirmDialogOpen = ref(false)

const confirmDialogConfig = ref({
  message: '',
  confirmText: '',
  cancelText: '',
  confirmColor: '',
})

const onClickModify = () => {
  isModifyDialogOpen.value = true
}

const onClickDelete = () => {
  confirmDialogConfig.value = {
    message: '삭제하시겠습니까?',
    confirmText: '삭제',
    cancelText: '취소',
    confirmColor: 'red',
  }
  isConfirmDialogOpen.value = true
}

const onCancel = () => { }

const onModify = (data: any) => {
  const updateData = {
    stash_id: props.stash_id,
    ...data
  }
  emit('update', updateData)
}

const onConfirmDelete = () => {
  emit('delete', props.stash_id)
}

const onConfirmShare = () => {
  console.log('공유 확인')
}
</script>

<template>
  <v-card>
    <v-card-title>{{ props.title }}</v-card-title>
    <v-card-text>{{ props.description }}</v-card-text>
    <v-card-actions>
      <v-chip variant="outlined" @click="onClickModify">
        수정
      </v-chip>
      <v-chip variant="outlined" @click="onClickDelete">
        삭제
      </v-chip>
    </v-card-actions>
  </v-card>

  <AddModifyStashDialog :isOpen="isModifyDialogOpen" :title="props.title" :description="props.description"
    @update:isOpen="isModifyDialogOpen = $event" @cancel="onCancel" @modify="onModify" />

  <AtomConfirmDialog :isOpen="isConfirmDialogOpen" :message="confirmDialogConfig.message"
    :confirmText="confirmDialogConfig.confirmText" :cancelText="confirmDialogConfig.cancelText"
    :confirmColor="confirmDialogConfig.confirmColor" @update:isOpen="isConfirmDialogOpen = $event" @cancel="onCancel"
    @confirm="confirmDialogConfig.confirmText === '삭제' ? onConfirmDelete() : onConfirmShare()" />
</template>
