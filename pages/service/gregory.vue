<template>
  <div>
    <TheVueSlickCarousel />
    <v-container class="my-5" style="max-width: 800px">
      <ThePageHeader descr="რეკლამა არის პროგრესის ძრავა" />
      <v-toolbar dense flat
        ><v-spacer /><v-btn text to="/">Добавить Новый блок</v-btn></v-toolbar
      >

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
          <v-col v-for="(item, $index) in list" :key="$index" class="" cols="3">
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
                <img
                  :src="item.icon"
                  class="d-block mx-auto"
                  style="width: 90px"
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
    </v-container>
  </div>
</template>

<script>
const pageSize = 12;

export default {
  layout: "",

  data() {
    return {
      list: [],
    };
  },

  mounted() {},

  methods: {
    getPathPdf(item) {
      // debugger;
      const res =
        item && item.path_pdf
          ? (item.path_pdf.includes("advs")
              ? "https://newfurnitura.ru/"
              : "https://newfurnitura.ru/news/") + item.path_pdf
          : "/";
      return res;
    },
    async infiniteHandlerAll($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list.length,
      });

      if (rows.length) {
        this.list.push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>

<style scoped></style>
