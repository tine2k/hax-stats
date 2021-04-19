<template>
  <GamesWonBase title="Games Won" v-bind:filter="() => true"></GamesWonBase>
</template>

<script>

import GamesWonBase from '@/components/highscores/GamesWonBase';

export default {
  name: 'GamesWon',
  components: {GamesWonBase},
};
</script>
