<template>
  <Dialog title="Details">
    <template v-slot:header>
      <a class="font-bold bg-gray-600 p-1 pr-2 pl-2 text-sm inline-block hover:bg-gray-500" v-bind:href="'/games/' + game.id + '/replay'" target="_blank">Watch Replay</a>
    </template>

    <div class="grid grid-cols-2">
      <div class="grid grid-cols-teams justify-items-center auto-cols-max">
        <div><Badge color="red">Team red</Badge></div>
        <div></div>
        <div><Badge color="blue">Team blue</Badge></div>

        <span class="text-6xl text-center pt-4">{{ game.scores.red }}</span>
        <span class="text-6xl text-center pt-4">:</span>
        <span class="text-6xl text-center pt-4">{{ game.scores.blue }}</span>

        <ul class="pt-4">
          <li class="text-center" v-for="player in getPlayersOfTeam(1)" v-bind:key="player.name">{{ player.name }}</li>
        </ul>
        <div></div>
        <ul class="pt-4">
          <li class="text-center" v-for="player in getPlayersOfTeam(2)" v-bind:key="player.name">{{ player.name }}</li>
        </ul>
      </div>

      <div class="grid grid-cols-2 justify-items-end items-center">
        <span>Winner</span>
        <span><Winner v-bind:red="game.scores.red" v-bind:blue="game.scores.blue"></Winner></span>

        <span>Date</span>
        <span>{{ $filters.formatDateTime(game.start, 'LLL') }}</span>

        <span>Duration</span>
        <span>{{ $filters.formatDuration(game.scores.time) }}</span>

        <span>Score Limit</span>
        <span>{{ game.scores.scoreLimit }}</span>

        <span>Time Limit</span>
        <span>{{ $filters.formatDuration(game.scores.timeLimit) }}</span>

        <span>Field Distribution</span>
        <span class="grid-cols-3 grid gap-1 justify-center">
          <Badge color="red">{{ Math.round(game.distribution[1]) }} %</Badge>
          <Badge>{{ Math.round(game.distribution[0]) }} %</Badge>
          <Badge color="blue">{{ Math.round(game.distribution[2]) }} %</Badge>
        </span>

        <span>Team Ball Possession</span>
        <span class="grid-cols-2 grid gap-1">
          <Badge color="red"> {{ Math.round(game.possTeam['1']) }} %</Badge>
          <Badge color="blue">{{ Math.round(game.possTeam['2']) }} %</Badge>
        </span>
      </div>

      <div class="pt-4">

      </div>
    </div>
  </Dialog>
</template>

<script>
import Badge from '@/components/toolkit/Badge';
import Winner from '@/components/games/Winner';
import Dialog from '@/components/toolkit/Dialog';

export default {
  name: 'GameList',
  props: {
    game: Object
  },
  methods: {
    getPlayersOfTeam(team) {
      return this.game.players.filter(p => p.team === team).concat().sort((a,b) => a.name.localeCompare(b.name))
    }
  },
  components: {
    Badge,
    Winner,
    Dialog
  }
};
</script>
