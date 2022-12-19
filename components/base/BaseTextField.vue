<template>
  <div class="mb-5">
    <label :for="type" class="block not-italic text-sm font-normal invalid:border-rose-50" :class="isError ? 'text-rose-50' : 'text-gray-100'">{{ label }}</label>
    <input
        :type="type"
        :id="type"
        class="bg-gray-150 w-full px-2.5 py-3 rounded-md outline-0 h-11"
        :class="isError ? 'border border-rose-50 placeholder-rose-50 ' : 'border-none'"
        :placeholder="placeholder"
        :value="inputValue"
        @input="$emit('update:inputValue', $event.target.value)"
    >
  </div>
</template>

<script setup>
defineProps({
  label: String,
  placeholder: String,
  inputValue: String,
  isError: Boolean,
  type: String
})
defineEmits(['update:inputValue'])

</script>

<style lang="scss"></style>