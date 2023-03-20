<template>
  <Transition>
    <div v-if="toggle === 'Hide'">
      <h2 class="main-content__title">Choose template:</h2>
      <div class="template-init tile-item">
        <button class="button"
                v-on:click="chooseTemplate(templates.previousWeek);">Previous week
        </button>
        <button class="button"
                v-on:click="chooseTemplate(templates.yesterday);">Yesterday
        </button>
        <button class="button"
                v-on:click="chooseTemplate(templates.today);">Today
        </button>
        <button class="button"
                v-on:click="chooseTemplate(templates.tomorrow);">Tomorrow
        </button>
        <button class="button"
                v-on:click="chooseTemplate(templates.nextWeek);">Next week
        </button>
        <button class="button"
                v-on:click="chooseTemplate(templates.thisMonth);">This month
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {ref} from "vue";
import moment from "moment";

let props = defineProps({
  toggle: String
})

let emit = defineEmits(['templateDataCollected'])

let date = ref({
  today: moment(),
  startDay: null,
  endDay: null
})

let templates = ref({
  previousWeek: {
    start: moment().subtract(1, 'weeks').startOf('week'),
    end: moment().subtract(1, 'weeks').endOf('week')
  },
  yesterday: {
    start: moment().subtract(1, 'days'),
    end: moment().subtract(1, 'days')
  },
  today: {
    start: date.value.today,
    end: date.value.today
  },
  tomorrow: {
    start: moment().add(1, 'days'),
    end: moment().add(1, 'days')
  },
  nextWeek: {
    start: moment().add(1, 'weeks').startOf('week'),
    end: moment().add(1, 'weeks').endOf('week')
  },
  thisMonth: {
    start: moment().startOf('month'),
    end: moment().endOf('month')
  }
})

let chooseTemplate = (template) => {
  date.value.startDay = template.start
  date.value.endDay = template.end
  emit('templateDataCollected', {date: date.value})
}

</script>

<style scoped>

</style>