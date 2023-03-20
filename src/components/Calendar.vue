<template>
  <div class="">
    <div class="calendar-init tile-item">
      <input
          readonly
          ref="startDateInput"
          v-on:focus="initDay('start')"
          v-model="startDate"
          placeholder="Start date"
          class="calendar-init__date"
          type="text">

      <span class="calendar-init__arrow">&#x2192;</span>

      <input
          readonly
          ref="endDateInput"
          v-on:focus="initDay('end')"
          v-model="endDate"
          placeholder="End date"
          class="calendar-init__date"
          type="text">
    </div>

    <Transition>
      <div
          v-if="showCalendar"
          v-on:mouseout="showCalendar=true"
          class="calendar">
        <div class="calendar-header">
          <div class="calendar-header__year">
            <button @click="previous('year')">
              &#x2190;
            </button>
            <h2>{{ getCurrentYear }}</h2>
            <button @click="next('year')">
              &#x2192;
            </button>
          </div>
          <div class="calendar-header__month">
            <button @click="previous('month')">
              &#x2190;
            </button>
            <h2>{{ getCurrentMonth }}</h2>
            <button @click="next('month')">
              &#x2192;
            </button>
          </div>
        </div>
        <div class="calendars-container">
          <div class="calendar-body">
            <div class="calendar-row header">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div class="calendar-row" v-for="week in getFirstMonthWeeks()">
              <div v-for="day in getWeekDays(week)"
                   :class="{ today: isToday(day) }" class="day"
                   v-on:click="selectDate(day);">
                <div class="day-number">{{ day.format('D') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Time :toggle="timeToggle" @timeDataCollected="timeSet" :startDateSet="startDate" :endDateSet="endDate"
          :startDate="start" :endDate="end"></Time>
    <Templates :toggle="templatesToggle" @templateDataCollected="templateSet"></Templates>
  </div>
</template>

<script setup>
import {ref, computed} from "vue";
import moment from "moment"
import Time from "./Time.vue";
import Templates from "./Templates.vue";

let props = defineProps({
  timeToggle: String,
  templatesToggle: String
})
//Moment variables for readable code *start*
let year = moment().year()
let month = moment().format("MMMM")
//Moment variables for readable code *end*

let range = ref([])
let endDateInput = ref(null)
let startDateInput = ref(null)

let startDate = ref(null)
let endDate = ref(null)

let start = ref({
  day: null,
  month: null,
  year: null
})

let end = ref({
  day: null,
  month: null,
  year: null
})

let selecting = ref(false)

let startDateInit = ref(false)
let endDateInit = ref(false)

let showCalendar = ref(false)

let time = ref({
  startDayHour: null,
  startDayMinutes: null,
  endDayHour: null,
  endDayMinutes: null,
})
////////////////////////////////////////////////////////////////////////////////////////////
// Calendar logic *start*
let monthStart = moment().startOf('month');
let monthEnd = moment().endOf('month');

let startTime = ref(monthStart)
let endTime = ref(monthEnd)


let previous = (unit) => {
  startTime.value = startTime.value.clone().subtract(1, `${unit}`);
  endTime.value = endTime.value.clone().subtract(1, `${unit}`);
}
let next = (unit) => {
  startTime.value = startTime.value.clone().add(1, `${unit}`);
  endTime.value = endTime.value.clone().add(1, `${unit}`);
}
let getFirstMonthWeeks = () => {
  let firstMonthDays = [];
  let currentDay = startTime.value.clone().startOf('week');
  while (currentDay.isBefore(startTime.value.clone().endOf('month'))) {
    firstMonthDays.push(currentDay);
    currentDay = currentDay.clone().add(1, 'day');
  }
  return chunkByWeek(firstMonthDays);
}
let isToday = (day) => {
  return moment().isSame(day, 'day');
}

let chunkByWeek = (arr) => {
  let result = [];
  let temp = [];
  for (let i = 0; i < arr.length; i += 1) {
    temp.push(arr[i]);
    if (i % 7 === 6) {
      result.push(temp);
      temp = [];
    }
  }
  if (temp.length > 0) {
    result.push(temp);
  }
  return result;
}
let getWeekDays = (week) => {
  let result = [];
  for (let i = 0; i < week.length; i += 1) {
    let day = week[i];
    result.push(day);
  }
  return result;
}


let getCurrentMonth = computed(() => {
  return startTime.value.format('MMMM');
})

let getCurrentYear = computed(() => {
  return startTime.value.format('YYYY');
})
// Calendar logic *end*
/////////////////////////////////////////////////////////////////////////////////////////////////
let initDay = (day) => {
  showCalendar.value = true
  if (day === 'start') {
    startDateInit.value = true
    endDateInit.value = false
  } else {
    startDateInit.value = false
    endDateInit.value = true
  }
}
// Selecting dates
let selectDate = (day) => {
  selecting.value = true
  if (startDateInit.value === true) {
    end.value.day = null
    end.value.month = null
    end.value.year = null
    endDate.value = null
    start.value.day = Number(day.format('D'))
    start.value.month = Number(day.format('M'))
    start.value.year = Number(day.format('Y'))
    startDate.value = `${start.value.day}/${start.value.month}/${start.value.year}`
    range.value.splice(0, 1, day.format('D'))
    endDateInput.value.focus();
    if (end.value.year < start.value.year || end.value.month < start.value.month || (end.value.year === start.value.year && end.value.month === start.value.month && end.value.day < start.value.day)) {
      end.value.day = null
      end.value.month = null
      end.value.year = null
      endDate.value = null
      range.value.splice(0, 1, day.format('D'))
    }
  } else {
    end.value.day = Number(day.format('D'))
    end.value.month = Number(day.format('M'))
    end.value.year = Number(day.format('Y'))
    endDate.value = `${end.value.day}/${end.value.month}/${end.value.year}`
    range.value.splice(1, 1, day.format('D'))
    if (end.value.year < start.value.year || end.value.month < start.value.month || (end.value.year === start.value.year && end.value.month === start.value.month && end.value.day < start.value.day)) {
      start.value.day = Number(day.format('D'))
      start.value.month = Number(day.format('M'))
      start.value.year = Number(day.format('Y'))
      startDate.value = `${start.value.day}/${start.value.month}/${start.value.year}`
      end.value.day = null
      end.value.month = null
      end.value.year = null
      endDate.value = null
      endDateInput.value.focus();
      range.value.splice(1, 1, day.format('D'))
    }
  }
}

let colorDay = (day) => {
  let days = Array.from(document.getElementsByClassName('day'))
  days.forEach((item, id) => {
    day.format('D') === id + 1 ? item.classList.add('selected') : item.classList.remove('selected')
  })
}
// Data from time component emiter
let timeSet = (childArr) => {
  time.value.startDayHour = childArr[0]
  time.value.startDayMinutes = childArr[1]
  time.value.endDayHour = childArr[2]
  time.value.endDayMinutes = childArr[3]
  startDate.value = `${start.value.day}/${start.value.month}/${start.value.year} - ${time.value.startDayHour}:${time.value.startDayMinutes}`
  endDate.value = `${end.value.day}/${end.value.month}/${end.value.year} - ${time.value.endDayHour}:${time.value.endDayMinutes}`
}
// Data from template component emiter
let templateSet = (childObj) => {
  start.value.day = childObj.date.startDay.format('DD')
  start.value.month = childObj.date.startDay.format('MM')
  start.value.year = childObj.date.startDay.format('YYYY')
  end.value.day = childObj.date.endDay.format('DD')
  end.value.month = childObj.date.endDay.format('MM')
  end.value.year = childObj.date.endDay.format('YYYY')
  endDate.value = `${end.value.day}/${end.value.month}/${end.value.year}`
  startDate.value = `${start.value.day}/${start.value.month}/${start.value.year}`
}

</script>

<style scoped>

</style>