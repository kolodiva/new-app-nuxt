<template>
  <v-container fluid>
    <v-row>
      <v-col md="2" class="hidden-sm-and-down">
        <div id="sidebar1">
          <div>
            <v-expansion-panels v-model="openPanel1" focusable multiple>
              <v-expansion-panel v-for="(item, i) in 1" :key="i">
                <v-expansion-panel-header>
                  Разделы каталога
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
            <v-expansion-panels
              v-model="openPanel2"
              focusable
              multiple
              class="mt-4"
            >
              <v-expansion-panel v-for="(item, i) in 1" :key="i">
                <v-expansion-panel-header>
                  Отбор по параметрам
                </v-expansion-panel-header>
                <v-expansion-panel-content>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </v-col>

      <v-col md="8" sm="12" class="pt-0">
        <v-sheet min-height="" rounded="lg" class="" height="100vh">
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
    };
  },
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
    }),
  },
  mounted() {
    window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
    // $('#sidebar2').stickr({duration:0, offsetTop: 80});
  },
};
</script>
