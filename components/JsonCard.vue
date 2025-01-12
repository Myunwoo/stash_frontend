<template>
  <div class="card" @click="onClickCard">
    <div class="card__header">
      <div class="card__title">{{ props.title }}</div>
      <div class="card__actions">
        <button class="card__chip card__chip--delete" @click.stop="onClickDelete">✕</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  id: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    default: '',
  },
  json_content: {
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
  'delete'
])
const jsonStore = useJsonStore()

const onClickDelete = async () => {
  const confirmVal = await showConfirm('삭제하시겠습니까?')
  if (confirmVal) {
    jsonStore.deleteJson(props.id)
  }
}

const onClickCard = () => {
  jsonStore.triggerEvent(props.json_content)
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
