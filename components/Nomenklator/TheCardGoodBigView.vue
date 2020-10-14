<template>
  <v-dialog
    v-model="openDialog"
    max-width="80vw"
    @click:outside="closeDialog"
    @keydown="closeDialog"
  >
    <v-card>
      <v-card-title class="headline"> Тэсто амадесто </v-card-title>

      <v-img :src="`${photos.pic_path.replace('_250x250', '')}`" width="600" />

      <v-card-text>
        Здесь вы можете Хорошо подумать и принять самое ответственное решение в
        своей жизни - купить ЭТО или оставить на потом когда Цены подрастут?
      </v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" text @click="closeDialog">
          спасибо, не надо...
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="closeDialog">
          в корзину
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
