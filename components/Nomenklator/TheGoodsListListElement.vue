<template>
  <v-row class="mb-5" no-gutters style="width: 100vw; min-height: 220px">
    <v-col lg="10" cols="12" class="greyMfBorder">
      <v-row>
        <v-col cols="4">
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
        </v-col>

        <v-col cols="8">
          <div>
            {{ pos.name }}<br />
            арктикул: {{ pos.artikul }}, новый:
            {{ pos.artikul_new }}
            <v-card-text v-html="pos.describe"> </v-card-text>
          </div>
        </v-col>
      </v-row>
    </v-col>

    <v-col lg="2" cols="12" class="pa-3 greyMfBorder">
      <div class="d-flex">
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
      <v-text-field
        v-model="pos.qty2"
        rounded
        filled
        type="number"
        class="mt-4 centered-input"
        style="max-width: 235px"
        dense
        :label="txtLabel"
        @change="$emit('chngorder', id)"
        @focus="$event.target.select()"
      >
        <v-icon slot="append" :color="btnColor"> mdi-cart </v-icon>
      </v-text-field>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: ["pos", "id"],
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
    btnColor() {
      return parseFloat(this.pos.qty1) === parseFloat(this.pos.qty2)
        ? "green"
        : "red";
    },
    txtLabel() {
      return parseFloat(this.pos.qty1) === parseFloat(this.pos.qty2)
        ? "Кол-во, " + this.pos.unit_name
        : "Кол-во, " + this.pos.unit_name + ", было " + this.pos.qty1;
    },
  },
  mounted() {
    // this.qty = parseFloat(this.pos.qty2);
  },

  methods: {
    async showQuickShopDialog() {
      await this.$store.dispatch("shop/openQuickShopDialog", this.pos);
    },
    onImgErrorLoad() {
      this.errLoadImg = true;
    },
    _chngOrder() {
      console.log(this.pos.qty2);
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
