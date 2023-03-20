<template>
  <div class="time-init-wrapper">
    <div class="time-init tile-item">
      <span>Start day:</span>
      <select v-model="startDayHour" name="startDayHour" id="startDayHour" class="time-init__hour">
        <option v-for="hour in 24" value="">{{ hour }}</option>
      </select>
      <span class="calendar-init__arrow">h</span>
      <select v-model="startDayMinutes" name="startDayMinutes" id="startDayMinutes" class="time-init__minutes">
        <option v-for="(minute, i) in 60" value="">{{ i }}</option>
      </select>
      <span class="calendar-init__arrow">m</span>

    </div>
    <div class="time-init tile-item">
      <span>End day:</span>
      <select v-model="endDayHour" name="endDayHour" id="endDayHour" class="time-init__hour">
        <option v-for="hour in 24" value="">{{ hour }}</option>
      </select>
      <span class="calendar-init__arrow">h</span>
      <select v-model="endDayMinutes" name="endDayMinutes" id="endDayMinutes" class="time-init__minutes">
        <option v-for="(minute, i) in 60" value="">{{ i }}</option>
      </select>
      <span class="calendar-init__arrow">m</span>

    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";

// Start day time *start*
let startDayHour = ref('')
let startDayMinutes = ref('')
// Start day time *end*

// End day time *start*
let endDayHour = ref('')
let endDayMinutes = ref('')
// End day time *end*

</script>

<style scoped>

</style>