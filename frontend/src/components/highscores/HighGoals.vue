<template>
  <Dialog title="Goals">
    <table class="w-full">
      <thead>
      <tr>
        <SortHeader field="name" :currently-sorted-by="sortField" v-on:sort="sort($event)" align="left">Player</SortHeader>
        <SortHeader field="own" :currently-sorted-by="sortField" v-on:sort="sort($event)">🙀 OwnGoal</SortHeader>
        <SortHeader field="assists" :currently-sorted-by="sortField" v-on:sort="sort($event)">💪 Assist</SortHeader>
        <SortHeader field="goals" :currently-sorted-by="sortField" v-on:sort="sort($event)">⚽️ Goals</SortHeader>
        <SortHeader field="goalsPerMatch" :currently-sorted-by="sortField" v-on:sort="sort($event)">⚽️ Goals/Match</SortHeader>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in rows" v-bind:key="p.name">
        <td class="text-left p-2">{{ p.name }}</td>
        <td class="text-right p-2">{{ p.own }}</td>
        <td class="text-right p-2">{{ p.assists }}</td>
        <td class="text-right p-2">{{ p.goals }}</td>
        <td class="text-right p-2">{{ p.goalsPerMatch?.toFixed(3) }}</td>
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
  name: 'HighGoals',
  components: {Dialog, SortHeader},
  props: {
    title: String
  },
  data() {
    return {
      rows: this.initData(),
      sortField: 'goalsPerMatch'
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
            own: this.countGoals(go => go.scorer === p && go.ownGoal),
            assists: this.countGoals(go => go.assist === p && !go.ownGoal),
            goals: this.countGoals(go => go.scorer === p && !go.ownGoal),
            goalsPerMatch: this.countGoals(go => go.scorer === p && !go.ownGoal) / this.countGamesPlayed(p)
          }))
          .filter(x => x.goals > 0);
    },
    sort(field) {
      this.sortField = field[0];
      this.rows = this.rows.sort(
          firstBy(this.sortField, {ignoreCase: true, direction: (field[1] ? 'asc' : 'desc')})
              .thenBy('goals', {direction: (field[1] ? 'asc' : 'desc')})
              .thenBy('name', {direction: (field[1] ? 'asc' : 'desc')})
      );
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
