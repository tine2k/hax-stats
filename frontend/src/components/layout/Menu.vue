<template>
  <div class="flex bg-hax-black-trans">
    <MenuItem title="Games" route="overview"></MenuItem>
    <MenuItem title="High Scores" route="highscores"></MenuItem>
  </div>
</template>

<script>
import MenuItem from '@/components/layout/MenuItem';

export default {
  name: 'Menu',
  components: {
    MenuItem
  }
};
</script>
