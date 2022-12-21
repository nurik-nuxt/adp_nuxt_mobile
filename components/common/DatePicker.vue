<template>
  <vue-tailwind-datepicker use-range :auto-apply="false" :formatter="formatter" :i18n="'ru'" :shortcuts="false" :options="options" v-model="dateValue" />
</template>

<script setup>
import { ref } from 'vue'
import VueTailwindDatepicker from 'vue-tailwind-datepicker'
const dateValue = ref([])
const formatter = ref({
  date: 'DD MMM YYYY',
  month: 'MMM'
})
const options = ref({
  footer: {
    apply: 'Выбрать',
    cancel: 'Закрыть'
  }
})
</script>