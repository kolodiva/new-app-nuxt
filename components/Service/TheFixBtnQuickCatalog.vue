<template>
  <div
    class="d-flex flex-column"
    style="position: fixed; left: 15px; top: 45vh; z-index: 1"
  >
    <v-speed-dial v-if="goodsList" v-model="fab" direction="right" class="mb-4">
      <template v-slot:activator>
        <v-btn v-model="fab" color="white" light fab width="40" height="40">
          <v-icon v-if="fab" color="blue"> mdi-close </v-icon>
          <v-icon v-else color="blue"> mdi-apps </v-icon>
        </v-btn>
      </template>
      <v-btn fab dark x-small color="green" @click="chngViewType('mosaic')">
        <v-icon>mdi-apps</v-icon>
      </v-btn>
      <v-btn fab dark x-small color="indigo" @click="chngViewType('list')">
        <v-icon>mdi-format-list-checkbox</v-icon>
      </v-btn>
      <v-btn fab dark x-small color="red" @click="chngViewType('table')">
        <v-icon>mdi-view-headline</v-icon>
      </v-btn>
    </v-speed-dial>

    <v-badge color="pink" dot overlap>
      <v-btn
        color="white"
        class="mb-4"
        width="40"
        height="40"
        fab
        @click="$emit('openQuickCatalog')"
      >
        <v-icon color="blue">mdi-arrow-decision-outline</v-icon>
      </v-btn>
    </v-badge>
    <v-btn
      v-if="canUseFilter"
      color="white"
      width="40"
      height="40"
      fab
      @click="$emit('openFilter')"
    >
      <v-icon color="blue">mdi-filter</v-icon>
    </v-btn>
  </div>
</template>
<script>
export default {
  props: ["canUseFilter", "goodsList"],
  data() {
    return {
      fab: false,
    };
  },

  computed: {},
  watch: {},
  methods: {
    chngViewType(name) {
      // this.$hello(name);
      this.$store.dispatch("nomenklator/chngCatalogTypeView", name);
    },
  },
};
</script>
