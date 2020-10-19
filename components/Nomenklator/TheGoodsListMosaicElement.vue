<template>
  <v-card
    flat
    outlined
    class="d-flex flex-column"
    width="300"
    min-height="484"
    style="margin: 3px"
  >
    <div class="flex-grow-0 pa-1 pl-2">
      <span class="d-block caption">{{ pos.artikul_new }}</span>
      <span class="d-block overlay font-weight-medium mt-n1">{{
        pos.artikul
      }}</span>
    </div>

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
      >
      </v-img>
    </n-link>

    <v-divider class="mx-3" />

    <div
      class="flex-grow-0 blueMfText overlay font-weight-light pa-3 text-center"
    >
      {{ pos.name }}
    </div>

    <div class="flex-grow-1"></div>

    <v-text-field
      rounded
      filled
      type="number"
      class="mt-0 centered-input mx-auto flex-grow-0"
      style=""
      dense
      :label="`Кол-во, ${pos.unit_name}`"
    >
      <v-icon slot="append" color="green"> mdi-cart </v-icon>
    </v-text-field>

    <v-card-actions style="">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon v-bind="attrs" style="transform: scale(-1, 1)" v-on="on"
            >mdi-head-heart-outline
          </v-icon>
        </template>
        <div>Цена мелк.опт: {{ pos.price2 }} руб.</div>
        <div>Цена круп.опт: {{ pos.price3 }} руб.</div>
      </v-tooltip>
      &nbsp;
      <div>{{ pos.price1 }} руб./{{ pos.unit_name }}</div>

      <v-spacer></v-spacer>

      <v-btn v-if="pos.describe" icon @click.prevent="show = !show">
        <v-icon>{{
          show ? "mdi-information-outline" : "mdi-information-outline"
        }}</v-icon>
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
      qty: 0,
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

<style scoped>
.centered-input >>> input {
  /* text-align: center; */
}
.centered-input >>> input[type="number"] {
  -moz-appearance: textfield;
}
.centered-input >>> input::-webkit-outer-spin-button,
.centered-input >>> input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
