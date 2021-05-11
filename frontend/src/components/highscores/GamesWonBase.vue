<template>
  <Dialog :title="title">
    <table class="w-full">
      <thead>
      <tr>
        <SortHeader field="name" :currently-sorted-by="sortField" v-on:sort="sort($event)" align="left">Player</SortHeader>
        <SortHeader field="won" :currently-sorted-by="sortField" v-on:sort="sort($event)">Games<br>Won</SortHeader>
        <SortHeader field="lost" :currently-sorted-by="sortField" v-on:sort="sort($event)">Games<br>Lost</SortHeader>
        <SortHeader field="played" :currently-sorted-by="sortField" v-on:sort="sort($event)">Games<br>Played</SortHeader>
        <SortHeader field="per" :currently-sorted-by="sortField" v-on:sort="sort($event)">Percent<br>Won</SortHeader>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in rows" :key="p.name">
        <td class="text-left p-2">{{ p.name }}</td>
        <td class="text-right p-2">{{ p.won }}</td>
        <td class="text-right p-2">{{ p.lost }}</td>
        <td class="text-right p-2">{{ p.played }}</td>
        <td class="text-right p-2">{{ (p.per * 100).toFixed(1) }} %</td>
      </tr>
      </tbody>
    </table>
  </Dialog>
</template>

<script>

import Dialog from '@/components/toolkit/Dialog';
import SortHeader from '@/components/layout/SortHeader';
import {firstBy} from 'thenby';

export default {
  name: 'GamesWon',
  components: {SortHeader, Dialog},
  props: {
    title: String,
    filter: Function
  },
  data() {
    return {
      rows: this.initData(),
      sortField: 'per'
    };
  },
  created() {
    this.sort([this.sortField, false]);
  },
  methods: {
    initData() {
      return Array.from(new Set(this.$store.state.games.flatMap(g => g.players).map(p => p.name)))
          .map(p => {
            const gamesPlayed = this.$store.state.games
                .filter(g => g.players.filter(pl => pl.name === p).length)
                .filter(g => this.filter(g));
            return {
              name: p,
              won: gamesPlayed.filter(g => this.hasWon(g, p)).length,
              lost: gamesPlayed.filter(g => !this.hasWon(g, p)).length,
              played: gamesPlayed.length
            };
          })
          .map(p => ({...p, per: p.won / (p.played)}))
          .concat()
          .filter(g => g.played > 2);
    },
    sort(field) {
      this.sortField = field[0];
      this.rows = this.rows.sort(
          firstBy(this.sortField, {ignoreCase: true, direction: (field[1] ? 'asc' : 'desc')})
              .thenBy('played', { direction: (field[1] ? 'asc' : 'desc')})
              .thenBy('name', { direction: (field[1] ? 'asc' : 'desc')})
      );
    },
    hasWon(g, p) {
      return g.players.filter(pl => pl.name === p)[0].team !== (g.scores.red < g.scores.blue ? 1 : 2);
    }
  }
};
</script>
