<template>
  <div class="mr-0">
    <router-link v-bind:to="{ name: route}" class="group">
      <div class="p-4 pr-8 pl-8 text-sm text-white group-hover:bg-hax-black-trans group-hover:text-yellow-200 group-[.router-link-active]:bg-hax-black">
        {{ title }}
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'MenuItem',
  props: {
    title: String,
    route: String
  }
};
</script>
