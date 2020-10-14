<template>
  <div>
    <v-container v-scroll="onIntersect" fluid>
      <v-row class="">
        <v-col class="grey lighten-4 hidden-sm-and-down pr-0 pt-0">
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

        <v-col md="8" sm="12" class="pt-0 pl-0 grey lighten-4">
          <v-card id="section_1" flat style="margin-top: 2px">
            <v-card-text class="">{{ pos.name }}</v-card-text>
            <v-row align="center">
              <v-col class="pt-0">
                <v-tabs height="0" :value="cur_tab_photos">
                  <v-tab-item v-for="(photo, i) in photos" :key="i">
                    <v-hover v-slot:default="{ hover }">
                      <v-img
                        :src="`${photo.pic_path.replace('_250x250', '')}`"
                        contain
                        height="400"
                        class="mx-auto"
                      >
                        <v-row class="fill-height flex-column" justify="center">
                          <div class="align-self-center">
                            <v-btn
                              :class="{ 'show-btns': hover }"
                              color="transparent"
                              icon
                              @click="openDialogBigView = true"
                            >
                              <v-icon x-large :class="{ greyMfText: hover }">
                                mdi-magnify-plus
                              </v-icon></v-btn
                            >
                          </div>
                        </v-row>
                      </v-img>
                    </v-hover>
                  </v-tab-item>
                </v-tabs>
                <v-tabs centered @change="(id) => (cur_tab_photos = id)">
                  <v-tab v-for="(photo, i) in photos" :key="i">
                    <v-img :src="`${photo.pic_path}`" contain max-width="55" />
                  </v-tab>
                </v-tabs>
              </v-col>

              <v-col>
                <v-simple-table dense>
                  <template v-slot:default>
                    <tbody>
                      <tr v-for="item in characts" :key="item.field">
                        <td style="border-bottom: 1px dotted #cccccc">
                          {{ item.field }}
                        </td>
                        <td style="border-bottom: 0px">{{ pos[item.val] }}</td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-col>
            </v-row>
          </v-card>

          <v-card id="section_2" style="min-height: 20vh" class="mt-1" flat>
            <v-card-title>Описание</v-card-title>
            <v-card-text v-html="pos.describe"></v-card-text
          ></v-card>

          <v-card id="section_3" style="height: 50vh" class="mt-1" flat
            ><v-card-text>Характеристики</v-card-text></v-card
          >
          <v-card id="section_4" style="height: 15vh" class="mt-1" flat
            ><v-card-text>Инструкции</v-card-text></v-card
          >
        </v-col>
        <v-col style="" class="grey lighten-4">
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
    <TheCardGoodBigView
      :photos="photos[cur_tab_photos]"
      :open-dialog="openDialogBigView"
      @closeWin="closeBigView"
    />
  </div>
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
    cur_tab: 1,
    cur_tab_photos: 0,
    characts: [
      { field: "Артикул", val: "artikul" },
      { field: "Артикул новый", val: "artikul_new" },
      { field: "Производитель", val: "producer" },
      { field: "Единица измерения", val: "unit_name" },
      { field: "Вес, кг", val: "weight" },
      { field: "Цвет", val: "color" },
    ],
    openDialogBigView: false,
  }),
  computed: {
    ...mapGetters({
      pos: "nomenklator/getGoodCard",
      photos: "nomenklator/getGoodCardRowsPhoto",
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

    closeBigView(event) {
      this.openDialogBigView = false;
    },

    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      // this.isIntersecting = entries[0].intersectionRatio >= 0.5
      const wScrL = window.$(window).scrollTop();
      const addVal = 150;

      const curBlock = [
        window.$("#section_1").offset().top - wScrL + addVal,
        window.$("#section_2").offset().top - wScrL + addVal,
        window.$("#section_3").offset().top - wScrL + addVal,
        window.$("#section_4").offset().top - wScrL + addVal,
      ];
      // this.$hello("--- " + curBlock.id.split("_")[1]);

      // this.$hello(curBlock.indexOf(curBlock.find((val) => val > 0)));
      // this.$hello(curBlock);

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

<style>
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
