<template>
  <Menu></Menu>
  <router-view></router-view>
</template>
<script>
import Menu from '@/components/layout/Menu';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    Menu
  },
  data() {
    return {
      loading: false,
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
