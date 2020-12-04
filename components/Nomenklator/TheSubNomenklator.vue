<template>
  <v-container fluid>
    <v-row>
      <v-col md="2" class="hidden-sm-and-down mb-2">
        <v-expansion-panels
          v-if="switchFilter"
          v-model="openPanel2"
          focusable
          multiple
          class="mt-4"
        >
          <v-expansion-panel>
            <v-expansion-panel-header>
              Отбор по параметрам
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-list rounded dense>
                <div v-for="(item, i) in groupFilter" :key="i">
                  <v-list-group
                    v-if="item.arrayprop.length > 1"
                    color="primary"
                  >
                    <template v-slot:activator>
                      <v-list-item-title>{{ item.property }}</v-list-item-title>
                    </template>

                    <v-list-item
                      v-for="(item2, i2) in item.arrayprop"
                      :key="i2"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-title
                          class="ml-4"
                          v-text="item2"
                        ></v-list-item-title>

                        <v-list-item-action>
                          <v-checkbox :input-value="active"></v-checkbox>
                        </v-list-item-action>
                      </template>
                    </v-list-item>
                  </v-list-group>
                </div>
              </v-list>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <TheGoodsListLeftSideBar />
      </v-col>

      <v-col md="8" sm="12" class="pt-0">
        <v-sheet min-height="" rounded="lg" class="" height="100vh">
          <v-row v-if="canUseFilter">
            <v-switch
              v-model="switchFilter"
              style="margin-left: 75px; margin-top: 0px"
            >
              <template v-slot:label> <div class="mt-2">Фильтр</div> </template>
            </v-switch>
          </v-row>
          <v-row align="start" justify="center">
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
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      openPanel1: [0],
      openPanel2: [0],
      switchFilter: false,
      groupFilter: [],
    };
  },
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
      canUseFilter: "nomenklator/getCanUseFilter",
    }),
  },
  watch: {
    async switchFilter(v) {
      if (
        v === true &&
        this.groupFilter.length === 0 &&
        this.subNomenklator[0]
      ) {
        const { rows } = await this.$api("getGroupFilter", {
          parentguid: this.subNomenklator[0].parentguid,
        });

        this.groupFilter.push(...rows);

        //  console.log(this.groupFilter);
      }
    },
  },
  mounted() {
    window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
    // $('#sidebar2').stickr({duration:0, offsetTop: 80});
  },
};
</script>
