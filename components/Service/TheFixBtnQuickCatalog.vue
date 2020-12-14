<template>
  <div
    class="d-flex flex-column"
    style="position: fixed; left: 10px; z-index: 1"
  >
    <v-badge color="pink" dot overlap>
      <v-btn
        color="blue"
        x-small
        class="mb-4"
        width="40"
        height="40"
        @click="$emit('openQuickCatalog')"
      >
        <v-icon color="white">mdi-format-list-bulleted-square</v-icon>
      </v-btn>
    </v-badge>
    <v-btn
      v-if="canUseFilter"
      color="blue"
      x-small
      width="40"
      height="40"
      @click="$emit('openFilter')"
    >
      <v-icon color="white">mdi-filter</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: ["canUseFilter"],
  data() {
    return {};
  },

  computed: {},
  watch: {},
  methods: {},
};
</script>
