<template>
  <span v-if="red" class="rounded-full bg-hax-team-red font-bold p-1 pr-2 pl-2 text-sm"><slot></slot></span>
  <span v-else class="rounded-full bg-hax-team-blue font-bold p-1 pr-2 pl-2 text-sm"><slot></slot></span>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    red: Boolean
  }
}
</script>
