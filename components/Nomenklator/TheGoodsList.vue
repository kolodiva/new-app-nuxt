<template>
  <v-container fluid>
    <v-row>
      <v-col md="3" lg="2" class="hidden-sm-and-down" style="">
        <TheGoodsListLeftSideBar />
      </v-col>

      <v-col md="9" lg="10" class="pt-0">
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
              :key="id"
              :pos="pos"
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
              :key="id"
              :pos="pos"
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
    return {
      openPanel1: [0],
      openPanel2: [0],
    };
  },
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
      catalogTypeView: "nomenklator/getCatalogTypeView",
    }),
  },
  mounted() {
    // window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
    // $('#sidebar2').stickr({duration:0, offsetTop: 80});
  },
  methods: {
    async chngorder(id) {
      await this.$store.dispatch("nomenklator/chngeCart", id);
      // console.log(pos.qty2, id);
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
