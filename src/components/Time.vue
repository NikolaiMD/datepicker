<template>
  <Transition>
    <div v-if="toggle === 'Hide'">
      <h2 class="main-content__title">Choose time:</h2>
      <div class="time-init-wrapper">
        <div class="time-init tile-item">
          <span>Start day:</span>
          <select v-model="startDayHour" name="startDayHour" id="startDayHour" class="time-init__hour"
                  v-on:change="timeDataCollect">
            <option value="24" selected disabled>Hours</option>
            <option v-for="hour in 24" :value="hour">{{ hour }}</option>
          </select>
          <span class="calendar-init__arrow">h</span>
          <select v-model="startDayMinutes" name="startDayMinutes" id="startDayMinutes" class="time-init__minutes"
                  v-on:change="timeDataCollect">
            <option value="00" selected disabled>Minutes</option>
            <option v-for="(minute, i) in 10" :value="`0${i}`">0{{ i }}</option>
            <option v-for="minute in 50" :value="`${minute + 9}`">{{ minute + 9 }}</option>
          </select>
          <span class="calendar-init__arrow">m</span>

        </div>
        <div class="time-init tile-item">
          <span>End day:</span>
          <select v-model="endDayHour" name="endDayHour" id="endDayHour" class="time-init__hour"
                  v-on:change="timeDataCollect">
            <option value="24" selected disabled>Hours</option>
            <option v-for="hour in 24" :id="hour" :value="hour">{{ hour }}</option>
          </select>
          <span class="calendar-init__arrow">h</span>
          <select v-model="endDayMinutes" name="endDayMinutes" id="endDayMinutes" class="time-init__minutes"
                  v-on:change="timeDataCollect">
            <option value="00" selected disabled>Minutes</option>
            <option v-for="(minute, i) in 10" :value="`0${i}`">0{{ i }}</option>
            <option v-for="minute in 50" :value="`${minute + 9}`">{{ minute + 9 }}</option>
          </select>
          <span class="calendar-init__arrow">m</span>

        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {ref} from "vue";

let props = defineProps({
  toggle: String,
  startDateSet: null,
  endDateSet: null,
  startDate: Object,
  endDate: Object
})

let timeFull = ref(false)

// Start day time *start*
let startDayHour = ref('24')
let startDayMinutes = ref('00')
// Start day time *end*

// End day time *start*
let endDayHour = ref('24')
let endDayMinutes = ref('00')
// End day time *end*

// Emit when time is set *start*
let emit = defineEmits(['timeDataCollected'])

let timeDataCollect = () => {
  if (props.startDateSet !== null && props.endDateSet !== null) {
    console.log(props.startDate)
    // Time validation if same day and start hour is bigger then end hour
    if (props.startDate.year === props.endDate.year
        && props.startDate.month === props.endDate.month
        && props.startDate.day === props.endDate.day
        && startDayHour.value > endDayHour.value) {
      startDayHour.value = '24'
      endDayHour.value = '24'
      startDayMinutes.value = '00'
      endDayMinutes.value = '00'
      alert('Start day hour is bigger then end day hour')
    }
  // Time validation if same day and same hour but start minutes are bigger then end minutes
    if (props.startDate.year === props.endDate.year
        && props.startDate.month === props.endDate.month
        && props.startDate.day === props.endDate.day
        && startDayHour.value === endDayHour.value
        && startDayMinutes.value > endDayMinutes.value) {
      startDayHour.value = '24'
      endDayHour.value = '24'
      startDayMinutes.value = '00'
      endDayMinutes.value = '00'
    }
    emit('timeDataCollected', [startDayHour.value, startDayMinutes.value, endDayHour.value, endDayMinutes.value])
  }
}
// Emit when time is set *end*

</script>

<style scoped>

</style>