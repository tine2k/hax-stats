<template>
  <Dialog v-bind:title="'Player Statistics'" v-if="game.possPlayer.length">
    <table class="w-full">
      <thead>
      <tr>
        <th class="text-left p-2">Player</th>
        <th class="text-right p-2">Passes</th>
        <th class="text-right p-2">Touches</th>
        <th class="text-right p-2">Passes<br />Percent</th>
        <th class="text-right p-2">Ball<br />Possession</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="p in getPlayers(game)" v-bind:key="p.player">
        <td class="text-left p-2">{{ p.player }}</td>
        <td class="text-right p-2">{{ getPasses(p.player)?.success }}</td>
        <td class="text-right p-2">{{ getPasses(p.player)?.overall }}</td>
        <td class="text-right p-2">{{ Math.round(getPasses(p.player)?.success / getPasses(p.player)?.overall * 100) }} %</td>
        <td class="text-right p-2">{{ Math.round(p.poss) }} %</td>
      </tr>
      </tbody>
    </table>
  </Dialog>
</template>

<script>

import Dialog from '@/components/toolkit/Dialog';

export default {
  name: 'Players',
  props: {
    game: Object
  },
  methods: {
    getPasses(player) {
      return this.game.passes.filter(x => x.player === player)[0];
    },
    getPlayers(game) {
      return game.possPlayer.filter(pl => pl.player !== 'unknown').concat().sort((a,b) => parseFloat(b.poss) - parseFloat(a.poss));
    }
  },
  components: {
    Dialog
  }
};
</script>
