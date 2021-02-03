<template>
  <v-container>
    <TheFixBtnQuickCatalog
      :can-use-filter="canUseFilter"
      @openQuickCatalog="drawerQuickCatalog = true"
      @openFilter="switchFilter"
    />

    <v-sheet min-height="100vh" class="pl-10" height="">
      <v-row
        align="start"
        :style="{ 'justify-content': 'center' }"
        itemscope
        itemtype="https://schema.org/ItemList"
      >
        <link
          itemprop="itemListOrder"
          href="https://schema.org/ItemListOrderDescending"
        />
        <link
          itemprop="url"
          :href="`https://www.newfurnitura.ru/catalog/${subNomenklator[0].parentguid}`"
        />
        <link itemprop="name" :href="pageHeader" />
        <meta itemprop="numberOfItems" :content="subNomenklator.length" />
        <n-link
          v-for="(pos, id) in subNomenklator"
          :key="id"
          exact
          :to="`/catalog/${pos.guid}`"
          style="text-decoration: none"
          itemprop="itemListElement"
          itemscope
        >
          <v-card class="ma-4" tile flat>
            <v-hover v-slot:default="{ hover }">
              <img
                :src="`${pos.guid_picture_small}`"
                :class="`${hover ? 'grey lighten-3' : 'grey lighten-2'}`"
                style="
                  border-radius: 10px;
                  border: 20px solid #eaecec;
                  width: 160px;
                  height: 160px;
                  object-fit: contain;
                "
                :alt="`${pos.intrnt_microdata.title}`"
              />
            </v-hover>

            <v-card-text class="text-center pt-2 pb-0" style="max-width: 160px">
              <span class="textMFGreyColor">{{ pos.name }}</span>
            </v-card-text>
          </v-card>
        </n-link>
      </v-row>
    </v-sheet>
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
    };
  },
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
      canUseFilter: "nomenklator/getCanUseFilter",
      filterFilled: "nomenklator/getFilterOpened",
      pageHeader: "nomenklator/pageHeader",
      pageTitle: "nomenklator/pageTitle",
    }),
  },
  watch: {},
  mounted() {
    // window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
  },
  methods: {
    async switchFilter() {
      if (!this.filterFilled) {
        await this.$store.dispatch("nomenklator/openFilter", {
          parentguid: this.subNomenklator[0].parentguid,
          fromGroup: true,
        });
      }
      this.drawerFilter = !this.drawerFilter;
      await this.$store.commit("nomenklator/SET_FILTER_FROM_GROUP", true);
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
