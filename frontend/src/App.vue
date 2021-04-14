<template>
  <!--  <Title>High Scores</Title>-->
  <!--  <div class="grid gap-2 p-2 grid-cols-2">-->
  <!--    <Dialog title="Top Scorer"></Dialog>-->
  <!--  </div>-->
  <!--  <Title>Game List</Title>-->
  <div class="grid gap-2 p-2 grid-cols-2 items-start">
    <div>
      <GameList @select-game="this.selectedGame = $event" v-bind:games="games"></GameList>
    </div>
    <div class="grid gap-2 grid-cols-1">
      <GameDetail v-if="selectedGame" v-bind:game="selectedGame"></GameDetail>
      <Goals v-if="selectedGame" v-bind:game="selectedGame"></Goals>
      <Players v-if="selectedGame" v-bind:game="selectedGame"></Players>
    </div>
  </div>
</template>

<script>
import GameList from '@/components/GameList';
import GameDetail from '@/components/GameDetail';
import Goals from '@/components/Goals';
import Players from '@/components/Players';

const axios = require('axios');

export default {
  name: 'App',
  components: {
    // Dialog,
    GameList,
    GameDetail,
    Goals,
    // Title,
    Players
  },
  data() {
    return {
      games: [],
      selectedGame: undefined,
      loading: false,
      error: false,
    };
  },
  mounted() {
    axios.get('/games')
        .then(response => {
          this.games = response.data.reverse();
        })
        .catch(() => this.error = true)
        .finally(() => this.loading = false);
  },
};
</script>
