<template>
  <div class="mr-4">
    <router-link v-bind:to="{ name: route}">
      <div class="p-2 rounded-md font-bold p-1 pr-4 pl-4 text-sm text-white bg-hax-button-blue hover:bg-hax-button-blue-light shadow-xl">
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
  @apply bg-hax-button-blue-lighter;
}
</style>
