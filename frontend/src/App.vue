<template>
  <ErrorMessage v-if="error"></ErrorMessage>
  <Loading v-if="loading"></Loading>
  <template v-else>
    <Menu></Menu>
    <router-view></router-view>
  </template>
</template>
<script>
import Menu from '@/components/layout/Menu';
import Loading from '@/components/layout/Loading';
import ErrorMessage from '@/components/layout/ErrorMessage';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    Menu,
    Loading,
    ErrorMessage
  },
  data() {
    return {
      loading: true,
      error: false,
    };
  },
  mounted() {
    axios.get('/api/games')
        .then(response => {
          this.$store.commit('loadGames', response.data.reverse());
        })
        .catch(() => this.error = true)
        .finally(() => this.loading = false);
  },
};
</script>
