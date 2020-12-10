<template>
  <v-container>
    <TheFixBtnQuickCatalog
      :can-use-filter="canUseFilter"
      @openQuickCatalog="drawerQuickCatalog = true"
      @openFilter="switchFilter"
    />
    <v-row class="justify-center">
      <v-col cols="10" class="pt-0">
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
          <template v-else-if="catalogTypeView === 'mosaic'">
            <TheGoodsListMosaicElement
              v-for="(pos, id) in subNomenklator"
              :id="id"
              :key="id"
              :pos="pos"
              @chngorder="chngorder"
            />
          </template>
          <template v-else-if="catalogTypeView === 'list'">
            <TheGoodsListListElement
              v-for="(pos, id) in subNomenklator"
              :id="id"
              :key="id"
              :pos="pos"
              @chngorder="chngorder"
            />
          </template>
          <template v-else-if="catalogTypeView === 'table'">
            <TheGoodsListTableElement
              v-for="(pos, id) in subNomenklator"
              :id="id"
              :key="id"
              :pos="pos"
              @chngorder="chngorder"
            />
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
          text: `Мозги керак эмас.`,
          timeout: 3000,
          showing: true,
        });
      } else {
        await this.$store.dispatch("nomenklator/chngeCart", id);
      }
    },
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
