<template>
  <div>
    <Multiselect
        v-model="value"
        :options="options"
        mode="tags"
        :limit="5"
        :max="5"
        :label="'title'"
        :track-by="'alpha_code'"
    >
    </Multiselect>
  </div>
</template>

<script setup>
import Multiselect from '@vueform/multiselect'

// const options = reactive([
//   'Batman',
//   'Robin',
//   'Joker',
// ])

const value = reactive([])

defineProps({
  options: Array
})
</script>

<style src="@vueform/multiselect/themes/default.css">
</style>