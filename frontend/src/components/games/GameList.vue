<template>
  <KeyEvent v-on:keyup="nextGame($event)"></KeyEvent>
  <Dialog v-bind:title="title">
    <template v-slot:header>
      <div class="ml-12 text-white text-sm">{{games.length}} Games</div>
    </template>

    <table class="w-full text-right">
      <thead>
      <tr>
        <th class="p-2">ID</th>
        <th class="p-2">Date</th>
        <th class="p-2">Duration</th>
        <th class="p-2">Players</th>
        <th class="p-2">Score</th>
        <th class="p-2">Winner</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in games" v-bind:key="game.id"
          v-bind:class="{ selected: selectedGame === game, 'cursor-pointer': this.selectionEnabled }"
          @click="selectGame(game)">
        <td class="p-2">{{ game.id }}</td>
        <td class="p-2">{{ $filters.formatDateTime(game.start) }}</td>
        <td class="p-2">{{ $filters.formatDuration(game.scores.time) }}</td>
        <td class="p-2">{{ game.players.length }}</td>
        <td class="p-2">{{ game.scores.red }} : {{ game.scores.blue }}</td>
        <td class="p-2">
          <Winner v-bind:red="game.scores.red" v-bind:blue="game.scores.blue"></Winner>
        </td>
      </tr>
      </tbody>
    </table>
  </Dialog>
</template>

<script>

import Dialog from '@/components/toolkit/Dialog';
import Winner from '@/components/games/Winner';
import KeyEvent from '@/components/games/KeyEvent';

export default {
  name: 'GameList',
  props: {
    title: String,
    games: Array,
    selectedGame: Object,
    selectionEnabled: Boolean
  },
  emits: ['selectGame'],
  computed: {
    gameCount() {
      return this.$store.state.filteredGames.length;
    }
  },
  methods: {
    nextGame(e) {
      if (!this.selectedGame) {
        return;
      }
      let nextIndex = this.games.indexOf(this.selectedGame);
      if (e.keyCode === 38) {
        nextIndex -= 1;
      } else if (e.keyCode === 40) {
        nextIndex += 1;
      }
      if (this.games[nextIndex]) {
        this.selectGame(this.games[nextIndex]);
      }
    },
    selectGame(game) {
      if (game) {
        this.$emit('selectGame', game);
      }
    }
  },
  components: {
    Dialog,
    Winner,
    KeyEvent
  }
};
</script>

<style>
@reference "tailwindcss";

tr.selected {
  @apply bg-gray-600;
}
</style>
