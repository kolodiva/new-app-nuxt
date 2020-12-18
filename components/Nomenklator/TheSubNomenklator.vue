<template>
  <v-container>
    <TheFixBtnQuickCatalog
      :can-use-filter="canUseFilter"
      @openQuickCatalog="drawerQuickCatalog = true"
      @openFilter="switchFilter"
    />

    <v-sheet min-height="100vh" class="pl-10" height="">
      <v-row align="start" :style="{ 'justify-content': 'center' }">
        <n-link
          v-for="(pos, id) in subNomenklator"
          :key="id"
          :to="`${pos.guid}`"
          style="text-decoration: none"
        >
          <v-card class="ma-4" tile flat>
            <v-hover v-slot:default="{ hover }">
              <v-img
                eager
                :src="`${pos.guid_picture_small}`"
                contain
                width="160"
                height="160"
                :class="`${hover ? 'grey lighten-3' : 'grey lighten-2'}`"
                style="border-radius: 10px; border: 20px solid #eaecec"
                aspect-ratio="1"
                :alt="`${pos.name}`"
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
      title: `${this.pageHeader} - Купить ${this.pageHeader} для мебели | МЕБЕЛЬНАЯ ФУРНИТУРА | ВСЕ ДЛЯ МЕБЕЛИ | МФ-КОМПЛЕКТ Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар`,
      meta: [],
    };
  },
};
</script>
