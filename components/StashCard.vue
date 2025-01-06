<template>
  <div class="card" @click="onClickModify">
    <div class="card__header">
      <div class="card__title">{{ props.title }}</div>
      <div class="card__actions">
        <button class="card__chip card__chip--delete" @click.stop="onClickDelete">✕</button>
      </div>
    </div>
    <div class="card__description">{{ props.description }}</div>
  </div>

  <StashModifyDialog
    :isOpen="isModifyDialogOpen"
    :title="props.title"
    :description="props.description"
    :stash_id="props.stash_id"
    @update:isOpen="isModifyDialogOpen = $event"
  />
</template>

<script setup lang="ts">
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
  username: {
    type: String,
    default: ''
  }
})

const emit = defineEmits([
  'update',
  'delete',
  'share'
])
const stashStore = useStashStore()
const isModifyDialogOpen = ref(false)

const onClickModify = () => {
  isModifyDialogOpen.value = true
}

const onClickDelete = async () => {
  const confirmVal = await showConfirm('삭제하시겠습니까?')
  if (confirmVal) {
    stashStore.deleteStash(props.stash_id)
  }
}
</script>

<style scoped>
.card {
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-left: auto;
  margin-right: auto;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
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
  padding: 2px 10px;
  font-size: 0.5rem;
  border: none;
  border-radius: 16px;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.2s;
}

.card__chip--delete {
  background: none;
  font-size: 1.1rem;
  font-weight: bold;
  color: #ff7043;
  transition: transform 0.1s;
}

.card__chip--delete:hover {
  transform: scale(1.2);
}

.card__description {
  font-size: 0.85rem;
  color: grey;
  line-height: 1.2;
}
</style>
