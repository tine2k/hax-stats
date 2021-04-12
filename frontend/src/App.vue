<template>
  <Title>High Scores</Title>
  <div class="grid gap-2 p-2 grid-cols-2">
    <Dialog title="Top Scorer"></Dialog>
  </div>
  <Title>Game List</Title>
  <div class="grid gap-2 p-2 grid-cols-2">
    <GameList @select-game="this.game = $event"></GameList>
    <GameDetail v-if="game" v-bind:game="game"></GameDetail>
    <Goals v-if="game" v-bind:game="game"></Goals>
  </div>
</template>

<script>
import GameList from '@/components/GameList';
import GameDetail from '@/components/GameDetail';
import Goals from '@/components/Goals';
import Dialog from '@/components/Dialog';
import Title from '@/components/Title';

export default {
  name: 'App',
  components: {
    Dialog,
    GameList,
    GameDetail,
    Goals,
    Title
  },
  data() {
    return {
      game: undefined
    };
  },
};
</script>
