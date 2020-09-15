<template>
  <div>
    <TheAppBar :filials="filials" />
    <TheVueSlickCarousel />
    <v-container class="my-10" style="max-width: 800px">
      <v-row align="start" justify="space-between">
        <v-card
          v-for="(pic, id) in nomenklTopLevel"
          :key="id"
          style=""
          class="ma-2"
          tile
          flat
        >
          <v-img
            :src="`./index_pic/${pic.file_name}.png`"
            contain
            class=""
            style="
              width: 160px;
              height: 160px;
              background-color: #eaecec;
              border-radius: 10px;
              border: 20px solid #eaecec;
            "
          />
          <v-card-text class="text-center pt-2" style="max-width: 160px">
            <span class="textMFGreyColor">{{ pic.name }}</span>
          </v-card-text>
        </v-card>
      </v-row>
    </v-container>

    <TheFooter :filials="filials" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheAppBar from "@/components/AppBar/TheAppBar.vue";
import TheVueSlickCarousel from "@/components/TheVueSlickCarousel.vue";
import TheFooter from "@/components/AppBar/TheFooter.vue";

export default {
  name: "IndexPage",
  serverCacheKey() {
    return true;
  },
  components: { TheAppBar, TheVueSlickCarousel, TheFooter },
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
