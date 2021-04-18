<template>
  <div class="grid gap-2 p-4 grid-cols-2 items-start">
    <div>
      <GameList v-bind:games="this.$store.state.games"
                v-bind:selectedGame="selectedGame"
                @select-game="this.selectedGame = $event">
      </GameList>
    </div>
    <div class="grid gap-2 grid-cols-1" v-if="selectedGame">
      <GameDetail v-bind:game="selectedGame"></GameDetail>
      <Goals v-bind:game="selectedGame"></Goals>
      <Players v-bind:game="selectedGame"></Players>
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
  data() {
    return {
      selectedGame: undefined
    };
  },
  created() {
    this.selectFirstGame();
  },
  beforeUpdate() {
    this.selectFirstGame();
  },
  methods: {
    selectFirstGame() {
      if (this.$store.state.games && this.$store.state.games.length && !this.selectedGame) {
        this.selectedGame = this.$store.state.games[0];
      }
    }
  }
};
</script>
