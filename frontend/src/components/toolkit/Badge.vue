<template>
  <span class="rounded-full font-bold bg-gray-600 p-1 pr-2 pl-2 text-sm" v-bind:class="{ 'bg-hax-team-red': color === 'red', 'bg-hax-team-blue': color === 'blue' }">
    <slot></slot>
  </span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    color: String
  }
}
</script>
