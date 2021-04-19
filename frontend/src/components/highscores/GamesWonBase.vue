<template>
  <Dialog v-bind:title="title">
    <table class="w-full">
      <thead>
      <tr>
        <th class="text-left p-2">Player</th>
        <th class="text-right p-2">Games<br>Won</th>
        <th class="text-right p-2">Games<br>Lost</th>
        <th class="text-right p-2">Games<br>Played</th>
        <th class="text-right p-2">Percent<br>Won</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in getStats()" v-bind:key="p.name">
        <td class="text-left p-2">{{ p.name }}</td>
        <td class="text-right p-2">{{ p.won }}</td>
        <td class="text-right p-2">{{ p.lost }}</td>
        <td class="text-right p-2">{{ p.played }}</td>
        <td class="text-right p-2">{{ Math.round(p.per * 100) }} %</td>
      </tr>
      </tbody>
    </table>
  </Dialog>
</template>

<script>

import Dialog from '@/components/toolkit/Dialog';

export default {
  name: 'GamesWon',
  components: {Dialog},
  props: {
    title: String,
    filter: Function
  },
  methods: {
    getStats() {
      return Array.from(new Set(this.$store.state.games.flatMap(g => g.players).map(p => p.name)))
          .map(p => {
            const gamesPlayed = this.$store.state.games
                .filter(g => g.players.filter(pl => pl.name === p).length)
                .filter(g => this.filter(g));
            return {
              name: p,
              won: gamesPlayed.filter(g => !this.hasWon(g, p)).length,
              lost: gamesPlayed.filter(g => !this.hasWon(g, p)).length,
              played: gamesPlayed.length
            };
          })
          .map(p => ({...p, per: p.won / (p.played)}))
          .concat()
          .filter(g => g.played > 2)
          .sort((a, b) => a.per > b.per ? -1 : 1);
    },
    hasWon(g, p) {
      return g.players.filter(pl => pl.name === p)[0].team !== (g.scores.red > g.scores.blue ? 1 : 2);
    }
  }
};
</script>
