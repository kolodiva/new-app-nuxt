<template>
  <v-container fluid>
    <v-row>
      <v-col v-if="!showLimitWidth" md="3" lg="2" class="" style="">
        <TheGoodsListLeftSideBar
          :switch-filter="switchFilter"
          :parentguid="
            (subNomenklator.length > 0 && subNomenklator[0].parentguid) || null
          "
        />
      </v-col>

      <v-col md="9" lg="10" class="pt-0" style="position: relative; z-index: 2">
        <v-row v-if="canUseFilter" style="position: absolute">
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

    <v-navigation-drawer v-model="drawerFilter" app temporary dark width="350">
      <v-toolbar dense color="transparent" flat @click="drawerFilter = false">
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-undo-variant</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-list nav>
        <v-list-item-group v-model="groupDrawer" active-class="">
          <template v-for="(item, i) in header3.items">
            <v-list-group v-if="item.submenu" :key="i">
              <template v-slot:activator>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </template>

              <v-list-item
                v-for="(item1, i1) in item.submenu"
                :key="i1 * 100 + 1"
              >
                <v-list-item-title class="ml-5">{{
                  item1.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-item v-else :key="i">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

      <v-divider />
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return { drawerFilter: false, groupDrawer: null };
  },
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
      catalogTypeView: "nomenklator/getCatalogTypeView",
      canUseFilter: "nomenklator/getCanUseFilter",
      filterOpened: "nomenklator/getFilterOpened",
      showLimitWidth: "service/getShowLimitWidth",
      header3: "headerMenu/getHeader3",
    }),
  },
  mounted() {
    // window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
    // $('#sidebar2').stickr({duration:0, offsetTop: 80});
  },
  methods: {
    async switchFilter() {
      if (this.showLimitWidth) {
        this.drawerFilter = true;
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
