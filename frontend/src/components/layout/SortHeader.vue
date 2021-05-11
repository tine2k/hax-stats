<template>
  <th class="sort-header p-2" @click="sort()">
    <div class="flex items-center justify-end" :class="{ 'flex-row-reverse': align !== 'right' }">
      <span class="p-2 text-hax-red" :class="{ invisible: currentlySortedBy !== field }"> {{ sortAsc ? '↓' : '↑' }} </span>
      <slot></slot>
    </div>
  </th>
</template>

<script>

export default {
  name: 'SortHeader',
  components: {},
  props: {
    field: String,
    classes: String,
    align: {
      type: String,
      default: () => 'right'
    },
    currentlySortedBy: String,
  },
  watch: {
    currentlySortedBy: function(newVal) {
      this.sortAsc = true;
      this.sortField = newVal;
    }
  },
  data() {
    return {
      sortField: undefined,
      sortAsc: false,
    };
  },
  methods: {
    sort() {
      if (this.sortField === this.field) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortField = this.field;
        this.sortAsc = true;
      }
      this.$emit('sort', [this.field, this.sortAsc]);
    }
  }
};
</script>

<style>
.sort-header {
  @apply cursor-pointer select-none;
}
</style>
