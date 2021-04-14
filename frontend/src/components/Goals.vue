<template>
  <Dialog title="Goals" v-if="game.goals.length">
    <table class="w-full">
      <thead>
      <tr>
        <th class="text-left p-2">Score</th>
        <th class="text-left p-2">Type</th>
        <th class="text-left p-2">Scorer</th>
        <th class="text-center p-2">Assist</th>
        <th class="text-center p-2">Time</th>
        <th class="text-right p-2">Team</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="goal in game.goals" v-bind:key="goal.timestamp">
        <td class="text-left p-2">{{ goal.red }} : {{ goal.blue }}</td>
        <td class="text-left p-2">{{ goal.ownGoal ? '🤦  Owngoal' : '⚽  Goal️' }}</td>
        <td class="text-left p-2">{{ goal.scorer }}</td>
        <td class="text-center p-2">{{ goal.assist }}</td>
        <td class="text-center p-2">{{ $filters.formatDuration(goal.timestamp) }}</td>
        <td class="text-right p-2">
          <Badge v-bind:color="(goal.team === 1) ? 'red' : 'blue'">{{ goal.team === 1 ? 'red' : 'blue' }}</Badge>
        </td>
      </tr>
      </tbody>
    </table>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog';
import Badge from '@/components/Badge';

export default {
  name: 'Goals',
  props: {
    game: Object
  },
  components: {
    Badge,
    Dialog
  }
};
</script>

