<template>
  <v-dialog
    v-model="openDialog"
    class=""
    fullscreen
    hide-overlay
    transition="fade-transition"
    @keydown="closeDialog"
  >
    <v-card flat tile style="height: 100vh" class="d-flex flex-column">
      <v-app-bar flat color="" class="flex-grow-0">
        <v-toolbar-title class="headline">
          {{ photos[0].name }}, {{ photos[0].artikul }},
          {{ photos[0].artikul_new }}
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn color="" icon @click="closeDialog">
          <v-icon color="grey" class="display-1">mdi-close</v-icon>
        </v-btn>
      </v-app-bar>

      <v-tabs-items
        v-model="fotoIndex"
        show-arrows
        class="flex-grow-1"
        nect-icon="mdi-chevron-right"
      >
        <v-tab-item v-for="(photo, i) in photos" :key="i">
          <v-img
            :src="`${photo.pic_path.replace('_250x250', '')}`"
            contain
            class="mx-auto"
            min-height="40vh"
            max-height="65vh"
          >
          </v-img> </v-tab-item
      ></v-tabs-items>
      <v-divider />

      <v-card-actions>
        <v-tabs v-model="fotoIndex" centered height="120">
          <v-tab
            v-for="(photo, i) in photos"
            :key="i"
            style="height: 100px; width: 120px"
          >
            <v-img :src="`${photo.pic_path}`" contain max-width="120" />
          </v-tab>
        </v-tabs>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["closeWin", "openDialog", "photos", "fotoIndex"],
  data() {
    return {
      cur_tab_photos: 0,
      tab: null,
    };
  },
  computed: {},
  mounted() {
    // console.log(this.paramsQuickShopDialog);
  },
  methods: {
    closeDialog() {
      this.$emit("closeWin");
    },
  },
};
</script>

<style></style>
