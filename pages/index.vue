<template>
  <div>
    <TheVueSlickCarousel />
    <TheCatalogTopLevel :nomenkl-top-level="nomenklTopLevel" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheVueSlickCarousel from "@/components/AppBar/TheVueSlickCarousel.vue";
import TheCatalogTopLevel from "@/components/Nomenklator/TheCatalogTopLevel.vue";
export default {
  name: "IndexPage",
  serverCacheKey() {
    return true;
  },
  components: { TheVueSlickCarousel, TheCatalogTopLevel },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      nomenklTopLevel: "service/getNomenklTopLevel",
    }),
  },
};
</script>

<style scoped></style>
