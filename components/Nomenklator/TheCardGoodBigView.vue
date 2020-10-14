<template>
  <v-dialog
    v-model="openDialog"
    max-width="80vw"
    @click:outside="closeDialog"
    @keydown="closeDialog"
  >
    <v-card flat>
      <v-app-bar flat color="rgba(0, 0, 0, 0)">
        <v-toolbar-title class="headline"> {{ photos.name }} </v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn color="transparent" icon @click="closeDialog">
          <v-icon color="grey">mdi-arrow-collapse-down</v-icon>
        </v-btn>
      </v-app-bar>

      <v-img
        :src="`${photos.pic_path.replace('_250x250', '')}`"
        contain
        width="500"
      />

      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="closeDialog">
          Больше не видеть...
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["openDialog", "photos"],
  data() {
    return {};
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
