<template>
  <div class="flex bg-hax-black-trans">
    <MenuItem title="Games" route="games"></MenuItem>
    <MenuItem title="High Scores" route="highscores"></MenuItem>
    <Filter v-if="isHighScore.name === 'highscores'"></Filter>
  </div>
</template>

<script>
import MenuItem from '@/components/layout/MenuItem';
import Filter from '@/components/layout/Filter';

export default {
  name: 'Menu',
  components: {
    MenuItem, Filter
  },
  data() {
    return {
      isHighScore: this.$router.currentRoute,
    };
  },
};
</script>
