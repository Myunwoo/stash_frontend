<template>
  <v-container class="py-4">
    <!-- AtomCalendar 컴포넌트 -->
    <AtomCalendar :initialDate="currentDate" :events="events" @onDateSelect="selectDate">
      <template #events="{ day }">
        <div v-if="day.events.length > 0" class="event-dot"></div>
      </template>
    </AtomCalendar>

    <!-- 선택된 날짜 일정 표시 -->
    <v-card outlined v-if="selectedDate">
      <v-card-title>{{ selectedDate.date }}의 일정</v-card-title>
      <v-divider />
      <v-list>
        <v-list-item v-for="(event, index) in selectedDate.events" :key="index">
          <v-list-item-title>{{ event.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ event.details }}</v-list-item-subtitle>
        </v-list-item>
      </v-list>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import { ref, computed, onMounted } from 'vue'
import { useStashStore } from '@/stores/stashStore'

// Store 연결
const stashStore = useStashStore()

// 현재 날짜
const currentDate = ref(dayjs().format('YYYY-MM-DD'))

// 선택된 날짜
const selectedDate = ref<{
  date: string
  events: { title: string; details: string }[]
} | null>(null)

// stashStore 데이터를 기반으로 이벤트 계산
const events = computed(() => {
  return stashStore.stashList.stashDtlList
    ? stashStore.stashList.stashDtlList.map(stash => ({
      title: stash.title,
      details: stash.description || '',
      date: dayjs(stash.start_time, 'YYYYMMDDHHmm').format('YYYY-MM-DD'),
    }))
    : []
})

// 날짜 선택 핸들러
const selectDate = (day: { date: string; events: any[] }) => {
  selectedDate.value = {
    date: day.date,
    events: day.events,
  }
}

// 데이터 초기화
onMounted(async () => {
  await stashStore.fetchStashList()
})
</script>

<style scoped>
.event-dot {
  width: 6px;
  height: 6px;
  background-color: orange;
  border-radius: 50%;
  margin: 4px auto;
}
</style>
