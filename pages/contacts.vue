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
          <v-card flat class="mt-3">
            <template v-if="item.departments.length === 0">
              <v-row>
                <v-col cols="">
                  <div
                    class="title py-2 px-3 d-inline-block"
                    style="border: 1px solid rgb(88, 89, 90); font-weight: bold"
                  >
                    {{ `${item.name}` }}
                  </div>
                  <br />
                  <div class="mt-2">{{ `${item.address}` }}</div>

                  <v-simple-table fixed-header height="390px" class="mt-2">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">ФИО</th>
                          <th class="text-left">Телефоны</th>
                          <th class="text-left">Email/Skype</th>
                          <th class="text-left">Регионы</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item2, z) in managers[i].descr[0].managers"
                          :key="z"
                        >
                          <td class="py-2">
                            <span
                              class="font-weight-medium"
                              v-html="item2.manager"
                            ></span>
                            <span
                              class="text-lowercase body-2"
                              v-html="item2.position"
                            ></span>
                          </td>
                          <td style="min-width: 160px">
                            <span
                              class=""
                              v-html="'доб: ' + item2.tel_add"
                            ></span
                            ><br />

                            <div v-if="item2.tel_mob != ''">
                              <span class="" v-html="item2.tel_mob"></span>

                              <a
                                v-if="item2.whatsapp"
                                :href="
                                  'https://wa.me/' +
                                  item2.tel_mob.replace(/[^0-9||+]/g, '')
                                "
                                target="_blank"
                                title="Напишите нам в онлайн чат"
                              >
                                <img
                                  class="socialIcon fab"
                                  src="/icons8-whatsapp-48.png"
                                  style="width: 28px; height: 28px"
                                />
                              </a>



                            </div>
                          </td>
                          <td>
                            <span class="" v-html="item2.email"></span><br />
                            <span class="" v-html="item2.skype"> </span>
                          </td>

                          <td>
                            <v-btn class="" x-small @click="openRegion(item2)"
                              >Регионы</v-btn
                            >
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
                <v-col
                  :cols="showLimitWidth ? 12 : 5"
                  style="position: relative"
                >
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
                    class="title py-2 px-3 d-inline-block"
                    style="border: 1px solid rgb(88, 89, 90); font-weight: bold"
                  >
                    {{ `${item1.name}` }}
                  </div>
                  <br />
                  <div class="mt-4">{{ `${item1.address}` }}</div>

                  <v-simple-table fixed-header height="390px" class="mt-2">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <th class="text-left">ФИО</th>
                          <th class="text-left">Телефоны</th>
                          <th class="text-left">Email/Skype</th>
                          <th class="text-left">Регионы</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(item2, z) in managers[0].descr[j].managers"
                          :key="z"
                        >
                          <td class="py-2">
                            <span
                              class="font-weight-medium"
                              v-html="item2.manager"
                            ></span>
                            <span
                              class="text-lowercase body-2"
                              v-html="item2.position"
                            ></span>
                          </td>
                          <td style="min-width: 160px">
                            <span
                              class=""
                              v-html="'доб: ' + item2.tel_add"
                            ></span
                            ><br />

                            <div v-if="item2.tel_mob != ''">
                              <span class="" v-html="item2.tel_mob"></span>

                              <a
                                v-if="item2.whatsapp"
                                :href="
                                  'https://wa.me/' +
                                  item2.tel_mob.replace(/[^0-9||+]/g, '')
                                "
                                target="_blank"
                                title="Напишите нам в онлайн чат"
                              >
                                <img
                                  class="socialIcon fab"
                                  src="/icons8-whatsapp-48.png"
                                  style="width: 28px; height: 28px"
                                />
                              </a>
                            </div>
                          </td>
                          <td>
                            <span class="" v-html="item2.email"></span><br />
                            <span class="" v-html="item2.skype"> </span>
                          </td>
                          <td>
                            <v-btn class="" x-small @click="openRegion(item2)"
                              >Регионы</v-btn
                            >
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
                <v-col
                  :cols="showLimitWidth ? 12 : 5"
                  style="position: relative"
                >
                  <div :id="`YMapsID_${i}_${j}`" style="height: 50vh"></div>
                </v-col>
              </v-row>
            </template>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-overlay :value="showRegion">
      <v-card light width="300">
        <v-card-subtitle>{{
          regionInfo && regionInfo.manager
        }}</v-card-subtitle>
        <v-divider />
        <v-card-text
          style="max-height: 70vh; overflow-y: auto"
          v-html="regionInfo && regionInfo.regions"
        >
        </v-card-text>
        <v-divider />
        <v-card-actions>
          <v-spacer />
          <v-btn text class="" small @click="showRegion = false">Закрыть</v-btn>
        </v-card-actions>
      </v-card>
    </v-overlay>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  async fetch() {
    const rows = await this.$api("getManagers");

    this.managers = { ...rows };
  },
  data() {
    return {
      panel: null,
      managers: [],
      showRegion: false,
      regionInfo: null,
    };
  },

  computed: {
    ...mapGetters({
      filials: "headerMenu/getAllSortCity",
      showLimitWidth: "service/getShowLimitWidth",
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

      let myMap = null;

      let srcData = null;

      // console.log(idpaths);
      window.ymaps.ready(() => {
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
      });
    },
  },
  mounted() {},
  methods: {
    openRegion(item) {
      this.regionInfo = {
        manager: item.manager.replaceAll("<br/>", " "),
        regions: item.region,
      };
      this.showRegion = !this.showRegion;
    },

    downloadResource(path) {
      window.open(path);
    },
  },
  head: {},
};
</script>

<style lang="scss" scoped>
.socialIcon {
  position: relative;
  display: inline-block;
  text-align: center;
}
</style>
