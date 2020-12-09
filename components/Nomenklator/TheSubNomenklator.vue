<template>
  <v-container fluid>
    <v-row>
      <v-col v-if="!showLimitWidth" style="max-width: 350px">
        <TheGoodsListLeftSideBar :switch-filter="switchFilter" />
      </v-col>

      <v-col class="pt-0">
        <v-sheet min-height="100vh" rounded="lg" class="" height="">
          <v-row v-if="canUseFilter" class="ml-2" style="height: 30px">
            <v-switch
              :loading="_filterOpened ? false : 'blue'"
              dense
              style="margin-top: 0px"
              :input-value="_filterOpened"
              @change="switchFilter"
            >
              <template v-slot:label> <div class="mt-2">Фильтр</div> </template>
            </v-switch>
          </v-row>
          <v-row
            align="start"
            :style="{ 'justify-content': showLimitWidth ? 'center' : 'left' }"
          >
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

                <v-card-text
                  class="text-center pt-2 pb-0"
                  style="max-width: 160px"
                >
                  <span class="textMFGreyColor">{{ pos.name }}</span>
                </v-card-text>
              </v-card>
            </n-link>
          </v-row>
        </v-sheet>
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
    return {
      drawerFilter: false,
      groupDrawer: null,
      filterOpenedLocal: false,
    };
  },
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
      canUseFilter: "nomenklator/getCanUseFilter",
      filterOpened: "nomenklator/getFilterOpened",
      showLimitWidth: "service/getShowLimitWidth",
    }),
    _filterOpened() {
      return this.showLimitWidth ? this.filterOpenedLocal : this.filterOpened;
    },
  },
  watch: {},
  mounted() {
    window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
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
  },
};
</script>
