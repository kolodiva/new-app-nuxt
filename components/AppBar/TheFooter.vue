<template>
  <v-footer padless class="blueMfBckg mt-15" dark>
    <v-row class="" style="min-height: 250px; margin-bottom: 66px">
      <v-col class="pl-5">
        <v-row style="flex-direction: column; height: 75vh">
          <v-col>
            <TheSocials
              :params="{
                url: 'https://www.newfurnitura.ru/',
                title: 'МФ-Комплект. Мебельная фурнитура',
                description: '5000 наименований на любой вкус.',
              }"
            />
          </v-col>
          <v-col>
            <a
              href="https://webmaster.yandex.ru/siteinfo/?site=https://www.newfurnitura.ru"
            >
              <img
                width="88"
                height="31"
                alt=""
                border="0"
                src="https://yandex.ru/cycounter?https://www.newfurnitura.ru&theme=light&lang=ru"
              />
            </a>
          </v-col>
        </v-row>
      </v-col>
      <v-divider vertical class=""></v-divider>
      <v-col> </v-col>
      <v-divider vertical class=""></v-divider>
      <v-col>
        <v-list subheader class="blueMfBckg">
          <v-subheader>Наши офисы</v-subheader>
          <template v-for="(link, id) in filials">
            <v-list-item :key="(id + 1) * 10" @click="openContact(link)">
              <v-list-item-content>
                <v-list-item-title v-html="link.city"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="link.phone"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-html="link.email"
                ></v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-content>
                <p class="text-right">
                  <iframe
                    :src="link.yandexFrame"
                    width="150"
                    height="50"
                    frameborder="0"
                  >
                    <a :ref="link.yandexStars" />
                  </iframe>
                </p>
              </v-list-item-content>
            </v-list-item>

            <v-divider :key="(id + 1) * 100"></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>
    <v-col class="white pa-1" cols="12" justify="left">
      <span class="textMFGreyColor"
        >&copy; MF KOMPLEKT 2003-{{ new Date().getFullYear() }}</span
      >
    </v-col>

    <v-overlay :value="showContact">
      <v-container class="">
        <v-card light>
          <v-card-actions
            ><v-spacer /><v-btn text @click="closeContact()"
              >Закрыть</v-btn
            ></v-card-actions
          >
          <v-expansion-panels v-model="panel" focusable multiple light>
            <v-expansion-panel v-for="(item, i) in filialsFilter" :key="i">
              <v-expansion-panel-header class="title">
                {{ `${item.city}  ${item.phone}` }} <br />{{ `${item.email}` }}

                <v-spacer />
                <span class="text-right pr-3">
                  {{ `${item.timetable[0][0]}  ${item.timetable[0][1]}` }}
                  <br />
                  <span class="red--text subtitle-1">
                    {{
                      `${item.timetable[1][0]} ${item.timetable[1][1]}`
                    }}</span
                  ></span
                >
              </v-expansion-panel-header>
              <v-expansion-panel-content
                style="max-height: 70vh; overflow-y: auto"
              >
                <v-card flat class="mt-4">
                  <template v-if="item.departments.length === 0">
                    <v-row>
                      <v-col cols="">
                        <div
                          class="title py-2 px-3 d-inline-block"
                          style="
                            border: 1px solid rgb(88, 89, 90);
                            font-weight: bold;
                          "
                        >
                          {{ `${item.name}` }}
                        </div>
                        <br />
                        <div class="mt-2">{{ `${item.address}` }}</div>

                        <v-simple-table
                          fixed-header
                          height="390px"
                          class="mt-2"
                        >
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">ФИО</th>
                                <th class="text-left">Телефоны</th>
                                <th class="text-left">Email/Skype</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="item2 in managers[i].descr[0].managers"
                                :key="item2.tel_add"
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
                                  <span class="" v-html="item2.tel_mob"></span>
                                </td>
                                <td>
                                  <span class="" v-html="item2.email"></span
                                  ><br />
                                  <span class="" v-html="item2.skype"> </span>
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
                        <div
                          :id="`YMapsID_${item.id}`"
                          style="min-width: 400px; min-height: 400px"
                        ></div>
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
                          style="
                            border: 1px solid rgb(88, 89, 90);
                            font-weight: bold;
                          "
                        >
                          {{ `${item1.name}` }}
                        </div>
                        <br />
                        <div class="mt-4">{{ `${item1.address}` }}</div>

                        <v-simple-table
                          fixed-header
                          height="390px"
                          class="mt-2"
                        >
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-left">ФИО</th>
                                <th class="text-left">Телефоны</th>
                                <th class="text-left">Email/Skype</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="item2 in managers[0].descr[j].managers"
                                :key="item2.tel_add"
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
                                  <span class="" v-html="item2.tel_mob"></span>
                                </td>
                                <td>
                                  <span class="" v-html="item2.email"></span
                                  ><br />
                                  <span class="" v-html="item2.skype"> </span>
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
                        <div
                          :id="`YMapsID_${i}_${j}`"
                          style="min-width: 400px; min-height: 400px"
                        ></div>
                      </v-col>
                    </v-row>
                  </template>
                </v-card>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-container>
    </v-overlay>
  </v-footer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      showContact: false,
      regionInfo: null,
      managers: [],
      panel: [0],
    };
  },
  computed: {
    ...mapGetters({
      filials: "headerMenu/getAllSortCity",
      showLimitWidth: "service/getShowLimitWidth",
    }),
    filialsFilter() {
      return (
        (this.filials &&
          this.regionInfo &&
          this.filials.filter((item) => item.id === this.regionInfo.id)) ||
        []
      );
    },
  },

  methods: {
    async openContact(item) {
      const rows = await this.$api("getManagers", { id: item.id });
      // console.log(rows);
      this.managers = { ...rows };
      this.regionInfo = { ...item };

      // const curFilial = this.filialsFilter[0];

      const mscFilial = item.id === 1;

      let idpaths = [];

      if (mscFilial) {
        idpaths = ["YMapsID_0_0", "YMapsID_0_1", "YMapsID_0_2"];
      } else {
        idpaths = ["YMapsID_" + item.id];
      }
      // debugger;
      this.regionInfo.idpaths = idpaths;

      this.showContact = !this.showContact;

      // console.log(idpaths);
      this.$nextTick(() => {
        // fill map
        let myMap = null;

        let srcData = null;
        // debugger;
        window.ymaps.ready(() => {
          idpaths.forEach((item, i) => {
            srcData =
              this.filialsFilter[0].departments.length === 0
                ? this.filialsFilter[0]
                : this.filialsFilter[0].departments[i];
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
      });
    },
    closeContact() {
      const mscFilial = this.regionInfo.id === 1;

      let idpaths = [];

      if (mscFilial) {
        idpaths = ["#YMapsID_0_0", "#YMapsID_0_1", "#YMapsID_0_2"];
      } else {
        idpaths = ["#YMapsID_" + (this.regionInfo.id - 1)];
      }

      idpaths.forEach((item) => {
        window.$(item).empty();
      });

      this.showContact = false;
    },
  },
};
</script>

<style scoped></style>
