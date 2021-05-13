<template>
  <Dialog title="Goals">
    <table class="w-full">
      <thead>
      <tr>
        <SortHeader field="name" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)" align="left">Player</SortHeader>
        <SortHeader field="own" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">🙀 OwnGoal</SortHeader>
        <SortHeader field="assists" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">💪 Assist</SortHeader>
        <SortHeader field="goals" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">⚽️ Goals</SortHeader>
        <SortHeader field="goalsPerMatch" :currently-sorted-by="sortField" v-on:sort="updateSortFields($event)">⚽️ Goals/Match</SortHeader>
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
import SortHeader from '@/components/toolkit/SortHeader';

export default {
  name: 'HighGoals',
  components: {Dialog, SortHeader},
  props: {
    title: String
  },
  data() {
    return {
      sortField: 'goalsPerMatch',
      sortAsc: false,
    };
  },
  computed: {
    rows() {
      return this.sort(Array.from(new Set(this.$store.state.filteredGames.flatMap(g => g.players).map(p => p.name)))
          .map(p => ({
            name: p,
            own: this.countGoals(go => go.scorer === p && go.ownGoal),
            assists: this.countGoals(go => go.assist === p && !go.ownGoal),
            goals: this.countGoals(go => go.scorer === p && !go.ownGoal),
            goalsPerMatch: this.countGoals(go => go.scorer === p && !go.ownGoal) / this.countGamesPlayed(p)
          }))
          .filter(x => x.goals > 0), [this.sortField, this.sortAsc]);
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
              .thenBy('goals', {direction: (field[1] ? 'asc' : 'desc')})
              .thenBy('name', {direction: (field[1] ? 'asc' : 'desc')})
      );
    },
    countGoals(goalFilter) {
      return this.$store.state.filteredGames.map(g => g.goals.filter(goalFilter).length).reduce((a, b) => a + b, 0);
    },
    countGamesPlayed(p) {
      return this.$store.state.filteredGames.filter(g => g.players.filter(pl => pl.name === p).length).length;
    }
  }
};
</script>
