<template>
  <v-container class="py-4">
    <AtomCalendar :initialDate="currentDate" :events="events" @onDateSelect="selectDate">
      <template #events="{ day }">
        <div v-if="day.events.length > 0" class="event-titles">
          <div v-for="(event, index) in day.events.slice(0, 3)" :key="index" class="event-title">
            {{ event.title }}
          </div>
        </div>
      </template>
    </AtomCalendar>

    <!-- 선택된 날짜의 일정 표시 -->
    <v-card outlined v-if="selectedDate">
      <v-card-title>{{ selectedDate.date }}의 일정</v-card-title>
      <v-divider />
      <v-list>
        <v-list-item v-for="(event, index) in selectedDate.events" :key="index">
          <div>
            <div class="font-weight-medium">{{ event.title }}</div>
            <div class="text-grey">{{ event.details }}</div>
          </div>
        </v-list-item>
      </v-list>
      <v-card-text v-if="selectedDate.events.length === 0" class="text-center">
        <!-- 플로팅이 아닌 AtomPlus 버튼 -->
        <AtomPlus size="medium" :isFloating="false" @click="onFloatingButtonClick" />
      </v-card-text>
      <v-card-text v-else class="text-center">
        <!-- 일정이 있을 때 마지막 일정 아래 플로팅이 아닌 AtomPlus 버튼 -->
        <AtomPlus size="medium" :isFloating="false" @click="onFloatingButtonClick" />
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
import dayjs from 'dayjs'
import type { CreateStashInDTO } from '@/generate/stash/api'

const stashStore = useStashStore()
const currentDate = ref(dayjs().format('YYYY-MM-DD'))
const selectedDate = ref<{
  date: string
  events: { title: string; details: string }[]
} | null>(null)

const events = computed(() => {
  return stashStore.stashList.stashDtlList
    ? stashStore.stashList.stashDtlList.map(stash => ({
      title: stash.title,
      details: stash.description || '',
      date: dayjs(stash.start_time, 'YYYYMMDDHHmm').format('YYYY-MM-DD'),
    }))
    : []
})

const selectDate = (day: { date: string; events: any[] }) => {
  selectedDate.value = {
    date: day.date,
    events: day.events,
  }
}

const isAddDialogOpen = ref(false)

// 일정 생성
const onCreateStash = async (data: any) => {
  const createParam: CreateStashInDTO = {
    title: data.title,
    description: data.description,
    start_time: data.start_time,
    end_time: data.end_time
  }
  await stashStore.createStash(createParam)
  // 선택된 날짜 업데이트
  if (selectedDate.value) {
    const updatedEvents = events.value.filter(
      event => event.date === selectedDate.value?.date
    )
    selectedDate.value = {
      date: selectedDate.value.date,
      events: updatedEvents,
    }
  }
}

const onFloatingButtonClick = () => {
  isAddDialogOpen.value = true
}

onMounted(async () => {
  await stashStore.fetchStashList()
})
</script>

<style scoped>
.text-center {
  text-align: center
}

.day-cell {
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.day-content {
  position: relative;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}

.event-titles {
  width: 100%;
  margin-top: 4px;
}

.event-title {
  font-size: 10px;
  text-align: left;
  background-color: #3f51b5;
  color: white;
  padding: 2px 4px;
  border-radius: 3px;
  margin-top: 2px;
  height: 16px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>