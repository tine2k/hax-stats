<template>
  <div class="w-full rounded-md p-2 bg-hax-black text-white">
    <div class="text-xl border-b-2 border-hax-red font-bold flex justify-between items-start items-center pb-2">
      <div class="">
        {{ title }}
      </div>
      <slot name="header"></slot>
    </div>
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
};
</script>
