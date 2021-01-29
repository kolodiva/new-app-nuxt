<template>
  <div>
    <TheBreadCrumbs
      :type-src="{ src: 'goodCard' }"
      :good-card-bread-crumb="goodCardBreadCrumb"
      :class="[showLimitWidth ? '' : 'ml-10']"
    />
    <v-container v-scroll="onIntersect" v-resize="onResize" style="">
      <v-row class="">
        <v-col
          class="grey lighten-4 pr-0 pt-0"
          style="max-width: 230px; position: relative"
        >
          <div id="sidebar1" style="">
            <div>
              <v-tabs
                v-model="cur_tab"
                class="ml-auto"
                background-color="grey lighten-4"
                style="margin-top: 2px"
                active-class="background-color: white"
                vertical
              >
                <v-tabs-slider color="transparent"></v-tabs-slider>
                <v-tab style="height: 30px" @click="backUp()">
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
                <v-tab
                  v-if="false"
                  style="height: 30px"
                  @click="goTo('#section_4')"
                >
                  <v-spacer /> Инструкции
                </v-tab>
                <v-tab
                  v-if="posDopComplects && posDopComplects.length > 0"
                  style="height: 30px"
                  @click="goTo('#section_5')"
                >
                  <v-spacer /> С этим покупают
                </v-tab>
              </v-tabs>
            </div>
          </div>
        </v-col>

        <v-col class="pt-0 pl-0 grey lighten-4">
          <v-tabs
            v-model="cur_tab_complects"
            :height="posComplects && posComplects.length > 0 ? 48 : 0"
          >
            <v-tab> Изделие </v-tab>
            <v-tab> Комплектация </v-tab>
          </v-tabs>

          <v-card
            id="section_1"
            flat
            style="margin-top: 2px; min-height: 550px"
          >
            <v-tabs-items v-model="cur_tab_complects">
              <v-tab-item>
                <div itemscope="" itemtype="http://schema.org/Product">
                  <meta itemprop="name" :content="pos.name" />
                  <meta itemprop="description" :content="descr_3" />
                  <link
                    itemprop="url"
                    :href="`https://newfurnitura.ru/catalog/${pos.parentguid}/${pos.synonym}`"
                  />
                  <link itemprop="image" :href="pos.guid_picture" />
                  <meta itemprop="category" :content="categoryCard" />
                  <meta itemprop="model" :content="pos.artikul_new" />
                  <div
                    itemprop="offers"
                    itemscope=""
                    itemtype="http://schema.org/Offer"
                  >
                    <meta itemprop="priceCurrency" content="RUB" />
                    <link
                      itemprop="availability"
                      href="http://schema.org/InStock"
                    />
                  </div>

                  <meta
                    property="og:title"
                    :content="`Лучшая цена 👍: ${pos.intrnt_microdata.title} ⭐ ⭐ ⭐ ⭐ ⭐`"
                  />
                  <meta property="og:description" :content="descr_3" />
                  <meta
                    property="og:url"
                    :content="`https://newfurnitura.ru/catalog/${pos.parentguid}/${pos.synonym}`"
                  />
                  <meta property="og:type" content="website" />
                  <meta property="og:image" :content="pos.guid_picture" />

                  <v-card-title class="pb-0"
                    >{{ pos.artikul }}, {{ pos.artikul_new }}
                  </v-card-title>
                  <v-card-text class="">{{ pos.name }}</v-card-text>
                  <v-row align="center">
                    <v-col class="pt-0">
                      <v-tabs-items v-model="cur_tab_photos">
                        <v-tab-item v-for="(photo, i) in photos" :key="i">
                          <div style="position: relative">
                            <img
                              :src="`${photo.pic_path.replace('_250x250', '')}`"
                              class="d-block mx-auto"
                              style="
                                min-height: 400px;
                                max-width: 400px;
                                cursor: pointer;
                              "
                              :alt="photo.name + ' ' + photo.alt"
                              @click="openDialogBigView = true"
                            />
                          </div>
                        </v-tab-item>
                      </v-tabs-items>
                      <v-tabs v-model="cur_tab_photos" centered>
                        <v-tab v-for="(photo, i) in photos" :key="i">
                          <img
                            :src="`${photo.pic_path}`"
                            style="max-width: 55px; object-fit: contain"
                            :alt="photo.name + ' ' + photo.alt"
                          />
                        </v-tab>
                      </v-tabs>
                    </v-col>

                    <v-col>
                      <v-simple-table dense class="">
                        <template v-slot:default>
                          <tbody>
                            <tr v-for="item in characts" :key="item.field">
                              <td style="border-bottom: 1px dotted #cccccc">
                                {{ item.field }}
                              </td>
                              <td style="border-bottom: 0px">
                                {{ pos[item.val] }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-col>

                    <v-col v-if="showLimitWidth">
                      <div class="pa-4">
                        <div class="d-flex">
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon
                                v-bind="attrs"
                                style="transform: scale(-1, 1)"
                                v-on="on"
                                >mdi-head-heart-outline
                              </v-icon>
                            </template>
                            <div>Цена мелк.опт: {{ pos.price2 }} руб.</div>
                            <div>Цена круп.опт: {{ pos.price3 }} руб.</div>
                          </v-tooltip>
                          &nbsp;
                          <div>{{ pos.price1 }} руб./{{ pos.unit_name }}</div>
                        </div>

                        <v-text-field
                          v-model="pos.qty2"
                          rounded
                          filled
                          clearable
                          type="number"
                          :class="[
                            'mt-4',
                            'centered-input',
                            { 'change-value': diffQty },
                          ]"
                          style="max-width: 290px"
                          dense
                          :label="txtLabel"
                          @keyup.esc="pos.qty2 = pos.qty1"
                          @keyup.enter="chngorder()"
                          @focus="$event.target.select()"
                          @click:clear="
                            pos.qty2 = 0;
                            chngorder();
                          "
                        >
                          <v-img
                            slot="append"
                            src="/cart.png"
                            width="28"
                            style="cursor: pointer"
                            @click="chngorder()"
                          />
                        </v-text-field>
                      </div>
                    </v-col>
                  </v-row>
                </div>
              </v-tab-item>

              <v-tab-item>
                <v-card
                  flat
                  style="
                    min-height: 500px;
                    max-height: 500px;
                    position: relative;
                  "
                >
                  <v-list>
                    <v-list-item-group>
                      <v-list-item
                        v-for="(item, i) in posComplects"
                        :key="i"
                        @click.stop="openShowComplectPos(item)"
                      >
                        <v-list-item-icon>
                          <v-img :src="item.pic_path_small" />
                        </v-list-item-icon>
                        <v-list-item-content>
                          {{ item.artikul }}, {{ item.name }}, в единице
                          комплекта: {{ item.qty }} x
                          {{ item.unit_name }}
                        </v-list-item-content>
                      </v-list-item>
                    </v-list-item-group>
                  </v-list>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
          </v-card>

          <v-card id="section_2" style="min-height: 20vh" class="mt-1" flat>
            <v-card-title>Описание</v-card-title>
            <v-card-text v-html="descr_0"></v-card-text
          ></v-card>

          <v-card id="section_3" style="min-height: 20vh" class="mt-1" flat
            ><v-card-title>Характеристики</v-card-title>
            <v-card-text class="pb-0"
              >Вес брутто кг., {{ pos["weight"] }}</v-card-text
            >
            <v-card-text class="pt-0" v-html="descr_1"></v-card-text
          ></v-card>
          <v-card
            v-if="false"
            id="section_4"
            style="height: 17vh"
            class="mt-1"
            flat
          >
            <v-card-title>Инструкции</v-card-title></v-card
          >
        </v-col>
        <v-col
          v-if="!showLimitWidth"
          class="grey lighten-4"
          style="max-width: 230px; position: relative"
        >
          <div id="sidebar2" style="">
            <div>
              <p>Артикул: {{ pos.artikul }}, {{ pos.artikul_new }}</p>
              <div class="d-flex">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      style="transform: scale(-1, 1)"
                      v-on="on"
                      >mdi-head-heart-outline
                    </v-icon>
                  </template>
                  <div>Цена мелк.опт: {{ pos.price2 }} руб.</div>
                  <div>Цена круп.опт: {{ pos.price3 }} руб.</div>
                </v-tooltip>
                &nbsp;
                <div>{{ pos.price1 }} руб./{{ pos.unit_name }}</div>
              </div>

              <v-text-field
                v-model="pos.qty2"
                rounded
                filled
                clearable
                type="number"
                :class="['mt-4', 'centered-input', { 'change-value': diffQty }]"
                style="max-width: 290px"
                dense
                :label="txtLabel"
                @keyup.esc="pos.qty2 = pos.qty1"
                @keyup.enter="chngorder()"
                @focus="$event.target.select()"
                @click:clear="
                  pos.qty2 = 0;
                  chngorder();
                "
              >
                <v-img
                  slot="append"
                  src="/cart.png"
                  width="28"
                  style="cursor: pointer"
                  @click="chngorder()"
                />
              </v-text-field>
            </div>
          </div>
        </v-col>
      </v-row>
      <v-card
        v-if="posDopComplects && posDopComplects.length > 0"
        id="section_5"
        style=""
        class="mt-1"
        flat
        ><v-card-text class="pb-0 mb-n5">С этим покупают</v-card-text>

        <div id="appDopComplects">
          <section>
            <vue-horizontal-list :items="posDopComplects" :options="options">
              <template v-slot:default="{ item }">
                <TheGoodsListMosaicElementDopComplects
                  :key="item.guid"
                  :pos="item"
                  @chngorder="chngorderdopcomplect"
                />
              </template>
            </vue-horizontal-list>
          </section>
        </div>
      </v-card>
    </v-container>
    <TheCardGoodBigView
      :photos="photos"
      :open-dialog="openDialogBigView"
      :foto-index="cur_tab_photos"
      @closeWin="closeBigView"
    />
    <TheDialogComplects
      :info-complect-pos="infoComplectPos"
      :open-dialog="showComplectPos"
      @closeWin="closeComplectsView"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import VueHorizontalList from "vue-horizontal-list";
