<template>
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
          @click="$emit('selectGame', game); selectedGame = game"
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
import Dialog from '@/components/Dialog';
import Winner from '@/components/Winner';

const axios = require('axios');

export default {
  name: 'GameList',
  props: {
    title: String
  },
  emits: ['selectGame'],
  data() {
    return {
      loading: false,
      error: false,
      games: [],
      selectedGame: null
    };
  },
  mounted() {
    axios.get('/games')
        .then(response => {
          this.games = response.data;
          this.selectedGame = this.games[0];
          this.$emit('selectGame', this.selectedGame);
        })
        .catch(() => this.error = true)
        .finally(() => this.loading = false);
  },
  components: {
    Dialog,
    Winner
  }
};
</script>

<style>
tr.selected {
  @apply bg-gray-200 text-hax-black;
}
</style>
