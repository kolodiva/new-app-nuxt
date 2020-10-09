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

      <v-col md="10" sm="12" class="pt-0">
        <v-toolbar dense flat rounded bordered>
          <v-toolbar-title class="body-2">Сортировать по:</v-toolbar-title>

          <v-toolbar-title class="body-2 font-weight-medium ml-4"
            >по алфавиту</v-toolbar-title
          >
          <v-divider
            vertical
            class="mx-2 my-auto"
            inset
            style="height: 16px"
          ></v-divider>
          <v-toolbar-title class="body-2">популярности</v-toolbar-title>
          <v-divider
            vertical
            class="mx-2 my-auto"
            inset
            style="height: 16px"
          ></v-divider>
          <v-toolbar-title class="body-2">цене</v-toolbar-title>
          <v-divider
            vertical
            class="mx-2 my-auto"
            inset
            style="height: 16px"
          ></v-divider>
          <v-toolbar-title class="body-2">новизне</v-toolbar-title>
          <v-divider
            vertical
            class="mx-2 my-auto"
            inset
            style="height: 16px"
          ></v-divider>
          <v-toolbar-title class="body-2">скидке</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-toolbar-title class="body-2">Показать по:</v-toolbar-title>

          <v-toolbar-title class="body-2 font-weight-medium ml-4"
            >30</v-toolbar-title
          >
          <v-divider
            vertical
            class="mx-2 my-auto"
            inset
            style="height: 16px"
          ></v-divider>
          <v-toolbar-title class="body-2">60</v-toolbar-title>
          <v-divider
            vertical
            class="mx-2 my-auto"
            inset
            style="height: 16px"
          ></v-divider>
          <v-toolbar-title class="body-2">90</v-toolbar-title>
          <v-divider
            vertical
            class="mx-2 my-auto"
            inset
            style="height: 16px"
          ></v-divider>

          <v-spacer></v-spacer>

          <v-toolbar-title class="body-2">Вид каталога:</v-toolbar-title>

          <v-toolbar-title class="body-2 ml-4"
            ><v-icon color="black">mdi-apps </v-icon></v-toolbar-title
          >
          <v-toolbar-title class="body-2 ml-4"
            ><v-icon>mdi-format-list-checkbox </v-icon></v-toolbar-title
          >
          <v-toolbar-title class="body-2 ml-4"
            ><v-icon>mdi-view-headline</v-icon></v-toolbar-title
          >
        </v-toolbar>

        <v-sheet rounded="lg" class="mt-4" min-height="100vh">
          <v-row align="start" justify="center">
            <n-link
              v-for="(pos, id) in subNomenklator"
              :key="id"
              :to="`${pos.guid}`"
              style="text-decoration: none"
            >
              <v-card class="ma-1" color="grey lighten-4" max-width="300">
                <v-hover v-slot:default="{ hover }">
                  <v-img :src="`${pos.guid_picture}`" contain>
                    <v-expand-transition>
                      <div
                        v-if="hover"
                        class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
                        style="height: 100%"
                      >
                        {{ pos.price1 }}
                      </div>
                    </v-expand-transition>
                  </v-img>
                </v-hover>
                <v-card-text class="pt-6" style="position: relative">
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
                  <h3 class="display-1 font-weight-light orange--text mb-2">
                    {{ pos.name }}
                  </h3>
                </v-card-text>

                <v-card-actions>
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
      show: false,
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
