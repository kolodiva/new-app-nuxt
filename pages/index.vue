<template>
  <div>
    <TheAppBar :filials="filials" />
    <TheVueSlickCarousel />
    <TheCatalogTopLevel :nomenkl-top-level="nomenklTopLevel" />
    <TheFooter :filials="filials" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheAppBar from "@/components/AppBar/TheAppBar.vue";
import TheVueSlickCarousel from "@/components/TheVueSlickCarousel.vue";
import TheCatalogTopLevel from "@/components/TheCatalogTopLevel.vue";
import TheFooter from "@/components/TheFooter.vue";

export default {
  name: "IndexPage",
  serverCacheKey() {
    return true;
  },
  components: { TheAppBar, TheVueSlickCarousel, TheCatalogTopLevel, TheFooter },
  async fetch({ store }) {
    await store.dispatch("service/setSliderSlides");
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      filials: "headerMenu/getAllSortCity",
      nomenklTopLevel: "service/getNomenklTopLevel",
    }),
  },
};
</script>

<style scoped></style>
