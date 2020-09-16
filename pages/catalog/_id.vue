<template>
  <div>
    <v-breadcrumbs
      :items="breadCrumb"
      class="mt-10"
      style="justify-content: center"
    >
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
    <TheSubNomenklator :sub-nomenkl="subNomenklator" />
    <v-breadcrumbs
      :items="breadCrumb"
      class="mb-10"
      style="justify-content: center"
    >
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>
    </v-breadcrumbs>
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
      breadCrumb: "nomenklator/getBreadCrumb",
    }),
  },
  beforeCreate() {},
  mounted() {},
  methods: {},
};
</script>
