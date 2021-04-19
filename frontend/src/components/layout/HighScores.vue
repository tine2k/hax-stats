<template>
  <div class="grid gap-2 p-4 grid-cols-2 items-start">
    <div class="grid gap-2 grid-cols-1">
      <GamesWonAll></GamesWonAll>
      <GamesWonEqual></GamesWonEqual>
    </div>
    <div class="grid gap-2 grid-cols-1">
      <HighGoals></HighGoals>
      <HighPlayers></HighPlayers>
    </div>
  </div>
</template>

<script>
import GamesWonAll from '@/components/highscores/GamesWonAll';
import GamesWonEqual from '@/components/highscores/GamesWonEqual';
import HighGoals from '@/components/highscores/HighGoals';
import HighPlayers from '@/components/highscores/HighPlayers';

export default {
  name: 'HighScores',
  components: {HighPlayers, GamesWonAll, GamesWonEqual, HighGoals},
};
</script>
