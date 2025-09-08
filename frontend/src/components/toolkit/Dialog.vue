<template>
  <div class="w-full rounded-md p-2 bg-hax-black text-white h-full flex flex-col">
    <div class="text-xl border-b-2 border-hax-red font-bold flex justify-between items-center pb-2">
      <div>
        {{ title }}
      </div>
      <slot name="header"></slot>
    </div>
    <div class="pt-4 overflow-auto h-auto">
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
