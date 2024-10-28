<template>
  <v-row
    class="mb-3 greyMfBorder"
    no-gutters
    style="width: 83vw; min-height: 100px"
  >
    <v-col cols="2">
      <n-link append :to="`${pos.synonym}`" style="text-decoration: none">
        <div style="position: relative">
          <img
            :src="cPic"
            class="d-block mx-auto"
            style="
              cursor: pointer;
              max-height: 95px;
              min-height: 95px;
              object-fit: contain;
            "
            :alt="pos.intrnt_microdata.title"
            @error="onImgErrorLoad"
          />
          <img
            v-if="pos.is_complect > 0"
            src="/isComplect.png"
            style="
              cursor: pointer;
              position: absolute;
              right: 15px;
              top: 5px;
              width: 16px;
            "
          />
          <img
            v-if="pos.is_discount === true"
            src="/isDiscount.png"
            style="
              cursor: pointer;
              position: absolute;
              left: 10px;
              top: 10px;
              width: 32px;
              z-index: 1;
            "
          />
        </div>
      </n-link>
    </v-col>

    <v-col cols="" class="d-flex">
      <div class="align-self-center">
        <n-link append :to="`${pos.synonym}`" style="text-decoration: none">
          <div style="cursor: pointer">
            {{ pos.name }}
          </div>
        </n-link>
        артикул: {{ pos.artikul }}, новый: {{ pos.artikul_new }}
        <v-card-text class="pa-0 pt-2"
          >Вес брутто кг., {{ pos["weight"] }}</v-card-text
        >
      </div>
    </v-col>

    <v-col class="d-flex justify-center" cols="">
      <div class="d-flex align-self-center">
        <!-- <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon v-bind="attrs" style="transform: scale(-1, 1)" v-on="on"
              >mdi-head-heart-outline
            </v-icon>
          </template>
          <div>Цена мелк.опт: {{ pos.price2 }} руб.</div>
          <div>Цена круп.опт: {{ pos.price3 }} руб.</div>
        </v-tooltip> -->
        &nbsp;
        <div>{{ pos.price1 }} руб./{{ pos.unit_name }}</div>
      </div>
    </v-col>
    <v-col class="pr-2">
      <v-text-field
        v-model="pos.qty2"
        rounded
        filled
        clearable
        type="number"
        :class="['mt-4', 'centered-input', { 'change-value': diffQty }]"
        style="max-width: 235px"
        dense
        :label="txtLabel"
        @click:clear="
          pos.qty2 = 0;
          $emit('chngorder', id);
        "
        @keyup.enter="$emit('chngorder', id)"
        @keyup.esc="pos.qty2 = pos.qty1"
        @focus="$event.target.select()"
        @wheel="1 === 1"
      >
        <v-img
          slot="append"
          src="/cart.png"
          width="28"
          style="cursor: pointer"
          @click="$emit('chngorder', id)"
        />
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
      qty: 0,
    };
  },
  computed: {
    cPic() {
      return this.errLoadImg
        ? "https://www.newfurnitura.ru/upload/8126cd02-1094-46d4-a70a-f2e2d5b5_250x250.jpg"
        : this.pos.guid_picture;
    },
    txtLabel() {
      return parseFloat(this.pos.qty1) === parseFloat(this.pos.qty2)
        ? this.pos.unit_name
        : this.pos.unit_name + ", было " + this.pos.qty1 + ", esc - отмена.";
    },
    diffQty() {
      return parseFloat(this.pos.qty1) !== parseFloat(this.pos.qty2);
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
.change-value >>> .v-text-field__slot input {
  color: red;
}
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