// import $ from "jquery";
export default {
  components: {
    VueHorizontalList,
  },
  async fetch({ app, params, query, store, router, redirect }) {
    if (params && params) {
      // console.log(params.id2);
      const res = await store.dispatch("nomenklator/loadGoodCard", params);

      if (!res) {
        redirect("/error");
      }
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
    fromRoute: null,
    textLabel: "",
    cur_tab_complects: 0,
    showComplectPos: false,
    infoComplectPos: {},
    options: {
      autoplay: { play: false, repeat: true, speed: 3000 },
      // responsive: [
      //   { end: 576, size: 1 },
      //   { start: 576, end: 768, size: 2 },
      //   { start: 768, end: 992, size: 2 },
      //   { start: 992, end: 1200, size: 3 },
      // ],
      list: {
        // 1200 because @media (min-width: 1200px) and therefore I want to switch to windowed mode
        // windowed: 2000,
        // Because: #app {padding: 80px 24px;}
        // padding: 24,
      },
    },
  }),
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.fromRoute = from;
    });
  },
  computed: {
    ...mapGetters({
      pos: "nomenklator/getGoodCard",
      posComplects: "nomenklator/getGoodCardComplects",
      goodCardBreadCrumb: "nomenklator/getGoodCardBreadCrumb",
      posDopComplects: "nomenklator/getGoodCardDopComplects",
      photos: "nomenklator/getGoodCardRowsPhoto",
      showLimitWidth: "service/getShowLimitWidth",
    }),
    txtLabel() {
      return parseFloat(this.pos.qty1) === parseFloat(this.pos.qty2)
        ? this.pos.unit_name
        : this.pos.unit_name + ", было " + this.pos.qty1 + ", esc - отмена.";
    },
    diffQty() {
      return parseFloat(this.pos.qty1) !== parseFloat(this.pos.qty2);
    },
    descr_0() {
      let tmp = "";
      try {
        tmp = this.pos.describe
          .split("\n")
          .filter((v) => {
            return v.includes("font-weight:");
          })
          .join("\n");
      } catch (e) {}

      return tmp;
    },
    descr_1() {
      let tmp = "";
      try {
        tmp = this.pos.describe
          .split("\n")
          .filter((v) => {
            return !v.includes("font-weight:");
          })
          .join("\n");
      } catch (e) {}

      return tmp;
    },
    descr_3() {
      let tmp = "";
      try {
        tmp = this.pos.intrnt_microdata.description;
      } catch (e) {}

      return tmp;
    },
    categoryCard() {
      let tmp = "";
      try {
        if (this.goodCardBreadCrumb) {
          const val = this.goodCardBreadCrumb[
            this.goodCardBreadCrumb.length - 1
          ];
          tmp = val.text;
        }
      } catch (e) {}

      return tmp;
    },
  },
  watch: {
    showComplectPos(val) {
      // val &&
      //   setTimeout(() => {
      //     if (this.showComplectPos === true) {
      //       this.showComplectPos = false;
      //     }
      //   }, 2000);
    },
  },
  mounted() {
    // window.$("#sidebar1").stickr({ duration: 0, offsetTop: 55 });
    // window.$("#sidebar2").stickr({ duration: 0, offsetTop: 55 });
  },
  methods: {
    backUp() {
      if (!this.fromRoute || !this.fromRoute.name) {
        this.$router.push("/catalog/" + this.pos.parentguid);
      } else {
        this.$router.back();
      }
    },

    goTo(element) {
      // this.$hello(window.$(element).position().top);
      this.$vuetify.goTo(window.$(element).position().top - 50);
    },

    closeBigView(event) {
      this.openDialogBigView = false;
    },

    closeComplectsView(event) {
      this.showComplectPos = false;
    },

    fixSideBar() {
      const checkPoint1 = window.$("#sidebar1");

      if (!checkPoint1) {
        return;
      }

      const checkPoint2 = window.$("#sidebar2");

      const wScrL = window.$(window).scrollTop();
      const addVal = 150;

      if (wScrL > addVal) {
        const count1 =
          window.$("#sidebar1").parent().offset().top +
          window.$("#sidebar1").parent().height() -
          window.$(window).scrollTop();

        if (
          count1 <
          (this.posDopComplects && this.posDopComplects.length > 0 ? 209 : 202)
        ) {
          checkPoint1.css("position", "relative");
          checkPoint1.css("left", 0);
          checkPoint1.css(
            "top",
            window.$("#sidebar1").parent().offset().top +
              window.$("#sidebar1").parent().height() -
              395 +
              "px"
          );

          if (checkPoint2 && checkPoint2.parent().offset()) {
            checkPoint2.css("position", "relative");
            checkPoint2.css("left", 0);
            checkPoint2.css(
              "top",
              window.$("#sidebar2").parent().offset().top +
                window.$("#sidebar2").parent().height() -
                385 +
                "px"
            );
          }

          return;
        }

        let step =
          checkPoint1.parent().width() -
          checkPoint1.width() +
          checkPoint1.parent().offset().left +
          12 +
          "px";
        checkPoint1.css("position", "fixed");
        checkPoint1.css("top", "50px");
        checkPoint1.css("left", step);

        if (checkPoint2 && checkPoint2.parent().offset()) {
          step =
            checkPoint2.parent().width() -
            checkPoint2.width() +
            checkPoint2.parent().offset().left +
            12 +
            "px";
          checkPoint2.css("position", "fixed");
          checkPoint2.css("top", "50px");
          checkPoint2.css("left", step);
          checkPoint2.css("width", checkPoint2.parent().width() + "px");
        }
      } else {
        checkPoint1.css("position", "static");
        checkPoint1.css("top", "0px");

        if (checkPoint2 && checkPoint2.parent().offset()) {
          checkPoint2.css("position", "static");
          checkPoint2.css("top", "0px");
        }
      }
    },

    onResize() {
      this.fixSideBar();
    },
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      // this.isIntersecting = entries[0].intersectionRatio >= 0.5
      const wScrL = window.$(window).scrollTop();
      const addVal = 150;

      this.fixSideBar();

      const curBlock = [];

      for (let i = 0; i <= 5; i++) {
        try {
          const nameObj = `#section_${i}`;
          const tmp = window.$(nameObj).offset().top - wScrL + addVal;
          curBlock.push(tmp);
        } catch (e) {}
      }

      // const curBlock = [
      //   window.$("#section_1").offset().top - wScrL + addVal,
      //   window.$("#section_2").offset().top - wScrL + addVal,
      //   window.$("#section_3").offset().top - wScrL + addVal,
      //   window.$("#section_4").offset().top - wScrL + addVal,
      //   window.$("#section_5").offset().top - wScrL + addVal,
      // ];

      this.cur_tab = curBlock.indexOf(curBlock.find((val) => val > 0)) + 1;
    },

    async chngorderdopcomplect(pos) {
      if (pos.qty2 === "" || pos.qty2 == null || parseFloat(pos.qty2) < 0) {
        pos.qty2 = 0;
      }

      if (parseFloat(pos.qty1) === parseFloat(pos.qty2)) {
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: `Необходимо изменить Количество.`,
          timeout: 3000,
          showing: true,
        });
      } else {
        await this.$store.dispatch("nomenklator/chngeCartFromDopComplect", pos);
      }
    },

    async chngorder() {
      const pos = this.pos;

      if (pos.qty2 === "" || pos.qty2 === null || parseFloat(pos.qty2) < 0) {
        pos.qty2 = 0;
      }
      // this.$hello(pos.qty1 === undefined);
      if (parseFloat(pos.qty1) === parseFloat(pos.qty2)) {
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: `Необходимо изменить Количество.`,
          timeout: 3000,
          showing: true,
        });
      } else {
        await this.$store.dispatch("nomenklator/chngeCart", -1);
      }
    },

    openShowComplectPos(pos) {
      this.infoComplectPos = { ...pos };
      this.showComplectPos = true;
    },
  },
  head() {
    return {
      title: `${this.pos.intrnt_microdata.title} - Купить в Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар | Описание, фото, характеристики, цены в Интернет магазине МФ-Комплект`,
    };
  },
};
</script>

<style scoped>
.change-value >>> .v-text-field__slot input {
  color: red;
}
.show-btns {
  color: rgba(255, 255, 255, 1) !important;
}
.centered-input >>> input {
  /* text-align: center; */
}
.centered-input >>> input[type="number"] {
  -moz-appearance: textfield;
}
.centered-input >>> input::-webkit-outer-spin-button,
.centered-input >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
.item {
  padding: 24px;
  border-radius: 3px;
  background: #f5f5f5;
}

#appDopComplects {
  max-width: 1200px;

  margin-left: auto;
  margin-right: auto;

  padding: 0 15px;
}

@media (min-width: 1200px) {
  /* #appDopComplects {
    padding-left: 80px;
    padding-right: 80px;
  } */
}
</style>
