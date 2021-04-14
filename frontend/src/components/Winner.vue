<template>
  <Badge v-bind:color="(red >= blue) ? 'red' : 'blue'">{{ red >= blue ? 'red' : 'blue'}}</Badge>
</template>

<script>
import Badge from '@/components/Badge';

export default {
  name: 'Winner',
  props: {
    red: Number,
    blue: Number
  },
  components: {
    Badge
  }
}
</script>
