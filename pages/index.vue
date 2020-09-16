<template>
  <TheCatalogTopLevel :nomenkl-top-level="nomenklTopLevel" />
</template>

<script>
import { mapGetters } from "vuex";
import TheCatalogTopLevel from "@/components/Nomenklator/TheCatalogTopLevel.vue";
export default {
  name: "IndexPage",
  serverCacheKey() {
    return true;
  },
  components: { TheCatalogTopLevel },
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
