<template>
  <Dialog title="Goals">
    <table class="w-full">
      <thead>
      <tr>
        <th class="text-left p-2">Player</th>
        <th class="text-right p-2">🙀 OwnGoal</th>
        <th class="text-right p-2">💪 Assist</th>
        <th class="text-right p-2">⚽️ Goals</th>
        <th class="text-right p-2">⚽️ Goals/Match</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in getStats()" v-bind:key="p.name">
        <td class="text-left p-2">{{ p.name }}</td>
        <td class="text-right p-2">{{ p.own }}</td>
        <td class="text-right p-2">{{ p.assists }}</td>
        <td class="text-right p-2">{{ p.goals }}</td>
        <td class="text-right p-2">{{ (Math.round(p.goalsPerMatch * 100) / 100).toFixed(2) }}</td>
      </tr>
      </tbody>
    </table>
  </Dialog>
</template>

<script>

import Dialog from '@/components/toolkit/Dialog';

export default {
  name: 'HighGoals',
  components: {Dialog},
  props: {
    title: String
  },
  methods: {
    getStats() {
      return Array.from(new Set(this.$store.state.games.flatMap(g => g.players).map(p => p.name)))
          .map(p => {
            return {
              name: p,
              own: this.countGoals(go => go.scorer === p && go.ownGoal),
              assists: this.countGoals(go => go.assist === p && !go.ownGoal),
              goals: this.countGoals(go => go.scorer === p && !go.ownGoal),
              goalsPerMatch: this.countGoals(go => go.scorer === p && !go.ownGoal) / this.countGamesPlayed(p)
            };
          })
          .concat()
          .sort((a, b) => a.goalsPerMatch > b.goalsPerMatch ? -1 : 1);
    },
    countGoals(goalFilter) {
      return this.$store.state.games.map(g => g.goals.filter(goalFilter).length).reduce((a, b) => a + b, 0);
    },
    countGamesPlayed(p) {
      return this.$store.state.games.filter(g => g.players.filter(pl => pl.name === p).length).length;
    }
  }
};
</script>
