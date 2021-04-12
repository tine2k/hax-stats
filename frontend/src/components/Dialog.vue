<template>
<div class="w-full rounded-md p-4 bg-hax-black text-white">
  <div class="text-xl border-b-2 border-hax-red font-bold">{{title}}</div>
  <div class="pt-4">
    <slot></slot>
  </div>
</div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    title: String
  }
}
</script>
