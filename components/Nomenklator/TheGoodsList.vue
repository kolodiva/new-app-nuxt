<template>
  <v-container fluid>
    <v-row class="">
      <v-col v-if="!showLimitWidth" style="max-width: 350px">
        <TheGoodsListLeftSideBar :switch-filter="switchFilter" />
      </v-col>

      <v-col class="pt-0" :style="{ 'max-width': widthRightSide }">
        <TheGoodsListMenu
          :can-use-filter="canUseFilter"
          :filter-opened="_filterOpened"
          @switchFilter="switchFilter"
        />
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
    <TheFilterDrawer
      v-if="drawerFilter"
      :open-win="drawerFilter"
      @switchFilter="switchFilter"
    />
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return { drawerFilter: false, groupDrawer: null, filterOpenedLocal: false };
  },
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
      catalogTypeView: "nomenklator/getCatalogTypeView",
      canUseFilter: "nomenklator/getCanUseFilter",
      filterOpened: "nomenklator/getFilterOpened",
      showLimitWidth: "service/getShowLimitWidth",
      displayWidth: "service/getDisplayWidth",
    }),
    widthRightSide() {
      const res = this.showLimitWidth
        ? "100vw"
        : this.displayWidth - 370 + "px";
      return res;
    },
    _filterOpened() {
      return this.showLimitWidth ? this.filterOpenedLocal : this.filterOpened;
    },
  },
  mounted() {
    // window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
    // $('#sidebar2').stickr({duration:0, offsetTop: 80});
    if (this.filterOpened && this.showLimitWidth) {
      this.drawerFilter = true;
      this.filterOpenedLocal = true;
    }
  },
  methods: {
    async switchFilter() {
      if (this.showLimitWidth) {
        if (!this.filterOpened) {
          await this.$store.dispatch("nomenklator/openFilter", {
            parentguid: this.subNomenklator[0].parentguid,
          });
        }
        this.drawerFilter = !this.drawerFilter;
        this.filterOpenedLocal = !this.filterOpenedLocal;
      } else if (this.filterOpened) {
        await this.$store.dispatch("nomenklator/closeFilter");
      } else {
        await this.$store.dispatch("nomenklator/openFilter", {
          parentguid: this.subNomenklator[0].parentguid,
        });
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
