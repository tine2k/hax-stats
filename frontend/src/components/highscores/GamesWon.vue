<template>
  <Dialog title="Games Won">
    <template v-slot:header>
      <div class="ml-12 text-white text-sm">{{gameCount}} Games</div>
    </template>

    <table class="w-full">
      <thead>
      <tr>
        <SortHeader field="name" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)" align="left">Player</SortHeader>
        <SortHeader field="won" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">Games<br>Won</SortHeader>
        <SortHeader field="lost" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">Games<br>Lost</SortHeader>
        <SortHeader field="played" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">Games<br>Played</SortHeader>
        <SortHeader field="per" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">Percent<br>Won</SortHeader>
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
import {firstBy} from 'thenby';
import SortHeader from '@/components/toolkit/SortHeader';

export default {
  name: 'GamesWon',
  components: {SortHeader, Dialog},
  props: {},
  data() {
    return {
      sortField: 'per',
      sortAsc: false,
    };
  },
  computed: {
    rows() {
      return this.sort(Array.from(new Set(this.$store.state.filteredGames.flatMap(g => g.players).map(p => p.name)))
          .map(p => {
            const gamesPlayed = this.$store.state.filteredGames
                .filter(g => g.players.filter(pl => pl.name === p).length);
            return {
              name: p,
              won: gamesPlayed.filter(g => this.hasWon(g, p)).length,
              lost: gamesPlayed.filter(g => !this.hasWon(g, p)).length,
              played: gamesPlayed.length
            };
          })
          .map(p => ({...p, per: p.won / (p.played)}))
          .concat()
          .filter(g => g.played > 2), [this.sortField, this.sortAsc]);
    },
    gameCount() {
      return this.$store.state.filteredGames.length;
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
              .thenBy('played', {direction: (field[1] ? 'asc' : 'desc')})
              .thenBy('name', {direction: (field[1] ? 'asc' : 'desc')})
      );
    },
    hasWon(g, p) {
      return g.players.filter(pl => pl.name === p)[0].team !== (g.scores.red < g.scores.blue ? 1 : 2);
    }
  }
};
</script>
