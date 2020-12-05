<template>
  <v-container fluid>
    <v-row>
      <v-col md="3" lg="2" class="hidden-sm-and-down" style="">
        <TheGoodsListLeftSideBar
          :switch-filter="switchFilter"
          :parentguid="subNomenklator[0].parentguid"
        />
      </v-col>

      <v-col md="9" lg="10" class="pt-0" style="position: relative">
        <v-row v-if="canUseFilter" style="position: absolute; z-index: 10">
          <v-switch
            :input-value="filterOpened"
            style="margin-left: 25px; margin-top: 0px"
            @change="switchFilter"
          >
            <template v-slot:label> <div class="mt-2">Фильтр</div> </template>
          </v-switch>
        </v-row>
        <TheGoodsListMenu />
        <v-card
          min-height="100vh"
          color="transparent"
          class="d-flex flex-wrap justify-center align-content-start mt-4"
          flat
          tile
        >
          <template v-if="catalogTypeView === 'mosaic'">
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
      catalogTypeView: "nomenklator/getCatalogTypeView",
      canUseFilter: "nomenklator/getCanUseFilter",
      filterOpened: "nomenklator/getFilterOpened",
    }),
  },
  mounted() {
    // window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
    // $('#sidebar2').stickr({duration:0, offsetTop: 80});
  },
  methods: {
    async switchFilter() {
      if (this.filterOpened) {
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
