<template>
  <v-container>
    <TheFixBtnQuickCatalog
      :can-use-filter="canUseFilter"
      @openQuickCatalog="drawerQuickCatalog = true"
      @openFilter="switchFilter"
    />
    <v-row class="justify-center">
      <v-col class="pt-0" style="max-width: 85vw">
        <TheGoodsListMenu />
        <v-card
          min-height="100vh"
          color="transparent"
          class="d-flex flex-wrap justify-center align-content-start"
          flat
          tile
        >
          <template v-if="subNomenklator.length === 0">
            <h2>Товар не найден по условиям отбора.</h2>
          </template>
          <template v-else>
            <div
              v-for="(pos, id) in subNomenklator"
              :key="id"
              itemscope=""
              itemtype="http://schema.org/Product"
            >
              <meta itemprop="name" :content="pos.name" />
              <meta
                itemprop="description"
                :content="pos.intrnt_microdata.description"
              />
              <link
                itemprop="url"
                :href="`https://newfurnitura.ru/catalog/${pos.parentguid}/${pos.synonym}`"
              />
              <link itemprop="image" :href="pos.guid_picture" />
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
              <meta
                property="og:description"
                :content="pos.intrnt_microdata.description"
              />
              <meta
                property="og:url"
                :content="`https://newfurnitura.ru/catalog/${pos.parentguid}/${pos.synonym}`"
              />
              <meta property="og:type" content="website" />
              <meta property="og:image" :content="pos.guid_picture" />

              <template v-if="catalogTypeView === 'mosaic'">
                <TheGoodsListMosaicElement
                  :id="id"
                  :pos="pos"
                  @chngorder="chngorder"
                />
              </template>
              <template v-else-if="catalogTypeView === 'list'">
                <TheGoodsListListElement
                  :id="id"
                  :pos="pos"
                  @chngorder="chngorder"
                />
              </template>
              <template v-else-if="catalogTypeView === 'table'">
                <TheGoodsListTableElement
                  :id="id"
                  :pos="pos"
                  @chngorder="chngorder"
                />
              </template>
            </div>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <TheDrawerFilter
      v-if="drawerFilter"
      :open-win="drawerFilter"
      @switchFilter="switchFilter"
    />
    <TheDrawerQuickCatalog
      v-if="drawerQuickCatalog"
      @closeQuickCatalog="drawerQuickCatalog = false"
    />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawerFilter: false,
      drawerQuickCatalog: false,
      filterVissible: false,
    };
  },
  computed: {
    ...mapGetters({
      catalogTypeView: "nomenklator/getCatalogTypeView",
      subNomenklator: "nomenklator/getSubNomenklator",
      canUseFilter: "nomenklator/getCanUseFilter",
      filterFilled: "nomenklator/getFilterOpened",
      filterFromGroup: "nomenklator/getFilterFromGroup",
      pageHeader: "nomenklator/pageHeader",
      pageTitle: "nomenklator/pageTitle",
    }),
  },
  mounted() {
    this.drawerFilter = this.filterFilled && this.filterFromGroup;
  },
  methods: {
    async switchFilter() {
      if (!this.filterFilled) {
        await this.$store.dispatch("nomenklator/openFilter", {
          parentguid: this.subNomenklator[0].parentguid,
        });
      }
      this.drawerFilter = !this.drawerFilter;
      this.filterVissible = !this.filterVissible;

      if (this.filterFromGroup) {
        await this.$store.commit("nomenklator/SET_FILTER_FROM_GROUP", false);
      }
    },
    async chngorder(id) {
      const pos = this.subNomenklator[id];

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
        await this.$store.dispatch("nomenklator/chngeCart", id);
      }
    },
  },

  head() {
    return {
      title: `${this.pageTitle} - Купить ${this.pageTitle} для мебели | МЕБЕЛЬНАЯ ФУРНИТУРА | ВСЕ ДЛЯ МЕБЕЛИ | МФ-КОМПЛЕКТ Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар`,
      meta: [],
    };
  },
};
</script>

<style>
.v-card--reveal {
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.5;
  position: absolute;
  width: 100%;
}
</style>
