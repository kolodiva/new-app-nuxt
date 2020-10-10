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
              <v-card
                class=""
                color="grey lighten-4"
                max-width="300"
                height="100%"
                style="display: flex; flex-direction: column"
              >
                <v-hover v-slot:default="{ hover }">
                  <v-img
                    :src="`${pos.guid_picture}`"
                    contain
                    style="flex-grow: 1"
                  >
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex flex-column transition-fast-in-fast-out orange darken-2 v-card--reveal subtitle-1 white--text"
                        style="height: 100%"
                      >
                        <p>розн. {{ pos.price1 }}</p>
                        <p>мелк опт. {{ pos.price2 }}</p>
                        <p>круп опт. {{ pos.price3 }}</p>
                      </div>
                    </v-expand-transition>
                  </v-img>
                </v-hover>

                <v-card-text
                  class="pt-6"
                  style="position: relative; flex-grow: 4"
                >
                  <v-btn
                    absolute
                    color="orange"
                    class="white--text"
                    fab
                    large
                    right
                    top
                  >
                    <v-icon>mdi-cart</v-icon>
                  </v-btn>
                  <div class="font-weight-light grey--text title mb-2">
                    {{ pos.artikul }}
                  </div>
                  <h3 class="heading-4 font-weight-light orange--text mb-2">
                    {{ pos.name }}
                  </h3>
                </v-card-text>

                <v-card-actions style="flex-grow: 1">
                  <v-btn color="orange lighten-2" text> Описание </v-btn>

                  <v-spacer></v-spacer>

                  <v-btn icon @click.prevent="show = !show">
                    <v-icon>{{
                      show ? "mdi-chevron-up" : "mdi-chevron-down"
                    }}</v-icon>
                  </v-btn>
                </v-card-actions>

                <v-expand-transition>
                  <div v-show="show">
                    <v-divider></v-divider>

                    <v-card-text v-html="pos.describe"> </v-card-text>
                  </div>
                </v-expand-transition>
              </v-card>
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
      show: false,
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
