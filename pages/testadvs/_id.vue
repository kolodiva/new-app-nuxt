<template>
  <div v-html="`${advsHtml.rows[0].alt}`"></div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async fetch({ app, params, query, store }) {
    if (params && params.id) {
      await store.dispatch("nomenklator/loadAdvsHtml", params);
    }
  },

  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      advsHtml: "nomenklator/getAdvsHtml",
      requisite: "headerMenu/getRequisites",
    }),
  },
  beforeCreate() {},

  mounted() {},
  methods: {},
  head() {
    return {};
  },
};
</script>

<style></style>
