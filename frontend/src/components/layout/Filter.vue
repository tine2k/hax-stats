<template>
  <div class="flex items-center select-none">
    <select class="ml-12 bg-hax-black-trans text-white text-sm" :value="filter.lastGames" @change="updateFilterLastGames">
      <option value="15g">Last 15 games</option>
      <option value="30g">Last 30 games</option>
      <option value="14d">Last 14 days</option>
      <option value="28d">Last 28 days</option>
      <option value="all">All</option>
    </select>

    <input id="equalTeams" type="checkbox" class="ml-4" :checked="filter.equalTeamSize" @change="updateFilterEqualTeamSize" />
    <label class="ml-2 text-white text-sm" for="equalTeams">Only games with equal team size</label>
  </div>
</template>

<script>

export default {
  name: 'Filter',
  components: {},
  computed: {
    filter() {
      return this.$store.state.filter;
    }
  },
  methods: {
    updateFilterLastGames(e) {
      this.$store.commit('filterLastGames', e.target.value);
    },
    updateFilterEqualTeamSize(e) {
      this.$store.commit('filterEqualTeamSize', e.target.checked);
    },
  }
};
</script>
