<template>
  <v-card outlined>
    <!-- 월 이동 버튼과 현재 표시 월 -->
    <v-card-actions>
      <v-btn icon @click="prevMonth">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <span class="text-h6">{{ displayMonth }}</span>
      <v-btn icon @click="nextMonth">
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-card-actions>

    <v-divider />
    <v-card-text>
      <!-- 달력 -->
      <v-row v-for="week in calendarDays" :key="week[0]?.date" no-gutters>
        <v-col v-for="day in week" :key="day.date" class="text-center day-cell">
          <div @click="selectDate(day)" class="day-content">
            <strong>{{ day.day }}</strong>
            <slot name="events" :day="day">
              <!-- 기본적으로 일정 타이틀을 표시 -->
              <div v-if="day.events.length > 0" class="event-titles">
                <div v-for="(event, index) in day.events.slice(0, 3)" :key="index" class="event-title">
                  {{ event.title }}
                </div>
              </div>
            </slot>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'

interface Event {
  title: string
  details: string
  date: string
}

interface Day {
  date: string
  day: number
  events: Event[]
}

// Props
const props = defineProps<{
  initialDate: string
  events: Event[]
  onDateSelect?: (day: Day) => void
}>()

const currentDate = ref(dayjs(props.initialDate))
const selectedDate = ref<Day | null>(null)

// 현재 표시할 월
const displayMonth = computed(() => currentDate.value.format('MMMM YYYY'))

// 월 이동 함수
const prevMonth = () => {
  currentDate.value = currentDate.value.subtract(1, 'month')
}
const nextMonth = () => {
  currentDate.value = currentDate.value.add(1, 'month')
}

// 달력 데이터 생성 함수
const calendarDays = computed(() => {
  const startOfMonth = currentDate.value.startOf('month')
  const endOfMonth = currentDate.value.endOf('month')
  const startDate = startOfMonth.startOf('week')
  const endDate = endOfMonth.endOf('week')

  let date = startDate
  const weeks: Day[][] = []

  while (date.isBefore(endDate)) {
    const week: Day[] = Array(7)
      .fill(null)
      .map(() => {
        const dayData: Day = {
          date: date.format('YYYY-MM-DD'),
          day: date.date(),
          events: props.events.filter(event => event.date === date.format('YYYY-MM-DD')),
        }
        date = date.add(1, 'day')
        return dayData
      })
    weeks.push(week)
  }
  return weeks
})

// 날짜 선택
const selectDate = (day: Day) => {
  selectedDate.value = day
  if (props.onDateSelect) props.onDateSelect(day)
}
</script>

<style scoped>
.text-center {
  text-align: center;
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
