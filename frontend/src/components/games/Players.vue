<template>
  <Dialog v-bind:title="'Player Statistics'" v-if="game.possPlayer.length">
    <table class="w-full">
      <thead>
      <tr>
        <SortHeader field="name" :currently-sorted-by="sortField" v-on:sort="sort($event)" align="left">Player</SortHeader>
        <SortHeader field="passes" :currently-sorted-by="sortField" v-on:sort="sort($event)">Passes</SortHeader>
        <SortHeader field="touches" :currently-sorted-by="sortField" v-on:sort="sort($event)">Touches</SortHeader>
        <SortHeader field="passPer" :currently-sorted-by="sortField" v-on:sort="sort($event)">Passes<br/>Percent</SortHeader>
        <SortHeader field="poss" :currently-sorted-by="sortField" v-on:sort="sort($event)">Ball<br/>Possession</SortHeader>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in rows" :key="p.player">
        <td class="text-left p-2">{{ p.name }}</td>
        <td class="text-right p-2">{{ p.passes }}</td>
        <td class="text-right p-2">{{ p.touches }}</td>
        <td class="text-right p-2">{{ p.passPer?.toFixed(1) }} %</td>
        <td class="text-right p-2">{{ p.poss?.toFixed(1) }} %</td>
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
  name: 'Players',
  props: {
    game: Object
  },
  data() {
    return {
      rows: this.initData(this.game),
      sortField: 'poss',
      sortAsc: false
    };
  },
  created() {
    this.resort();
  },
  watch: {
    game: function (newVal) {
      this.rows = this.initData(newVal);
      this.resort();
    }
  },
  methods: {
    initData(game) {
      return game.possPlayer
          .filter(pl => pl.player !== 'unknown')
          .map(p => ({
            name: p.player,
            passes: this.getPasses(p.player)?.success,
            touches: this.getPasses(p.player)?.overall,
            passPer: this.getPasses(p.player)?.success / this.getPasses(p.player)?.overall * 100,
            poss: parseFloat(p.poss)
          }));
    },
    resort() {
      this.sort([this.sortField, this.sortAsc]);
    },
    sort(field) {
      this.sortField = field[0];
      this.sortAsc = field[1];
      this.rows = this.rows.sort(
          firstBy(this.sortField, {ignoreCase: true, direction: (this.sortAsc ? 'asc' : 'desc')})
              .thenBy('name', {direction: (this.sortAsc ? 'asc' : 'desc')})
      );
    },
    getPasses(player) {
      return this.game.passes.filter(x => x.player === player)[0];
    }
  },
  components: {
    Dialog,
    SortHeader
  }
};
</script>
