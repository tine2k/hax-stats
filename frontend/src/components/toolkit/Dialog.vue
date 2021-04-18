<template>
  <div class="w-full rounded-md p-4 bg-hax-black text-white">
    <div class="text-xl border-b-2 border-hax-red font-bold flex justify-between pb-1">
      <div>
        {{ title }}
      </div>
      <div>
        <slot name="header"></slot>
      </div>
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
