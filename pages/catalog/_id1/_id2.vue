<template>
  <v-container fluid>
    <h2 class="ma-2" style="">
      {{ pos.name }}
    </h2>

    <v-row clas="">
      <v-col md="auto" class="grey lighten-4 hidden-sm-and-down pr-0 pt-0">
        <div
          id="sidebar1"
          style="
            transform: translate(0, 0);
            transform: translate3d(0, 0, 0);
            will-change: position, transform;
          "
        >
          <div>
            <v-tabs
              v-model="cur_tab"
              class="ml-auto"
              background-color="grey lighten-4"
              vertical
              style="margin-top: 2px"
              active-class="background-color: white"
            >
              <v-tabs-slider color="transparent"></v-tabs-slider>
              <v-tab style="height: 30px" @click="$router.back()">
                <v-spacer /> К списку
              </v-tab>
              <v-tab style="height: 30px" @click="goTo('#section_1')">
                <v-spacer /> Обзор
              </v-tab>
              <v-tab style="height: 30px" @click="goTo('#section_2')">
                <v-spacer /> Описание
              </v-tab>
              <v-tab style="height: 30px" @click="goTo('#section_3')">
                <v-spacer /> Характеристики
              </v-tab>
              <v-tab style="height: 30px" @click="goTo('#section_4')">
                <v-spacer /> Инструкции и файлы
              </v-tab>
            </v-tabs>
          </div>
        </div>
      </v-col>

      <v-col
        id="section_0"
        v-intersect="{
          handler: onIntersect,
          options: {
            threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
          },
        }"
        md="8"
        sm="12"
        class="pt-0 pl-0 grey lighten-4"
      >
        <v-card id="section_1" flat style="margin-top: 2px">
          <v-img
            :src="`${pos.guid_picture.replace('_250x250', '')}`"
            contain
            max-width="300"
          />
        </v-card>

        <v-card id="section_2" style="height: 15vh" class="mt-1" flat
          ><v-card-text>Описание</v-card-text></v-card
        >

        <v-card id="section_3" style="height: 50vh" class="mt-1" flat
          ><v-card-text>Характеристики</v-card-text></v-card
        >
        <v-card id="section_4" style="height: 15vh" class="mt-1" flat
          ><v-card-text>Инструкции</v-card-text></v-card
        >
      </v-col>
      <v-col cols="2" style="" class="grey lighten-4">
        <div
          id="sidebar2"
          style="
            transform: translate(0, 0);
            transform: translate3d(0, 0, 0);
            will-change: position, transform;
          "
        >
          <div>
            <p>Артикул: {{ pos.artikul }}, {{ pos.artikul_new }}</p>
            <p class="">Цена: {{ pos.price1 }}</p>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async fetch({ app, params, query, store }) {
    if (params && params.id2) {
      await store.dispatch("nomenklator/loadGoodCard", params);
    }
  },
  data: () => ({
    posSwitchLeftRightPanel: 0,
    pos50: false,
    pos100: false,
    pos150: false,
    cur_tab: 1,
  }),
  computed: {
    ...mapGetters({
      pos: "nomenklator/getGoodCard",
    }),
  },
  mounted() {
    window.$("#sidebar1").stickr({ duration: 0, offsetTop: 55 });
    window.$("#sidebar2").stickr({ duration: 0, offsetTop: 55 });
  },
  methods: {
    goTo(element) {
      // this.$hello(window.$(element).position().top);
      this.$vuetify.goTo(window.$(element).position().top - 50);
    },

    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      // this.isIntersecting = entries[0].intersectionRatio >= 0.5
      const wScrL = window.$(window).scrollTop();
      const addVal = 5;

      const curBlock = [
        window.$("#section_1").offset().top - wScrL + addVal,
        window.$("#section_2").offset().top - wScrL + addVal,
        window.$("#section_3").offset().top - wScrL + addVal,
        window.$("#section_4").offset().top - wScrL + addVal,
      ];
      // this.$hello("--- " + curBlock.id.split("_")[1]);

      // this.$hello(curBlock.indexOf(curBlock.find((val) => val > 0)));

      this.cur_tab = curBlock.indexOf(curBlock.find((val) => val > 0)) + 1;

      // if (curBlock.sec >= 1) {
      //   const res = curBlock.id.split("_")[1];
      //   this.cur_tab = parseInt(res);
      //   // this.$hello(this.cur_tab);
      // }
      // if (entries[0].target.textContent === "Центр_50") {
      //   this.pos50 = entries[0].intersectionRatio >= 0.5;
      // }
      // if (entries[0].target.textContent === "Центр_100") {
      //   this.pos100 = entries[0].intersectionRatio >= 1;
      // }
      // if (entries[0].target.textContent === "Центр_149") {
      //   this.pos150 = entries[0].intersectionRatio >= 1;
      // }
      // consola.info(entries[0].target.innerText, entries[0].intersectionRatio)
    },
  },
};
</script>

<style lang="" scoped></style>
