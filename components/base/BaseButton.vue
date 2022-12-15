<template>
  <button
      class="
      bg-gray-50
      rounded-md
      w-full
      border-none
      outline-0
      cursor-pointer
      flex
      justify-center
      box-border
      decoration-0
      h-11
      py-1.5
      text-base
      leading-8
"
      :class="[`btn--${variant}`]"
      @click="$emit('clicked')"
  >
    <slot>
      Отправить SMS
    </slot>
  </button>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: "primary",
    validator: function (value) {
      return ([
          "primary",
          "green",
          "light"
      ].includes(value)
      );
    }
  }
})
</script>

<style scoped lang="scss">
.btn {
  &--green {
    background: #39B54A;
    color: white;
    &:hover {
      background: #33A343 ;
    }
  }
  &--light {
    background: #C1E5B8;
    color: black;
  }
}
</style>