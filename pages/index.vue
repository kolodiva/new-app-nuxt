<template>
  <div>
    <TheAppBar />
    <TheVueSlickCarousel />
    <div class="" style="height: 37vh"></div>

    <v-footer class="blueMfBckg" padless>
      <v-row
        align="center"
        justify="space-around"
        class=""
        style="min-height: 200px"
      >
        <v-card
          v-for="(link, id) in filials"
          :key="id"
          class="blueMfBckg ma-3 pa-2"
          outlined
          tile
          max-width="230"
          style="border-color: transparent"
        >
          <v-card-title
            class="headline py-0 pb-3 pl-2"
            :style="{ color: id == 0 ? 'white' : 'transparent' }"
            >Наши филиалы</v-card-title
          >

          <v-list-item class="pa-0">
            <v-list-item-icon class="mr-1"
              ><v-img src="shema_proezda.png" width="40" contain />
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title class="buttonMFWhiteColor">{{
                link.city
              }}</v-list-item-title>
              <v-list-item-subtitle class="buttonMFWhiteColor"
                >о нашем офисе</v-list-item-subtitle
              >
            </v-list-item-content>
          </v-list-item>
        </v-card>
        <v-col class="white" cols="12" justify="left">
          <span class="buttonMFGreyColorSmall ml-2"
            >&copy; MF KOMPLEKT 2003-{{ new Date().getFullYear() }}</span
          >
        </v-col>
      </v-row>
    </v-footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
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
    return {
      links: ["Home", "About Us", "Team", "Services", "Blog", "Contact Us"],
    };
  },
  computed: {
    ...mapGetters({
      filials: "headerMenu/getAllSortCity",
    }),
  },
};
</script>

<style scoped></style>
