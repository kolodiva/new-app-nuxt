<template>
  <v-container fluid>
    <v-row>
      <v-col md="2" class="hidden-sm-and-down">
        <TheGoodsListLeftSideBar />
      </v-col>

      <v-col md="10" sm="12" class="pt-0">
        <TheGoodsListMenu />
        <v-sheet rounded="lg" class="mt-4" min-height="100vh">
          <v-row>
            <v-col v-for="(pos, id) in subNomenklator" :key="id" class="pa-3">
              <TheGoodsListMosaicElement :pos="pos" />
            </v-col>
          </v-row>
        </v-sheet>
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
    }),
  },
  mounted() {
    // window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
    // $('#sidebar2').stickr({duration:0, offsetTop: 80});
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
