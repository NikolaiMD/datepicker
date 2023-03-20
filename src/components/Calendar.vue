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
                   v-on:click="selectDate(day); colorDay(day);">
                <div class="day-number">{{ day.format('D') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Time :toggle="timeToggle" @timeDataCollected="timeSet" :startDateSet="startDate" :endDateSet="endDate"></Time>
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

const range = ref([])
let endDateInput = ref(null)
let startDateInput = ref(null)

let startDate = ref(null)
let endDate = ref(null)

let startDay = ref(null)
let endDay = ref(null)
let startMonth = ref(null)
let endMonth = ref(null)
let startYear = ref(null)
let endYear = ref(null)

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

const monthStart = moment().startOf('month');
const monthEnd = moment().endOf('month');

let startTime = ref(monthStart)
let endTime = ref(monthEnd)


const previous = (unit) => {
  startTime.value = startTime.value.clone().subtract(1, `${unit}`);
  endTime.value = endTime.value.clone().subtract(1, `${unit}`);
}
const next = (unit) => {
  startTime.value = startTime.value.clone().add(1, `${unit}`);
  endTime.value = endTime.value.clone().add(1, `${unit}`);
}
const getFirstMonthWeeks = () => {
  const firstMonthDays = [];
  let currentDay = startTime.value.clone().startOf('week');
  while (currentDay.isBefore(startTime.value.clone().endOf('month'))) {
    firstMonthDays.push(currentDay);
    currentDay = currentDay.clone().add(1, 'day');
  }
  return chunkByWeek(firstMonthDays);
}
const isToday = (day) => {
  return moment().isSame(day, 'day');
}

const chunkByWeek = (arr) => {
  const result = [];
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
const getWeekDays = (week) => {
  const result = [];
  for (let i = 0; i < week.length; i += 1) {
    const day = week[i];
    result.push(day);
  }
  return result;
}


const getCurrentMonth = computed(() => {
  return startTime.value.format('MMMM');
})

const getCurrentYear = computed(() => {
  return startTime.value.format('YYYY');
})
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

let selectDate = (day) => {
  selecting.value = true
  if (startDateInit.value === true) {
    endDay.value = null
    endMonth.value = null
    endYear.value = null
    endDate.value = null
    startDay.value = day.format('D')
    startMonth.value = day.format('M')
    startYear.value = day.format('Y')
    startDate.value = `${startDay.value}/${startMonth.value}/${startYear.value}`
    endDateInput.value.focus();
    range.value.splice(0, 1, day.format('D'))
    if (endYear.value < startYear.value || endMonth.value < startMonth.value || (endYear.value === startYear.value && endMonth.value === startMonth.value && endDay.value < startDay.value)) {
      endDay.value = null
      endMonth.value = null
      endYear.value = null
      endDate.value = null
      range.value.splice(0, 1, day.format('D'))
    }
  } else {
    endDay.value = day.format('D')
    endMonth.value = day.format('M')
    endYear.value = day.format('Y')
    endDate.value = `${endDay.value}/${endMonth.value}/${endYear.value}`
    range.value.splice(1, 1, day.format('D'))
    if (endYear.value < startYear.value || endMonth.value < startMonth.value || (endYear.value === startYear.value && endMonth.value === startMonth.value && endDay.value < startDay.value)) {
      startDay.value = day.format('D')
      startMonth.value = day.format('M')
      startYear.value = day.format('Y')
      startDate.value = `${startDay.value}/${startMonth.value}/${startYear.value}`
      endDay.value = null
      endMonth.value = null
      endYear.value = null
      endDate.value = null
      endDateInput.value.focus();
      range.value.splice(1, 1, day.format('D'))
    }
  }
  console.log(range.value)
}

let colorDay = (day) => {
  let days = Array.from(document.getElementsByClassName('day'))
  days.forEach((item, id) => {
    day.format('D') === id + 1 ? item.classList.add('selected') : item.classList.remove('selected')
  })
}

let timeSet = (childArr) => {
  time.value.startDayHour = childArr[0]
  time.value.startDayMinutes = childArr[1]
  time.value.endDayHour = childArr[2]
  time.value.endDayMinutes = childArr[3]
  startDate.value = `${startDay.value}/${startMonth.value}/${startYear.value} - ${time.value.startDayHour}:${time.value.startDayMinutes}`
  endDate.value = `${endDay.value}/${endMonth.value}/${endYear.value} - ${time.value.endDayHour}:${time.value.endDayMinutes}`
}

let templateSet = (childObj) => {
  startDay.value = childObj.date.startDay.format('DD')
  startMonth.value = childObj.date.startDay.format('MM')
  startYear.value = childObj.date.startDay.format('YYYY')
  endDay.value = childObj.date.endDay.format('DD')
  endMonth.value = childObj.date.endDay.format('MM')
  endYear.value = childObj.date.endDay.format('YYYY')
  endDate.value = `${endDay.value}/${endMonth.value}/${endYear.value}`
  startDate.value = `${startDay.value}/${startMonth.value}/${startYear.value}`
}

</script>

<style scoped>

</style>