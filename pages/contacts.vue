<template>
  <v-container class="" style="min-height: 80vh">
    <div class="headline py-2">Контакты компании МФ-Комплект по филиалам</div>
    <v-expansion-panels v-model="panel" focusable>
      <v-expansion-panel v-for="(item, i) in filials" :key="i">
        <v-expansion-panel-header class="title">
          {{ `${item.city}  ${item.phone}` }} <br />{{ `${item.email}` }}

          <v-spacer />
          <span class="text-right pr-3">
            {{ `${item.timetable[0][0]}  ${item.timetable[0][1]}` }}
            <br />
            <span class="red--text subtitle-1">
              {{ `${item.timetable[1][0]} ${item.timetable[1][1]}` }}</span
            ></span
          >
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-divider />
          <v-card flat>
            <template v-if="item.departments.length === 0">
              <v-row>
                <v-col cols="">
                  <div
                    class="title pa-1 d-inline-block"
                    style="border: 1px solid rgb(88, 89, 90); font-weight: bold"
                  >
                    {{ `${item.name}` }}
                  </div>
                  <br />
                  <div class="mt-2">{{ `${item.address}` }}</div>
                </v-col>
                <v-col cols="5" style="position: relative">
                  <div :id="`YMapsID_${i}`" style="height: 50vh"></div>
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-row
                v-for="(item1, j) in item.departments"
                :key="i + j"
                class="mb-2"
              >
                <v-col cols="">
                  <div
                    class="title pa-1 d-inline-block"
                    style="border: 1px solid rgb(88, 89, 90); font-weight: bold"
                  >
                    {{ `${item1.name}` }}
                  </div>
                  <br />
                  <div class="mt-2">{{ `${item1.address}` }}</div>
                </v-col>
                <v-col cols="5" style="position: relative">
                  <div :id="`YMapsID_${i}_${j}`" style="height: 50vh"></div>
                </v-col>
              </v-row>
            </template>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async fetch({ app, params, query, store }) {
    // const { rows } = await this.$api("getGroupFilter");
  },

  data() {
    return { panel: null };
  },
  computed: {
    ...mapGetters({
      filials: "headerMenu/getAllSortCity",
    }),
  },
  watch: {
    panel(v1, v2) {
      const val = [v1, v2];

      const v = v1 || v1 >= 0 ? 0 : 1;

      // debugger;
      for (let i = 0; i < 7; i++) {
        if (i === 0) {
          for (let j = 0; j < 3; j++) {
            window.$("#YMapsID_" + i + "_" + j).empty();
          }
        } else {
          window.$("#YMapsID_" + i).empty();
        }
      }

      const curFilial = this.filials[val[v]];

      const mscFilial = val[v] === 0;

      let idpaths = [];

      if (mscFilial) {
        idpaths = ["YMapsID_0_0", "YMapsID_0_1", "YMapsID_0_2"];
      } else {
        idpaths = ["YMapsID_" + val[v]];
      }

      if (v === 0) {
        // fill map
        let myMap = null;

        let srcData = null;

        idpaths.forEach((item, i) => {
          srcData =
            curFilial.departments.length === 0
              ? curFilial
              : curFilial.departments[i];
          myMap = new window.ymaps.Map(
            item,
            {
              center: [srcData.coordinates[0], srcData.coordinates[1]],
              zoom: 10,
            },

            { searchControlProvider: "yandex#search" }
          );

          myMap.controls.remove("fullscreenControl");

          const myGeoObject = new window.ymaps.GeoObject(
            {
              // Описание геометрии.
              geometry: {
                type: "Point",
                coordinates: [srcData.coordinates[0], srcData.coordinates[1]],
              },

              // Свойства.Контент метки.
              properties: {
                iconContent: srcData.coordinates[2],
              },
            },

            {
              // Опции. Иконка метки будет растягиваться под размер ее содержимого.

              preset: "islands#blackStretchyIcon",
              // Метку можно перемещать.
              draggable: false,
            }
          );

          //
          myMap.geoObjects.add(myGeoObject);
        });
      }
    },
  },
  mounted() {},
  methods: {
    downloadResource(path) {
      window.open(path);
    },
  },
  head: {},
};
</script>

<style scoped></style>
