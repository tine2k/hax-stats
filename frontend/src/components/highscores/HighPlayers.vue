<template>
  <Dialog title="Player Statistics">
    <table class="w-full">
      <thead>
      <tr>
        <SortHeader field="name" :currently-sorted-by="sortField" v-on:sort="sort($event)" align="left">Player</SortHeader>
        <SortHeader field="passes" :currently-sorted-by="sortField" v-on:sort="sort($event)">Average<br>Touches/Game</SortHeader>
        <SortHeader field="poss" :currently-sorted-by="sortField" v-on:sort="sort($event)">Average<br>Possession/Game</SortHeader>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in rows" v-bind:key="p.name">
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
import {firstBy} from 'thenby';
import SortHeader from '@/components/layout/SortHeader';

export default {
  name: 'HighPlayers',
  components: {Dialog, SortHeader},
  props: {},
  data() {
    return {
      rows: this.initData(),
      sortField: 'poss'
    };
  },
  created() {
    this.sort([this.sortField, false]);
  },
  methods: {
    initData() {
      return Array.from(new Set(this.$store.state.games.flatMap(g => g.players).map(p => p.name)))
          .map(p => ({
            name: p,
            poss: this.avgPoss(p),
            passes: this.avgPasses(p),
          }))
          .filter(x => x.passes > 0);
    },
    sort(field) {
      this.sortField = field[0];
      this.rows = this.rows.sort(
          firstBy(this.sortField, {ignoreCase: true, direction: (field[1] ? 'asc' : 'desc')})
              .thenBy('name', {direction: (field[1] ? 'asc' : 'desc')})
      );
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
