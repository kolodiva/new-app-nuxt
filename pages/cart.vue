<template>
  <div>
    <v-card style="min-height: 80vh">
      <TheBreadCrumbs :type-src="{ src: 'Cart' }" />

      <v-tabs v-model="tabOrders" align-with-title>
        <v-tabs-slider color="blue"></v-tabs-slider>

        <v-tab v-if="cartList.length > 0"> Корзина </v-tab>
        <v-tab v-if="userInfo.id > 1"> Архив Заказов </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabOrders">
        <v-tab-item v-if="cartList.length > 0">
          <v-card flat class="mx-5">
            <v-card-title class="headline pb-0">
              {{
                cartList.length == 0
                  ? "Ваша корзина пуста."
                  : "Ваш заказ " + numOrder + " на сумму: " + sumOrder + " руб."
              }}
            </v-card-title>

            <template v-if="cartList.length > 0">
              <v-card-actions>
                <v-btn color="orange" @click="sendOrderForm = !sendOrderForm">
                  Отправить заказ в обработку
                </v-btn>
              </v-card-actions>
              <v-card-title class="py-0">
                Информация о Заказе будет отправлена Вам на указанный при
                регистрации Email.
              </v-card-title>
            </template>
            <v-row class="pb-0" justify="space-between">
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
                        $router.push(
                          `catalog/${item.parentguid}/${item.synonym}`
                        )
                      "
                    />
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
                      <v-col class="align-self-center" cols="2">
                        {{ getQtyPosCompl(item) }}, {{ item.unit_name }}
                      </v-col>
                    </v-row>
                    <v-row v-else class="align-center fontSize1rem">
                      <v-col cols="2" class="text-wrap">
                        {{ item.artikul }},<br />{{ item.artikul_new }}</v-col
                      >
                      <v-col cols="4" class="text-wrap">{{ item.name }}</v-col>
                      <v-col cols="2" class=""
                        >{{ item.unit_name }},<br />{{ item.price1 }}<br />
                        <v-img
                          v-if="item.is_complect > 0"
                          class="ml-4"
                          src="/isComplect.png"
                          width="28"
                          style="cursor: pointer"
                          @click="togglePosComplect(item)"
                        />
                      </v-col>
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
        </v-tab-item>
        <v-tab-item v-if="userInfo.id > 1">
          <v-card flat class="mx-5">
            <v-row class="pa-4">
              <v-col cols="12">
                <v-treeview
                  :active.sync="activeOrders"
                  :items="itemsOrders"
                  :load-children="fetchOrders"
                  color="warning"
                  open-on-click
                  transition
                  dense
                >
                  <template v-slot:label="{ item }">
                    <v-card-subtitle v-if="item.data_on" class="title py-0">
                      Заказ {{ item.id }} от {{ item.data_on }} сумма:
                      {{ item.sum }} к оплате картой {{ item.sum_for_payment }}
                    </v-card-subtitle>
                    <v-card-subtitle
                      v-else-if="item.guid"
                      class="subtitle py-0"
                    >
                      <tr>
                        <td style="width: 90px">{{ item.artikul }}</td>
                        <td style="width: 150px">
                          {{ item.name }}
                        </td>
                        <td style="width: 50px; text-align: center">
                          {{ item.qty }}
                        </td>
                        <td style="width: 60px; text-align: right">
                          {{ item.sum }}
                        </td>
                      </tr>
                    </v-card-subtitle>
                    <v-card-title v-else class="headline py-0">
                      {{ item.name }}
                    </v-card-title>
                  </template>
                </v-treeview>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-dialog v-model="sendOrderForm" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="subtitle-1">Форма для отправки Заказа</span>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="sendOrderForm = !sendOrderForm"
            >Отмена</v-btn
          >
        </v-card-title>
        <v-card-text>
          <v-card-text class="py-0">
            Заказ, отправленный через наш сайт будет исполняться в приоритетном
            режиме. Для Зарегистрированных пользователей доступна оплата
            Платежной картой после обработки Заказа менеджером.
          </v-card-text>
          <v-container>
            <v-row>
              <template v-if="userInfo.id === 1">
                <v-col cols="12" class="py-0">
                  <v-text-field
                    v-model="mister"
                    clearable
                    type="text"
                    label="Обращение*"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="email"
                    type="email"
                    label="Email*"
                  ></v-text-field>
                </v-col>
                <v-col cols="6" class="py-0">
                  <v-text-field
                    v-model="phone"
                    clearable
                    type="text"
                    label="Контактный телефон*"
                  ></v-text-field>
                </v-col>
              </template>
              <v-col cols="12" class="py-0">
                <v-textarea
                  v-model="lastWord"
                  clearable
                  type="text"
                  filled
                  label="Напутствие"
                  auto-grow
                  dense
                ></v-textarea>
              </v-col>
              <v-col cols="12" class="py-0">
                <v-select
                  v-model="defFil"
                  dense
                  :items="[
                    'Москва',
                    'Екатеринбург',
                    'Ростов-на-Дону',
                    'Новосибирск',
                    'Казань',
                    'Санкт-Петербург',
                    'Краснодар',
                  ]"
                  label="Филиал*"
                ></v-select>
              </v-col>
              <v-col v-if="userInfo.id > 1" class="py-0">
                <v-checkbox v-model="mastercard">
                  <template v-slot:label>
                    <div class="mb-n2">Хочу оплатить картой!</div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
          </v-container>
          <small v-if="userInfo.id === 1">* обязательное поле Анонима</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="sendOrderForm = !sendOrderForm"
            >Отмена</v-btn
          >
          <v-btn color="blue darken-1" text @click="sendOrder">Отправить</v-btn>
        </v-card-actions>
      </v-card>
      <v-dialog v-model="questAnonymus" max-width="500px">
        <v-card>
          <v-card-actions>
            <v-btn color="primary" text @click="true === true">
              Информация
            </v-btn>
            <v-spacer />
            <v-btn color="primary" text @click="questAnonymus = false">
              Отмена
            </v-btn>
          </v-card-actions>
          <v-card-title class="subtitle-1" style="word-break: break-word">
            ВАШ ЗАКАЗ АНОНИМНЫЙ. ВЫ МОЖЕТЕ ПРОДОЛЖИТЬ, НО НУЖНО УКАЗАТЬ СПОСОБ
            СВЯЗИ С ВАМИ, ЛИБО ВОЙТИ В СИСТЕМУ ПОД СВОИМ АККАУНТОМ. ЕСЛИ ВЫ
            ОЧИСТИТЕ КУКИ ИЛИ ОТКРОЕТЕ САЙТ В ДРУГОМ БРАУЗЕРЕ В КАЧЕСТВЕ
            АНОНИМНОГО ПОКУПАТЕЛЯ, ТО УЖЕ НЕ СМОЖЕТЕ УВИДЕТЬ СВОЙ ЗАКАЗ.
            РЕКОМЕНДУЕМ ВАМ ВОЙТИ/ЗАРЕГИСТРИРОВАТЬСЯ ПОД СВОИМ ЛОГИНОМ.
          </v-card-title>
          <v-card-actions>
            <v-btn color="primary" text to="/login"> Войти </v-btn>
            <v-spacer />
            <v-btn
              v-if="notFullDataAnonim === true"
              color="primary"
              text
              @click="questAnonymus = false"
            >
              Заполните форму
            </v-btn>
            <v-btn v-else color="primary" text @click="sendOrder2">
              Отправить
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>
  </div>
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

      defFil: "Москва",
      sendOrderForm: false,
      questAnonymus: false,
      notFullDataAnonim: true,
      mister: "",
      email: "",
      phone: "",
      lastWord: "",
      mastercard: false,
      showEmail: false,

      activeOrders: [],
      openOrders: [],
      itemOrders: [],

      tabOrders: null,
    };
  },
  computed: {
    itemsOrders() {
      return [{ name: "Архив Заказов", children: this.itemOrders }];
    },
    ...mapGetters({
      cartList: "nomenklator/getCartList",
      userInfo: "nomenklator/getUserInfo",
    }),
    numOrder() {
      return this.cartList && this.cartList.length > 0
        ? this.cartList[0].order_id + " от " + this.cartList[0].data_on
        : "***";
    },
    sumOrder() {
      return this.cartList && this.cartList.length > 0
        ? parseFloat(this.cartList[0].sum_total)
        : "0";
    },
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
    async sendOrder() {
      if (this.userInfo.id === 1) {
        this.notFullDataAnonim = !(this.mister && this.email && this.phone);

        this.questAnonymus = true;
      } else {
        try {
          await this.$store.dispatch("nomenklator/procOrder", {
            mister: this.mister,
            filial: this.defFil,
            email: this.email,
            phone: this.phone,
            info: this.lastWord,
            mastercard: this.mastercard,
            showEmail: false,
          });
          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "green",
            text: `Заказ отправлен в обработку`,
            timeout: 5000,
          });
          this.$store.dispatch("nomenklator/refreshCountCart");
          this.$router.replace({ path: "/" });
        } catch (e) {
          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "error",
            text: `Ошибка при попытке отправить Заказ в обработку: ${e.response.data}`,
            timeout: 5000,
          });
        }
        this.questAnonymus = false;
        this.sendOrderForm = false;
      }
    },
    async sendOrder2() {
      try {
        await this.$store.dispatch("nomenklator/procOrder", {
          mister: this.mister,
          filial: this.defFil,
          email: this.email,
          phone: this.phone,
          info: this.lastWord,
          mastercard: this.mastercard,
        });
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "green",
          text: `Заказ отправлен в обработку`,
          timeout: 5000,
        });
        this.$store.dispatch("nomenklator/refreshCountCart");
        this.$router.replace({ path: "/" });
      } catch (e) {
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "error",
          text: `Ошибка при попытке отправить Заказ в обработку: ${e.response.data}`,
          timeout: 5000,
        });
      }
      this.questAnonymus = false;
      this.sendOrderForm = false;
    },
    async fetchOrders(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      // await pause(1500);
      const rows = await this.$api("getOrdersList", {
        userid: this.userInfo.id,
      });

      // item.children = [];
      item.children.push(...rows);
      // console.log();
      // return await this.$api("getOrdersList", this.userInfo.id)
      //   .then((res) => item.children.push(...res))
      //   .catch((err) => console.warn(err));
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
