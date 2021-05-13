<template>
  <Dialog title="Player Statistics">
    <table class="w-full">
      <thead>
      <tr>
        <SortHeader field="name" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)" align="left">Player</SortHeader>
        <SortHeader field="passes" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">Average<br>Touches/Game</SortHeader>
        <SortHeader field="poss" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">Average<br>Possession/Game</SortHeader>
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
import SortHeader from '@/components/toolkit/SortHeader';

export default {
  name: 'HighPlayers',
  components: {Dialog, SortHeader},
  props: {},
  data() {
    return {
      sortField: 'poss',
      sortAsc: false,
    };
  },
  computed: {
    rows() {
      return this.sort(Array.from(new Set(this.$store.state.filteredGames.flatMap(g => g.players).map(p => p.name)))
          .map(p => ({
            name: p,
            poss: this.avgPoss(p),
            passes: this.avgPasses(p),
          }))
          .filter(x => x.passes > 0), [this.sortField, this.sortAsc]);
    }
  },
  methods: {
    updateSortFields(field) {
      this.sortField = field[0];
      this.sortAsc = field[1];
    },
    sort(rows, field) {
      return rows.sort(
          firstBy(field[0], {ignoreCase: true, direction: (field[1] ? 'asc' : 'desc')})
              .thenBy('name', {direction: (field[1] ? 'asc' : 'desc')})
      );
    },
    avgPoss(p) {
      const touches = this.$store.state.filteredGames
          .map(g => g.possPlayer.filter(pa => pa.player === p))
          .map(pa => pa[0])
          .filter(pa => !!pa)
          .map(pa => Number.parseFloat(pa.poss));
      return touches.length && touches.reduce((a, b) => a + b) / touches.length;
    },
    avgPasses(p) {
      const touches = this.$store.state.filteredGames
          .map(g => g.passes.filter(pa => pa.player === p))
          .map(pa => pa[0])
          .filter(pa => !!pa)
          .map(pa => pa.overall);
      return touches.length && touches.reduce((a, b) => a + b) / touches.length;
    }
  }
};
</script>
