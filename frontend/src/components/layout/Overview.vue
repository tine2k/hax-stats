<template>
  <div class="grid gap-2 p-4 grid-cols-2 items-start">
    <div>
      <GameList v-bind:games="$store.state.games"
                v-bind:selectedGame="$store.state.selectedGame"
                @select-game="selectGame($event)">
      </GameList>
    </div>
    <div class="grid gap-2 grid-cols-1" v-if="$store.state.selectedGame">
      <GameDetail v-bind:game="$store.state.selectedGame"></GameDetail>
      <Goals v-bind:game="$store.state.selectedGame"></Goals>
      <Players v-bind:game="$store.state.selectedGame"></Players>
    </div>
  </div>
</template>

<script>
import GameDetail from '@/components/games/GameDetail';
import Goals from '@/components/games/Goals';
import Players from '@/components/games/Players';
import GameList from '@/components/games/GameList';

export default {
  name: 'Overview',
  components: {
    GameList,
    GameDetail,
    Goals,
    Players
  },
  beforeUpdate() {
    if (!this.$store.state.selectedGame && this.$store.state.games && this.$store.state.games.length) {
      this.selectGame(this.$store.state.games[0]);
    }
  },
  methods: {
    selectGame(game) {
      this.$store.commit('selectGame', game);
    }
  }
};
</script>
