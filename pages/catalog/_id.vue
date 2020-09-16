<template>
  <div>
    <TheSubNomenklator :sub-nomenkl="subNomenklator" />
  </div>
</template>
<script>
// const consola = require("consola");
import { mapGetters } from "vuex";
import TheSubNomenklator from "@/components/Nomenklator/TheSubNomenklator.vue";

export default {
  components: { TheSubNomenklator },
  async fetch({ app, params, query, store }) {
    if (params && params.id) {
      // consola.info(params);
      await store.dispatch("nomenklator/loadSubNumenklator", params);
    }
  },

  data: () => ({}),
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
      isGroup: "nomenklator/isGroup",
    }),
  },
  beforeCreate() {},
  mounted() {},
  methods: {},
};
</script>
