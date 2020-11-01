<template>
  <v-toolbar dense flat rounded bordered>
    <v-spacer></v-spacer>

    <v-toolbar-title class="body-2">Вид каталога:</v-toolbar-title>

    <v-toolbar-title class="body-2 ml-4"
      ><v-icon
        :color="catalogTypeView === 'mosaic' ? iconColor : null"
        style="cursor: pointer"
        @click="chngViewType('mosaic')"
        >mdi-apps
      </v-icon></v-toolbar-title
    >
    <v-toolbar-title class="body-2 ml-4"
      ><v-icon
        :color="catalogTypeView === 'list' ? iconColor : null"
        style="cursor: pointer"
        @click="chngViewType('list')"
        >mdi-format-list-checkbox
      </v-icon></v-toolbar-title
    >
    <v-toolbar-title class="body-2 ml-4"
      ><v-icon
        :color="catalogTypeView === 'table' ? iconColor : null"
        style="cursor: pointer"
        @click="chngViewType('table')"
        >mdi-view-headline</v-icon
      ></v-toolbar-title
    >
  </v-toolbar>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      iconColor: "blue",
    };
  },
  computed: {
    ...mapGetters({
      catalogTypeView: "nomenklator/getCatalogTypeView",
    }),
  },
  mounted() {},
  methods: {
    chngViewType(name) {
      // this.$hello(name);
      this.$store.dispatch("nomenklator/chngCatalogTypeView", name);
    },
  },
};
</script>

<style></style>
