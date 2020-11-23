<template>
  <v-card style="min-height: 80vh">
    <TheBreadCrumbs :type-src="{ src: 'Cart' }" />
    <v-card-title class="headline pb-0">
      {{
        cartList.length == 0
          ? "Ваша корзина пуста."
          : "Ваш заказ на общую сумму: " + cartList[0].sum_total + " руб."
      }}
    </v-card-title>

    <v-row class="pa-4" justify="space-between">
      <v-col cols="">
        <v-treeview
          :items="cartList"
          expand-icon=""
          transition
          dense
          activatable
          :active.sync="active"
          :open.sync="open"
        >
          <template v-slot:prepend="{ item }">
            <v-img
              :src="item.guid_picture"
              contain
              min-height="70"
              max-height="70"
              class=""
              style="cursor: pointer"
              @click="
                $router.push(`catalog/${item.parentguid}/${item.synonym}`)
              "
            >
            </v-img>
          </template>
          <template v-slot:label="{ item, leaf }">
            <v-row v-if="leaf" class="" style="">
              <v-col cols="2">
                <v-img
                  :src="item.guid_picture_compl"
                  contain
                  min-height="70"
                  max-height="70"
                  class=""
                  style="cursor: pointer"
                  @click="openShowComplectPos(item)"
                />
              </v-col>
              <v-col class="align-self-center text-wrap" cols="4"
                >{{ item.artikul }}, {{ item.name }}</v-col
              >
              <v-col class="align-self-center" cols="2"
                >{{ getQtyPosCompl(item) }}, {{ item.unit_name }}</v-col
              >
            </v-row>
            <v-row v-else class="align-center fontSize1rem">
              <v-col cols="2" class="">
                {{ item.artikul }},<br />{{ item.artikul_new }}</v-col
              >
              <v-col cols="4" class="text-wrap">{{ item.name }}</v-col>
              <v-col cols="1"
                >{{ item.unit_name }},<br />{{ item.price1 }}</v-col
              >
              <v-col cols="" class="">
                <v-text-field
                  v-model="item.qty2"
                  rounded
                  filled
                  clearable
                  type="number"
                  :class="[
                    'mt-4',
                    'mx-auto',
                    'centered-input',
                    { 'change-value': diffQty(item) },
                  ]"
                  style="max-width: 235px"
                  dense
                  :label="txtLabel(item)"
                  @click:clear="
                    item.qty2 = 0;
                    chngorder(item);
                  "
                  @wheel="1 === 1"
                  @keyup.esc="item.qty2 = item.qty1"
                  @focus="$event.target.select()"
                  @keyup.enter="chngorder(item)"
                >
                  <v-img
                    slot="append"
                    src="/cart.png"
                    width="28"
                    style="cursor: pointer"
                    @click="chngorder(item)"
                  />
                </v-text-field>
              </v-col>
              <v-col cols="1">
                <v-img
                  v-if="item.is_complect > 0"
                  src="/isComplect.png"
                  width="32"
                  style="cursor: pointer"
                  @click="togglePosComplect(item)"
              /></v-col>
            </v-row>
          </template>
        </v-treeview>
      </v-col>
    </v-row>
    <TheDialogComplects
      :info-complect-pos="infoComplectPos"
      :open-dialog="showComplectPos"
      from-cart="true"
      @closeWin="closeComplectsView"
    />
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";
// const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  async fetch({ app, params, query, store }) {
    // await store.dispatch("nomenklator/loadSubNumenklator", params);
  },

  data() {
    return {
      active: [],
      open: [],

      showComplectPos: false,
      infoComplectPos: {},
    };
  },
  computed: {
    ...mapGetters({
      cartList: "nomenklator/getCartList",
    }),
  },
  watch: {},
  beforeCreate() {},
  mounted() {},
  methods: {
    togglePosComplect(item) {
      this.open = this.open.indexOf(item.id) === 0 ? [] : [item.id];
    },
    getQtyPosCompl(item) {
      // const idParent = this.open[0];
      const obj = this.cartList.find((o) => o.id === item.guid);
      if (obj) {
        return parseFloat(obj.qty1) * parseFloat(item.koeff);
      } else {
        return item.qty;
      }
    },

    txtLabel(item) {
      return parseFloat(item.qty1) === parseFloat(item.qty2)
        ? item.unit_name
        : item.unit_name + ", было " + item.qty1 + ", esc - отмена.";
    },
    diffQty(item) {
      return parseFloat(item.qty1) !== parseFloat(item.qty2);
    },
    async chngorder(pos) {
      if (pos.qty2 === "" || pos.qty2 == null || parseFloat(pos.qty2) < 0) {
        pos.qty2 = 0;
      }

      if (parseFloat(pos.qty1) === parseFloat(pos.qty2)) {
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: `Мозги керак эмас.`,
          timeout: 3000,
          showing: true,
        });
      } else {
        await this.$store.dispatch("nomenklator/chngeCartFromCart", pos);
      }
    },
    openShowComplectPos(pos) {
      this.infoComplectPos = { ...pos };
      this.infoComplectPos.pic_path =
        "https://newfurnitura.ru/upload/" + pos.id + ".jpg";
      this.showComplectPos = true;
    },
    closeComplectsView(event) {
      this.showComplectPos = false;
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
