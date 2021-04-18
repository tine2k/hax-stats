<template>
  <span v-if="error" class="p-4 bg-red-600">Error Loading Data!</span>
  <Loading v-if="loading"></Loading>
  <template v-else>
    <Menu></Menu>
    <router-view></router-view>
  </template>
</template>
<script>
import Menu from '@/components/layout/Menu';
import Loading from '@/components/layout/Loading';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    Menu,
    Loading
  },
  data() {
    return {
      loading: true,
      error: false,
    };
  },
  mounted() {
    axios.get('/games')
        .then(response => {
          this.$store.commit('loadGames', response.data.reverse());
        })
        .catch(() => this.error = true)
        .finally(() => this.loading = false);
  },
};
</script>
