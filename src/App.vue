<template>
  <div class="container">
    <div class="side-bar">
      <h2 class="side-bar__title">Options:</h2>
      <div class="side-bar__item tile-item">
        <Switch :label='`${mode} mode`' :switched="switched" :func="modeToggle"></Switch>
      </div>
      <div class="side-bar__item tile-item">
        <Switch :label='`${labelTime} timepicker panel`' :switched="false" :func="timePanelToggle"></Switch>
      </div>
      <div class="side-bar__item tile-item">
        <Switch :label='`${labelTemplate} templates panel`' :switched="false" :func="templatePanelToggle"></Switch>
      </div>
    </div>
    <div class="main-content">
      <h2 class="main-content__title">Choose date:</h2>
      <Calendar :timeToggle="labelTime" :templatesToggle="labelTemplate"></Calendar>
    </div>
  </div>

</template>
<script setup>
import Calendar from "./components/Calendar.vue"
import Switch from "./components/Switch.vue"
import Time from "./components/Time.vue"
import Templates from "./components/Templates.vue";
import themeSwitch from './composables/themeSwitch.js'
import timeToggle from './composables/timeToggle.js'
import templateToggle from './composables/templateToggle.js'

const {
  mode,
  switched,
  modeToggle
} = themeSwitch()

const {
  labelTime,
  timePanelToggle
} = timeToggle()

const {
  labelTemplate,
  templatePanelToggle
} = templateToggle()

</script>

<style scoped>

</style>
