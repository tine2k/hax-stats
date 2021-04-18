<template>
  <div class="p-2 mr-4 rounded-md font-bold bg-gray-600 p-1 pr-2 pl-2 text-sm text-white">
    <router-link v-bind:to="{ name: route}">{{ title }}</router-link>
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
