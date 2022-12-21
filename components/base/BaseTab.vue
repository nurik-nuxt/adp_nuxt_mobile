<template>
  <div
      class="
      w-full
      flex
      flex-row
      justify-between
      border
      border-gray-50
      rounded-md"
  >
    <a
        class="
        w-full
        border-r-2
        border-gray-50
        py-3
        px-1
        last:border-none
        text-center
        text-gray-100
        text-lg
        font-normal"
        :class="selectedTab.id === item.id ? 'bg-green-150 text-black' : ''"
        v-for="item in items"
        @click="$emit('clicked', item)"
    >
      {{item.title}}
    </a>
  </div>
</template>

<script setup>

defineProps({
  items: {
    type: Array
  },
  selectedTab: {
    type: Object,
    default: () => {
      return {
        id: 1
      }
    }
  }
})
const activate = (e) => {
  console.log(e)
}
</script>