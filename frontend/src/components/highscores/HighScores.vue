<template>
  <div class="grid gap-2 p-4 grid-cols-2 items-start">
    <div class="grid gap-2 grid-cols-1">
      <GamesWon></GamesWon>
      <GameList v-bind:games="$store.state.filteredGames" title="Games"></GameList>
    </div>
    <div class="grid gap-2 grid-cols-1">
      <HighGoals></HighGoals>
      <HighPlayers></HighPlayers>
    </div>
  </div>
</template>

<script>
import HighGoals from '@/components/highscores/HighGoals';
import HighPlayers from '@/components/highscores/HighPlayers';
import GamesWon from '@/components/highscores/GamesWon';
import GameList from '@/components/games/GameList';

export default {
  name: 'HighScores',
  components: {HighPlayers, GamesWon, HighGoals, GameList},
};
</script>
