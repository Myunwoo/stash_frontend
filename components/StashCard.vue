<template>
  <div class="card">
    <div class="card__header">
      <div class="card__title">{{ props.title }}</div>
      <div class="card__actions">
        <button class="card__chip card__chip--modify" @click="onClickModify">수정</button>
        <button class="card__chip card__chip--delete" @click="onClickDelete">삭제</button>
      </div>
    </div>
    <div class="card__description">{{ props.description }}</div>
  </div>

  <AddModifyStashDialog
    :isOpen="isModifyDialogOpen"
    :title="props.title"
    :description="props.description"
    @update:isOpen="isModifyDialogOpen = $event"
    @modify="onModify"
  />
</template>

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

const onClickModify = () => {
  isModifyDialogOpen.value = true
}

const onClickDelete = async () => {
  const confirmVal = await showConfirm('삭제하시겠습니까?')
  if (confirmVal) {
    emit('delete', props.stash_id)
  }
}

const onModify = (data: any) => {
  const updateData = {
    stash_id: props.stash_id,
    ...data
  }
  emit('update', updateData)
}
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.card__title {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
}

.card__actions {
  display: flex;
  gap: 8px;
}

.card__chip {
  padding: 6px 12px;
  font-size: 0.875rem;
  border: 1px solid transparent;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.card__chip--modify {
  background-color: #ffa726;
}

.card__chip--modify:hover {
  background-color: #fb8c00;
  transform: scale(1.05);
}

.card__chip--delete {
  background-color: #ff7043;
}

.card__chip--delete:hover {
  background-color: #e64a19;
  transform: scale(1.05);
}

.card__description {
  font-size: 0.85rem;
  color: grey;
  line-height: 1.2;
}
</style>
