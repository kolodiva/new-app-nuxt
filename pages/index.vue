<template>
  <div>
    <TheAppBar />
    <TheVueSlickCarousel />
    <div class="" style="height: 200vw"></div>
  </div>
</template>

<script>
import TheVueSlickCarousel from "@/components/TheVueSlickCarousel.vue";
import TheAppBar from "@/components/AppBar/TheAppBar.vue";

export default {
  name: "IndexPage",
  serverCacheKey() {
    return true;
  },
  components: { TheVueSlickCarousel, TheAppBar },
  async fetch({ store }) {
    await store.dispatch("service/setSliderSlides");
  },
  data() {
    return {};
  },
  computed: {},
};
</script>

<style scoped></style>
