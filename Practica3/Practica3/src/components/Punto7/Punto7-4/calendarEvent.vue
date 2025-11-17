<template>
  <div class="calendar">
    <div class="calendar-header">
      <div v-for="day in ['L', 'M', 'X', 'J', 'V', 'S', 'D']" :key="day" class="day-header">
        {{ day }}
      </div>
    </div>
    <div class="calendar-grid">
      <div 
        v-for="day in calendarGrid" 
        :key="day.date.getTime()" 
        class="calendar-cell"
        :class="{ 'is-not-current-month': !day.isCurrentMonth }"
      >
        <div class="day-number">{{ day.date.getDate() }}</div>
        <div 
          v-for="event in day.events" 
          :key="event.title" 
          class="event"
          :class="`event-${event.type}`"
        >
          {{ event.title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { calendarEvent } from '@/types/calendarEvent';
import { isSameDay } from '@/utils/dateUtils';
import { calendar } from '@/data/mockCalendar';

interface Props {
  year?: number;
  month?: number;
  events?: calendarEvent[];
}

const props = withDefaults(defineProps<Props>(), {
  year: () => new Date().getFullYear(),
  month: () => new Date().getMonth(),
  events: () => calendar
});

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  events: calendarEvent[];
}

const calendarGrid = computed((): CalendarDay[] => {
  const firstDayOfMonth = new Date(props.year, props.month, 1);
  const daysInMonth = new Date(props.year, props.month + 1, 0).getDate();
  const startDay = firstDayOfMonth.getDay();
  const paddingDays = startDay === 0 ? 6 : startDay - 1;
  
  const grid: CalendarDay[] = [];
  
  // Días de relleno del mes anterior
  for (let i = paddingDays; i > 0; i--) {
    const date = new Date(props.year, props.month, 1 - i);
    grid.push({ date, isCurrentMonth: false, events: [] });
  }
  
  // Días del mes actual
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(props.year, props.month, day);
    const dayEvents = props.events.filter(event => isSameDay(event.date, date));
    grid.push({ date, isCurrentMonth: true, events: dayEvents });
  }
  
  // Días de relleno del mes siguiente
  const totalCells = Math.ceil(grid.length / 7) * 7;
  let nextMonthDay = 1;
  while (grid.length < totalCells) {
    const date = new Date(props.year, props.month + 1, nextMonthDay);
    grid.push({ date, isCurrentMonth: false, events: [] });
    nextMonthDay++;
  }
  
  return grid;
});
</script>

<style scoped>
.calendar {
  max-width: 800px;
  margin: 20px auto;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  margin-bottom: 1px;
}

.day-header {
  background: #f5f5f5;
  padding: 10px;
  text-align: center;
  font-weight: bold;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: #ddd;
}

.calendar-cell {
  background: white;
  min-height: 100px;
  padding: 5px;
  position: relative;
}

.is-not-current-month {
  background: #f9f9f9;
  opacity: 0.6;
}

.day-number {
  font-weight: bold;
  margin-bottom: 5px;
}

.event {
  font-size: 10px;
  padding: 2px 4px;
  margin: 1px 0;
  border-radius: 3px;
  color: white;
}

.event-busy {
  background: #ff4444;
}

.event-tentative {
  background: #ffaa00;
}

.event-holiday {
  background: #44aa44;
}
</style>