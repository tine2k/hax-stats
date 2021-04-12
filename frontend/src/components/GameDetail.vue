<template>
  <Dialog v-bind:title="'Game ' + game.id">
    <div class="grid grid-cols-2">
      <span class="text-6xl text-center">{{ game.scores.red }} : {{ game.scores.blue }}</span>
      <span class="text-center">Winner: <Winner v-bind:red="game.scores.red" v-bind:blue="game.scores.blue"></Winner></span>

      <div class="grid grid-cols-2 justify-items-center pt-4">
        <div>
          <Badge v-bind:red="true">Team red</Badge>
          <ul class="pt-2">
            <li class="text-center" v-for="player in game.players.filter(p => p.team === 1)" v-bind:key="player.name">{{ player.name }}</li>
          </ul>
        </div>
        <div>
          <Badge v-bind:red="false">Team blue</Badge>
          <ul class="pt-2">
            <li class="text-center" v-for="player in game.players.filter(p => p.team === 2)" v-bind:key="player.name">{{ player.name }}</li>
          </ul>
        </div>
      </div>

      <div class="grid grid-cols-2 justify-items-end">
        <span>Date</span>
        <span>{{ $filters.formatDateTime(game.start, 'LLL') }}</span>

        <span>Duration</span>
        <span>{{ $filters.formatDuration(game.scores.time) }}</span>

        <span>Score Limit</span>
        <span>{{ game.scores.scoreLimit }}</span>

        <span>Time Limit</span>
        <span>{{ game.scores.timeLimit }}</span>
      </div>

      <div class="pt-4">

      </div>
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/components/Dialog';
import Winner from '@/components/Winner';
import Badge from '@/components/Badge';

export default {
  name: 'GameList',
  props: {
    game: Object
  },
  components: {
    Badge,
    Winner,
    Dialog
  }
};
</script>
