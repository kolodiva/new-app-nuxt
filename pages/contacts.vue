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
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
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

      const idpath = "YMapsID_" + val[v];

      // debugger;
      for (let i = 0; i < 7; i++) {
        window.$("#YMapsID_" + i).empty();
      }

      if (v === 0) {
        // fill map
        const curFilial = this.filials[val[v]];
        const myMap = new window.ymaps.Map(
          idpath,
          {
            center: [curFilial.coordinates[0], curFilial.coordinates[1]],
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
              coordinates: [curFilial.coordinates[0], curFilial.coordinates[1]],
            },

            // Свойства.Контент метки.
            properties: { iconContent: curFilial.coordinates[2] },
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
