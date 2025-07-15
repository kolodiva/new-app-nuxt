<template>
  <div style="margin-top: 45px">
    <TheVueSlickCarousel />
    <v-container class="my-5" style="max-width: 800px">
      <ThePageHeader descr="Архив Новостей" />
      <v-toolbar dense flat
        ><v-spacer /><v-btn text to="/">На главную</v-btn></v-toolbar
      >

      <v-tabs color="blue darken-3" show-arrows light>
        <v-tabs-slider color="blue lighten-3" light></v-tabs-slider>
        <v-tab>Новости со всех сторон</v-tab>

        <v-tab v-for="(link, id) in filials" :key="id">{{ link.city }}</v-tab>

        <v-tab-item key="tab">
          <v-container
            fluid
            style="
              max-width: 70vw;
              max-height: 70vh;
              min-height: 70vh;
              overflow-y: scroll;
              overflow-x: hidden;
            "
          >
            <v-row align="start" justify="space-around">
              <v-col
                v-for="(item, $index) in list[0]"
                :key="$index"
                class=""
                cols="3"
              >
                <!-- <v-card-subtitle> {{ item.id }} {{ item.header }} </v-card-subtitle> -->
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    max-width="140"
                    :class="`${
                      hover ? 'grey lighten-2' : 'grey lighten-3'
                    } pt-4 mx-auto`"
                    style="position: pointer"
                    :href="getPathPdf(item)"
                    target="_blank"
                  >
                    <v-img
                      :src="item.icon"
                      aspect-ratio="1"
                      :lazy-src="`https://picsum.photos/10/6?image=152`"
                      width="90"
                      class="mx-auto"
                    />
                    <v-divider class="my-3 mx-3" />
                    <v-card-subtitle class="caption text-center pa-1 pt-0 pb-2">
                      {{ item.header }}
                    </v-card-subtitle>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>

            <infinite-loading @infinite="infiniteHandlerAll"></infinite-loading>
          </v-container>
        </v-tab-item>

        <v-tab-item v-for="(link, id) in filials" :key="`tab${id}`">
          <v-container
            fluid
            style="
              max-width: 70vw;
              max-height: 70vh;
              min-height: 70vh;
              overflow-y: scroll;
              overflow-x: hidden;
            "
          >
            <v-row align="start" justify="space-around">
              <v-col
                v-for="(item, $index) in list[id + 1]"
                :key="$index"
                class=""
                cols="3"
              >
                <!-- <v-card-subtitle> {{ item.id }} {{ item.header }} </v-card-subtitle> -->
                <v-hover v-slot:default="{ hover }">
                  <v-card
                    max-width="140"
                    :class="`${
                      hover ? 'grey lighten-2' : 'grey lighten-3'
                    } pt-4 mx-auto`"
                    style="position: pointer"
                    :href="getPathPdf(item)"
                    target="_blank"
                  >
                    <v-img
                      :src="item.icon"
                      aspect-ratio="1"
                      :lazy-src="`https://picsum.photos/10/6?image=152`"
                      width="90"
                      class="mx-auto"
                    />
                    <v-divider class="my-3 mx-3" />
                    <v-card-subtitle class="caption text-center pa-1 pt-0 pb-2">
                      {{ item.header }}
                    </v-card-subtitle>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>

            <infinite-loading @infinite="infHandler[id]"></infinite-loading>
          </v-container>
        </v-tab-item>
      </v-tabs>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

const pageSize = 12;

export default {
  data() {
    return {
      list: [[], [], [], [], [], [], [], []],
      infHandler: [
        this.infiniteHandler1,
        this.infiniteHandler2,
        this.infiniteHandler3,
        this.infiniteHandler4,
        this.infiniteHandler5,
        this.infiniteHandler6,
        this.infiniteHandler7,
      ],
    };
  },
  computed: {
    ...mapGetters({
      filials: "headerMenu/getAllSortCity",
    }),
  },
  mounted() {},

  methods: {
    getPathPdf(item) {
      // debugger;
      let res = "/";

      if (item && item.path_pdf) {
        if (item.path_pdf.includes("http")) {
          res = item.path_pdf;
        } else if (
          item.path_pdf.includes("catalog") ||
          item.path_pdf.includes("service") ||
          item.path_pdf.includes("advs")
        ) {
          res = "https://newfurnitura.ru/" + item.path_pdf;
        } else {
          res = "https://newfurnitura.ru/news/" + item.path_pdf;
        }
      }

      return res;
    },
    async infiniteHandlerAll($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list[0].length,
      });

      if (rows.length) {
        this.list[0].push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async infiniteHandler1($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list.length[1],
        curFilial: 1,
      });

      if (rows.length) {
        this.list[1].push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async infiniteHandler2($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list.length[2],
        curFilial: 2,
      });

      if (rows.length) {
        this.list[2].push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async infiniteHandler3($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list[3].length,
        curFilial: 3,
      });

      if (rows.length) {
        this.list[3].push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async infiniteHandler4($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list[4].length,
        curFilial: 4,
      });

      if (rows.length) {
        this.list[4].push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async infiniteHandler5($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list[5].length,
        curFilial: 5,
      });

      if (rows.length) {
        this.list[5].push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async infiniteHandler6($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list[6].length,
        curFilial: 6,
      });

      if (rows.length) {
        this.list[6].push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
    async infiniteHandler7($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list[7].length,
        curFilial: 7,
      });

      if (rows.length) {
        this.list[7].push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>

<style scoped></style>
