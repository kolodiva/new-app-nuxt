<template>
  <v-row class="mb-3 greyMfBorder" no-gutters style="">
    <v-col cols="2">
      <n-link
        :to="`catalog/${pos.parentguid}/${pos.synonym}`"
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
          <v-img
            v-if="pos.is_complect > 0"
            src="/isComplect.png"
            width="16"
            style="cursor: pointer; position: absolute; right: 60px; top: 5px"
          />
        </v-img>
      </n-link>
    </v-col>

    <v-col cols="" class="d-flex">
      <div class="align-self-center">
        артикул: {{ pos.artikul }}, новый: {{ pos.artikul_new }}
        <br />
        {{ pos.name }}
        <br />
        <v-img
          v-if="pos.is_complect > 0"
          src="/isComplect.png"
          width="32"
          style="cursor: pointer"
        />
      </div>
    </v-col>

    <v-col cols="" class="d-flex justify-center">
      <div class="d-flex align-self-center">
        <div>{{ pos.price1 }} руб./{{ pos.unit_name }}</div>
      </div>
    </v-col>
    <v-col>
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
          $emit('chngorder', { id, pos });
        "
        @keyup.enter="$emit('chngorder', { id, pos })"
        @keyup.esc="pos.qty2 = pos.qty1"
        @focus="$event.target.select()"
        @wheel="1 === 1"
      >
        <v-img
          slot="append"
          src="/cart.png"
          width="28"
          style="cursor: pointer"
          @click="$emit('chngorder', { id, pos })"
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
      errLoadImg: false,
    };
  },
  computed: {
    cPic() {
      return this.errLoadImg
        ? "https://newfurnitura.ru/upload/8126cd02-1094-46d4-a70a-f2e2d5b5_250x250.jpg"
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
