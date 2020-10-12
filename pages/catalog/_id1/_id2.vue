<template>
  <v-app>
    <div>
      <v-row style="height: 200px" align="center"
        ><v-col
          ><h2
            style="text-align: center"
            @click="$vuetify.goTo('#dashboard_100')"
          >
            Заголовок
          </h2></v-col
        ></v-row
      >
      <v-row style=""
        ><v-col class="leftColumn" cols="3" style="border: 1px solid black">
          <div
            id="sidebar1"
            style="
              transform: translate(0, 0);
              transform: translate3d(0, 0, 0);
              will-change: position, transform;
            "
          >
            <h2 style="text-align: center">Левый блок</h2>
            <p style="cursor: pointer" @click="$vuetify.goTo('#dashboard_149')">
              Перейти в конец
            </p>
            <p style="cursor: pointer" @click="$vuetify.goTo('#dashboard_75')">
              Перейти в середину
            </p>
            <p style="cursor: pointer" @click="$vuetify.goTo('#dashboard_0')">
              Перейти в начало
            </p>
            <h2 style="text-align: center">Этапы прохождения</h2>
            <p
              style="cursor: pointer"
              :style="{ fontWeight: pos50 ? 'bold' : '400' }"
            >
              Пройдено 50
            </p>
            <p
              style="cursor: pointer"
              :style="{ fontWeight: pos100 ? 'bold' : '400' }"
            >
              Пройдено 100
            </p>
            <p
              style="cursor: pointer"
              :style="{ fontWeight: pos150 ? 'bold' : '400' }"
            >
              Пройдено 150
            </p>
          </div>
        </v-col>
        <v-col cols="6" style="border: 1px solid black" class="menuHeader3"
          ><v-card
            id="dashboard_0"
            v-intersect="{
              handler: onIntersect,
              options: {
                threshold: [0, 0.5, 1.0],
              },
            }"
            style="height: 50vh"
            ><v-card-text>Центр_1</v-card-text></v-card
          >

          <v-card
            id="dashboard_75"
            v-intersect="{
              handler: onIntersect,
              options: {
                threshold: [0, 0.5, 1.0],
              },
            }"
            style="height: 50vh"
            ><v-card-text>Центр_50</v-card-text></v-card
          >

          <v-card
            id="dashboard_149"
            v-intersect="{
              handler: onIntersect,
              options: {
                threshold: [0, 0.5, 1.0],
              },
            }"
            style="height: 50vh"
            ><v-card-text>Центр_100</v-card-text></v-card
          >

          <v-card
            id="dashboard_100"
            v-intersect="{
              handler: onIntersect,
              options: {
                threshold: [0, 0.5, 1.0],
              },
            }"
            style="height: 50vh"
            ><v-card-text>Центр_149</v-card-text></v-card
          >
        </v-col>
        <v-col
          id="sidebar2"
          cols="3"
          style="border: 1px solid black; height: 50vh"
          class="rightColumn"
        >
          <div
            id="sidebar2"
            style="
              transform: translate(0, 0);
              transform: translate3d(0, 0, 0);
              will-change: position, transform;
            "
          >
            <h2 style="text-align: center">Правый блок</h2>
            <p style="cursor: pointer" @click="$vuetify.goTo('#dashboard_149')">
              Перейти в конец
            </p>
            <p style="cursor: pointer" @click="$vuetify.goTo('#dashboard_75')">
              Перейти в середину
            </p>
            <p style="cursor: pointer" @click="$vuetify.goTo('#dashboard_0')">
              Перейти в начало
            </p>
          </div>
        </v-col>
      </v-row>

      <v-footer style="height: 100vh">Footer</v-footer>
    </div>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async fetch({ app, params, query, store }) {
    if (params && params.id) {
      await store.dispatch("nomenklator/loadGoodCard", params);
    }
  },
  data: () => ({
    posSwitchLeftRightPanel: 0,
    pos50: false,
    pos100: false,
    pos150: false,
  }),
  computed: {
    ...mapGetters({
      dataGoodCard: "nomenklator/getGoodCard",
    }),
  },
  mounted() {
    window.$("#sidebar1").stickr({ duration: 0, offsetTop: 50 });
    window.$("#sidebar2").stickr({ offsetTop: 50 });
  },
  methods: {
    onIntersect(entries, observer) {
      // More information about these options
      // is located here: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
      // this.isIntersecting = entries[0].intersectionRatio >= 0.5
      if (entries[0].target.textContent === "Центр_50") {
        this.pos50 = entries[0].intersectionRatio >= 0.5;
      }
      if (entries[0].target.textContent === "Центр_100") {
        this.pos100 = entries[0].intersectionRatio >= 1;
      }
      if (entries[0].target.textContent === "Центр_149") {
        this.pos150 = entries[0].intersectionRatio >= 1;
      }
      // consola.info(entries[0].target.innerText, entries[0].intersectionRatio)
    },
  },
};
</script>

<style lang="" scoped></style>
