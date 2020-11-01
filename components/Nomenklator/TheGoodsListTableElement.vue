<template>
  <v-row
    class="mb-3 greyMfBorder"
    no-gutters
    style="width: 100vw; height: 100px"
  >
    <v-col cols="2">
      <n-link
        :to="`${pos.parentguid}/${pos.synonym}`"
        style="text-decoration: none"
      >
        <v-img
          :src="cPic"
          contain
          max-height="95"
          class=""
          style="cursor: pointer"
          @error="onImgErrorLoad"
        >
        </v-img>
      </n-link>
    </v-col>

    <v-col cols="" class="d-flex">
      <div class="align-self-center">
        {{ pos.name }}
        <br />
        арктикул: {{ pos.artikul }}, новый: {{ pos.artikul_new }}
      </div>
    </v-col>

    <v-col class="d-flex" cols="">
      <div class="d-flex align-self-center">
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
      </div>
    </v-col>
    <v-col>
      <v-text-field
        rounded
        filled
        type="number"
        class="mt-4 centered-input"
        style="max-width: 235px"
        dense
        :label="`Кол-во, ${pos.unit_name}`"
      >
        <v-icon slot="append" color="green"> mdi-cart </v-icon>
      </v-text-field>
    </v-col>
  </v-row>
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
