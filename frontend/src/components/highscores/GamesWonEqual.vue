<template>
  <GamesWonBase title="Games Won With Equal Team Size" v-bind:filter="hasEqualPlayers"></GamesWonBase>
</template>

<script>

import GamesWonBase from '@/components/highscores/GamesWonBase';

export default {
  name: 'GamesEqual',
  components: {GamesWonBase},
  props: {},
  methods: {
    hasEqualPlayers(g) {
      return g.players.filter(p => p.team === 1).length === g.players.filter(p => p.team === 2).length;
    }
  }
};
</script>
