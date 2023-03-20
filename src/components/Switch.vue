<template>
  <label class="switcher">
    <input
        class="input"
        type="checkbox"
        :checked="switched"
        @change="func"
    />
    <span class="switch"></span>
    <span class="label">{{ label }}</span>
  </label>
</template>

<script setup>
let props = defineProps({
    label: String,
    switched: Boolean,
    func: Function
});
</script>

<style scoped>

</style>