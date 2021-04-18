<template>
  <KeyEvent v-on:keyup="nextGame($event)"></KeyEvent>
  <Dialog title="All Games">
    <table class="w-full">
      <thead>
      <tr>
        <th class="text-right p-2">ID</th>
        <th class="text-center p-2">Date</th>
        <th class="text-center p-2">Duration</th>
        <th class="text-right p-2">Score</th>
        <th class="text-center p-2">Winner</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="game in games" v-bind:key="game.id"
          v-bind:class="{ selected: selectedGame === game }"
          @click="selectGame(game)"
          class="cursor-pointer">
        <td class="text-right p-2">{{ game.id }}</td>
        <td class="text-center p-2">{{ $filters.formatDateTime(game.start) }}</td>
        <td class="text-center p-2">{{ $filters.formatDuration(game.scores.time) }}</td>
        <td class="text-right p-2">{{ game.scores.red }} : {{ game.scores.blue }}</td>
        <td class="text-center p-2">
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
    selectedGame: Object
  },
  emits: ['selectGame'],
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
tr.selected {
  @apply bg-gray-600;
}
</style>
