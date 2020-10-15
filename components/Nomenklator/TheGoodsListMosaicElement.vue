<template>
  <v-card
    flat
    outlined
    class="d-flex flex-column"
    width="300"
    min-height="485"
    style="margin: 3px"
  >
    <n-link
      :to="`${pos.parentguid}/${pos.synonym}`"
      style="text-decoration: none"
    >
      <v-img
        :src="cPic"
        contain
        max-height="298"
        class=""
        style="cursor: pointer"
        @error="onImgErrorLoad"
        ><span class="d-block pa-1 pl-2 caption">{{ pos.artikul_new }}</span>
        <span class="d-block pa-1 pl-2 overlay font-weight-medium mt-n3">{{
          pos.artikul
        }}</span>
      </v-img>
    </n-link>

    <v-divider class="mx-3" />

    <div
      class="flex-grow-1 align-content-start blueMfText overlay font-weight-light pa-3 text-center"
    >
      {{ pos.name }}
    </div>

    <v-card-actions style="">
      <v-btn class="blueMfText" text @click.prevent="show = !show">
        {{ show ? "Мне НЕ нужна информация" : "Мне нужна информация" }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click.prevent="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text v-html="pos.describe"> </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ["pos"],
  data() {
    return {
      show: false,
      errLoadImg: false,
    };
  },
  computed: {
    cPic() {
      return this.errLoadImg
        ? "https://newfurnitura.ru/upload/8126cd02-1094-46d4-a70a-f2e2d5b5_250x250.jpg"
        : this.pos.guid_picture;
    },
  },
  mounted() {},
  methods: {
    async showQuickShopDialog() {
      await this.$store.dispatch("shop/openQuickShopDialog", this.pos);
    },
    onImgErrorLoad() {
      this.errLoadImg = true;
    },
  },
};
</script>

<style></style>
