<template>
  <Dialog title="Player Statistics">
    <table class="w-full">
      <thead>
      <tr>
        <th class="text-left p-2">Player</th>
        <th class="text-right p-2">Average<br>Touches/Game</th>
        <th class="text-right p-2">Average<br>Possession/Game</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in getStats()" v-bind:key="p.name">
        <td class="text-left p-2">{{ p.name }}</td>
        <td class="text-right p-2">{{ p.passes.toFixed(2) }}</td>
        <td class="text-right p-2">{{ Math.round(p.poss) }} %</td>
      </tr>
      </tbody>
    </table>
  </Dialog>
</template>

<script>

import Dialog from '@/components/toolkit/Dialog';

export default {
  name: 'HighPlayers',
  components: {Dialog},
  props: {},
  methods: {
    getStats() {
      return Array.from(new Set(this.$store.state.games.flatMap(g => g.players).map(p => p.name)))
          .map(p => {
            return {
              name: p,
              poss: this.avgPoss(p),
              passes: this.avgPasses(p),
            };
          })
          .concat()
          .sort((a, b) => a.poss > b.poss ? -1 : 1);
    },
    avgPoss(p) {
      const touches = this.$store.state.games
          .map(g => g.possPlayer.filter(pa => pa.player === p))
          .map(pa => pa[0])
          .filter(pa => !!pa)
          .map(pa => Number.parseFloat(pa.poss));
      return touches.length && touches.reduce((a, b) => a + b) / touches.length;
    },
    avgPasses(p) {
      const touches = this.$store.state.games
          .map(g => g.passes.filter(pa => pa.player === p))
          .map(pa => pa[0])
          .filter(pa => !!pa)
          .map(pa => pa.overall);
      return touches.length && touches.reduce((a, b) => a + b) / touches.length;
    }
  }
};
</script>
