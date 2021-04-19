<template>
  <div class="mr-0">
    <router-link v-bind:to="{ name: route}">
      <div class="p-4 pr-8 pl-8 text-sm text-white">
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

<style>
.router-link-active > div, .router-link-active > div:hover {
  @apply bg-hax-black-trans font-bold text-yellow-200;
}
</style>
