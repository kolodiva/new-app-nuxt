<template>
  <div style="">
    <v-card style="min-height: 80vh">
      <TheBreadCrumbs :type-src="{ src: 'Cart' }" />

      <v-tabs v-model="tabOrders" align-with-title>
        <v-tabs-slider color="blue"></v-tabs-slider>

        <v-tab v-if="cartList.length > 0"> Корзина </v-tab>
        <v-tab v-if="userInfo.id > 1"> Архив Заказов </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tabOrders">
        <v-tab-item v-if="cartList.length > 0">
          <v-card flat class="mx-10 mt-2">
            <p style="font-size: 0.8rem; color: red; margin-bottom: 0">
              Бесплатные виды доставки<br />Следующие виды доставки мы
              осуществляем бесплатно: <br />
              - доставка до пункта приёма производится бесплатно для любой суммы
              заказа.<br />
              - доставка товаров по Москве и в пределах 20 км от МКАД, а так же
              до пунктов приёма транспортных компаний, при сумме заказа свыше 30
              000 рублей, в будние дни с 10 до 17 часов<br />
              Дата и время доставки согласовываются с менеджером.
            </p>
          </v-card>
          <v-card flat class="mx-5">
            <v-card-title class="headline pb-0 pt-2">
              {{
                cartList.length == 0
                  ? "Ваша корзина пуста."
                  : "Ваш заказ на сумму: " +
                    new Intl.NumberFormat("ru-RU").format(sumOrder) +
                    " руб."
              }}
            </v-card-title>

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
            <template v-if="cartList.length > 0">
              <v-row class="pb-0">
                <v-col cols="">
                  <v-card-actions class="justify-end">
                    <v-btn
                      color="orange"
                      @click="sendOrderForm = !sendOrderForm"
                    >
                      Отправить заказ в обработку
                    </v-btn>
                    <v-btn
                      color="orange"
                      @click="dialogEmptyCart = !dialogEmptyCart"
                    >
                      Очистить корзину
                    </v-btn>
                  </v-card-actions>
                  <v-card-title class="py-0 justify-end">
                    Информация о Заказе будет отправлена Вам на указанный при
                    отправке Email.
                  </v-card-title>
                </v-col>
              </v-row>
            </template>
          </v-card>
        </v-tab-item>
        <v-tab-item v-if="userInfo.id > 1">
          <v-card flat class="mx-5">
            <v-row class="pa-4">
              <v-btn color="orange" class="ml-3" @click="refreshOrdersLit">
                Обновить список Заказов
              </v-btn>
              <v-col cols="12">
                <v-data-table
                  dense
                  single-expand
                  :headers="headers1"
                  :items="itemOrders"
                  item-key="id"
                  show-expand
                  :expanded.sync="expandedOrders"
                  hide-default-footer
                  :options="{ itemsPerPage: 30 }"
                  class="elevation-1"
                >
                  <template v-slot:item.sum="{ item }">
                    {{ new Intl.NumberFormat("ru-RU").format(item.sum) }}
                  </template>
                  <template v-slot:item.sum1="{ item }">
                    {{ new Intl.NumberFormat("ru-RU").format(item.sum1) }}
                  </template>
                  <template v-slot:item.sum_for_payment="{ item }">
                    {{ item.sum_for_payment }}
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon
                          v-if="item.sum_for_payment > 0 && item.sum_paid == 0"
                          class="ml-1 red--text"
                          style="cursor: pointer"
                          v-bind="attrs"
                          v-on="on"
                          @click.prevent="openSberPayment(item)"
                          >mdi-credit-card-outline</v-icon
                        ></template
                      ><span>Перейти к оплате заказа</span></v-tooltip
                    >
                  </template>

                  <template v-slot:expanded-item="{ headers, item }">
                    <td :colspan="headers.length" class="pa-4">
                      <v-data-table
                        dense
                        :headers="subheaders"
                        :items="item.children"
                        item-key="guid"
                        :options="{ itemsPerPage: 100 }"
                      >
                        <template v-slot:top>
                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <div
                                class="ma-1 d-inline-flex"
                                style="cursor: pointer"
                                v-bind="attrs"
                                v-on="on"
                                @click="dialogAddAllOrderToCart = true"
                              >
                                <v-icon
                                  class="mr-1 red--text"
                                  style="cursor: pointer"
                                  >mdi-cart-plus</v-icon
                                >

                                <span>Повторить без пены...</span>
                              </div> </template
                            ><span
                              >Добавить весь Заказ в корзину с кол-вом</span
                            >
                          </v-tooltip>
                        </template>
                        <template v-slot:item.artikul="{ item }">
                          {{ item.artikul }}<br />{{ item.artikul_new }}
                        </template>
                        <template v-slot:item.name="{ item }">
                          <v-icon
                            class="mr-3 red--text"
                            style="cursor: pointer"
                            @click.prevent="showAddPos($event, item)"
                            >mdi-cart-plus</v-icon
                          >

                          <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                              <span
                                v-bind="attrs"
                                style="cursor: pointer"
                                v-on="on"
                                @click.prevent="
                                  openCart(
                                    `/catalog/${item.parentguid}/${item.synonym}`
                                  )
                                "
                              >
                                {{ item.name }}
                              </span> </template
                            ><span>Открыть карточку товара</span>
                          </v-tooltip>
                        </template>
                      </v-data-table>
                    </td>
                  </template>
                </v-data-table>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card>

    <v-menu
      v-model="menuAddPos.showMenu"
      :close-on-content-click="false"
      :position-x="menuAddPos.x"
      :position-y="menuAddPos.y"
      absolute
      offset-y
    >
      <v-card>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <img :src="menuAddPos.guidpicture" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ menuAddPos.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-text-field
          v-model="menuAddPos.qty"
          rounded
          filled
          style="width: 120px; height: 50px"
          type="number"
          class="ma-2 ml-auto"
          dense
          @wheel="1 === 1"
          @keyup.enter="addPosFromOrdersList()"
          @keyup.esc="menuAddPos.showMenu = false"
          @focus="$event.target.select()"
        >
        </v-text-field>

        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text @click="menuAddPos.showMenu = false"> НЕ сейчас </v-btn>
          <v-btn color="primary" text @click="addPosFromOrdersList()">
            Добавить в корзину?
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>

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
                    label="Как к Вам обращаться*"
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
          <small v-if="userInfo.id === 1" class="red--text"
            >* обязательное поле Анонима</small
          >
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
            Ваш заказ Анонимный. Вы можете продолжить, но нужно указать способы
            связи с Вами, либо войти/зарег. в системе. Если Вы откроете сайт в
            другом браузере, оставаясь Анонимным покупателем,то уже не сможете
            продолжать работать с текущим Заказом.
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
              Заполните пожалуйста данные Формы
            </v-btn>
            <v-btn v-else color="primary" text @click="sendOrder2">
              Буду отправлять Анонимно
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-dialog>

    <v-dialog v-model="dialogAddAllOrderToCart" persistent max-width="290">
      <v-card>
        <v-card-title class="headline"> Вопрос вопросов? </v-card-title>
        <v-card-text>Добавить весь Заказ в корзину?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="dialogAddAllOrderToCart = false"
          >
            НЕ сейчас
          </v-btn>
          <v-btn color="green darken-1" text @click="addAllPosOrderToCart">
            Да, конечно
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogEmptyCart" persistent max-width="350">
      <v-card>
        <v-card-title class=""> Предупреждение </v-card-title>
        <v-card-text>Очистить текущую корзину?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialogEmptyCart = false">
            НЕ сейчас
          </v-btn>
          <v-btn color="green darken-1" text @click="emptyCart">
            Да, Очистить ее
          </v-btn>
        </v-card-actions>
      </v-card>
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

      menuAddPos: {
        showMenu: null,
        guid: null,
        name: null,
        qty: null,
        guidpicture: null,
        priceCur: null,
        x: null,
        y: null,
      },

      dialogAddAllOrderToCart: false,
      dialogEmptyCart: false,

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

      expandedOrders: [],

      tabOrders: 0,

      headers1: [
        {
          text: "Номер",
          align: "right",
          sortable: true,
          value: "id",
          class: "blue--text",
        },
        {
          text: "Дата",
          align: "center",
          sortable: false,
          value: "data_on",
          class: "blue--text",
        },
        {
          text: "Сумма (исх.), ₽",
          align: "right",
          sortable: false,
          value: "sum",
          class: "blue--text",
        },
        {
          text: "Сумма (факт.), ₽",
          align: "right",
          sortable: false,
          value: "sum1",
          class: "blue--text",
        },
        {
          text: "Сумма (к опл.), ₽",
          align: "right",
          sortable: false,
          value: "sum_for_payment",
          class: "blue--text",
        },
        {
          text: "Сумма (оплач.), ₽",
          align: "right",
          sortable: false,
          value: "sum_paid",
          class: "blue--text",
        },
        {
          text: "Состояние",
          align: "left",
          sortable: false,
          value: "status",
          class: "blue--text",
        },
      ],
      subheaders: [
        {
          text: "Артикул",
          align: "center",
          sortable: false,
          value: "artikul",
          class: "cyan white--text",
          divider: true,
        },
        {
          text: "Наименование",
          align: "left",
          sortable: false,
          value: "name",
          class: "cyan white--text",
          divider: true,
        },
        {
          text: "Кол-во (исх)",
          align: "right",
          sortable: false,
          value: "qty",
          class: "cyan white--text",
          divider: true,
        },
        {
          text: "Кол-во (факт)",
          align: "right",
          sortable: false,
          value: "qty1",
          class: "cyan white--text",
          divider: true,
        },
        {
          text: "Цена (исх)",
          align: "right",
          sortable: false,
          value: "price",
          class: "cyan white--text",
          divider: true,
        },
        {
          text: "Цена (факт)",
          align: "right",
          sortable: false,
          value: "price1",
          class: "cyan white--text",
          divider: true,
        },
        {
          text: "Сумма (исх)",
          align: "right",
          sortable: false,
          value: "sum",
          class: "cyan white--text",
          divider: true,
        },
        {
          text: "Сумма (факт)",
          align: "right",
          sortable: false,
          value: "sum1",
          class: "cyan white--text",
          divider: true,
        },
      ],
    };
  },
  computed: {
    itemsOrders() {
      return [{ name: "Архив Заказов", children: this.itemOrders }];
    },
    ...mapGetters({
      cartList: "nomenklator/getCartList",
      userInfo: "nomenklator/getUserInfo",
      tabCartOrder: "service/getTabCartOrder",
    }),
    numOrder() {
      return this.cartList && this.cartList.length > 0
        ? this.cartLit[0].order_id + " от " + this.cartList[0].data_on
        : "***";
    },
    sumOrder() {
      return this.cartList && this.cartList.length > 0
        ? parseFloat(this.cartList[0].sum_total)
        : "0";
    },
  },
  beforeCreate() {},
  created() {},
  async mounted() {
    if (this.itemOrders.length === 0) {
      this.refreshOrdersLit();
    }

    if (this.tabCartOrder) {
      this.tabOrders = this.tabCartOrder.tabOrders;
      this.expandedOrders.push(this.tabCartOrder.expandedOrders);

      await this.$store.commit("service/SET_EMPTY_CART_ORDER_SETTINGS");
    }
  },
  methods: {
    async refreshOrdersLit() {
      const userid = this.userInfo.id;

      if (userid > 1) {
        const rows = await this.$api("getOrdersList", {
          userid,
        });

        this.itemOrders = [];

        this.$nextTick(() => {
          this.itemOrders.push(...rows);
        });
      }
    },
    showAddPos(e, item) {
      // e.preventDefault();

      this.menuAddPos.showMenu = false;
      this.menuAddPos.x = e.clientX;
      this.menuAddPos.y = e.clientY;
      this.menuAddPos.artikul = item.artikul;
      this.menuAddPos.name = item.name;
      this.menuAddPos.guid = item.guid;
      this.menuAddPos.qty = item.qty;
      this.menuAddPos.guidpicture = item.guidpicture;
      this.menuAddPos.priceCur = item.priceCur;
      this.menuAddPos.unit_type_id = item.unit_type_id;

      this.$nextTick(() => {
        this.menuAddPos.showMenu = true;
      });
    },
    test(v) {
      console.log(v, this.menuAddPos[v]);
      this.menuAddPos[v] = false;
    },
    async openSberPayment(item) {
      // console.log(item);
      // api_token: "pcu5rej2ovuhl34isprub5jdke",
      // api_token test: "YRF3C5RFICWISEWFR6GJ",
      const ipay = await new window.IPAY({
        api_token: "pcu5rej2ovuhl34isprub5jdke",
      });
      // console.log(ipay);
      if (ipay) {
        window.ipayCheckout(
          {
            amount: item.sum_for_payment,
            currency: "RUB",
            order_number: item.order_1c,
            description: `Оплата за мебельную фурнитуру по: ${item.order_1c}.`,
          },

          function (order) {
            // const patt = new RegExp("(?<=orderId=)(.*?)(?=&)");
            //
            // let idOrder = "";

            try {
              // idOrder = patt.exec(order.successUrl)[1];
              //
              // const res = {
              //   order_id: item.id,
              //   payment_order_id: idOrder,
              //   payment_order_number: order.orderNumber,
              //   payment_digest: order.digest,
              //   payment_email: order.email,
              //   payment_status: order.status,
              //   data_paid: order.paymentDate,
              //   sum_paid: order.formattedAmount,
              //   payment_pan_masked: order.panMasked,
              // };
              // console.log(res);
            } catch (e) {
              console.error(e);
            }
          },

          function (order) {
            // console.error();
          }
        );
      }
    },
    async openCart(path) {
      await this.$store.commit("service/SET_CART_ORDER_SETTINGS", {
        tabOrders: this.tabOrders,
        expandedOrders: this.expandedOrders[0],
      });
      this.$router.push(path);
    },
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
          text: `Необходимо изменить Количество.`,
          timeout: 3000,
          showing: true,
        });
      } else {
        await this.$store.dispatch("nomenklator/chngeCartFromCart", pos);
      }
    },

    addAllPosOrderToCart() {
      this.dialogAddAllOrderToCart = false;

      const posses =
        (this.expandedOrders &&
          this.expandedOrders.length > 0 &&
          this.expandedOrders[0].children) ||
        [];

      let pos = {};

      posses.forEach((item, i) => {
        pos = {};

        pos.artikul = item.artikul;
        pos.guid = item.guid;
        pos.qty = item.qty;
        pos.priceCur = item.priceCur;
        pos.unit_type_id = item.unit_type_id;

        this.addPosFromOrdersList(pos);

        // console.log(item.guid, item.qty);
      });
    },
    async addPosFromOrdersList(posses = null) {
      const pos = posses || this.menuAddPos;

      pos.showMenu = false;

      if (pos.qty === "" || pos.qty == null || parseFloat(pos.qty) < 0) {
        pos.qty = 0;
      }
      if (pos.qty > 0) {
        let cartPos = this.cartList.find((v) => v.guid === pos.guid);

        cartPos = cartPos ? cartPos.qty1 : 0;

        pos.qty = parseFloat(pos.qty) + cartPos;

        await this.$store.dispatch("nomenklator/chngeCartFromOrdersList", pos);
      } else {
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: `Необходимо изменить Количество.`,
          timeout: 3000,
          showing: true,
        });
      }
    },
    openShowComplectPos(pos) {
      this.infoComplectPos = { ...pos };
      this.infoComplectPos.pic_path =
        "https://www.newfurnitura.ru/upload/" + pos.id + ".jpg";
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
          let city = "";
          try {
            city = window.$("#yourCity").html();
          } catch (e) {
            city = "НЕ определен";
          }
          await this.$store.dispatch("nomenklator/procOrder", {
            mister: this.mister,
            filial: this.defFil,
            email: this.email,
            phone: this.phone,
            info: this.lastWord,
            mastercard: this.mastercard,
            showEmail: false,
            city,
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
        let city = "";
        try {
          city = window.$("#yourCity").html();
        } catch (e) {
          city = "НЕ определен";
        }
        await this.$store.dispatch("nomenklator/procOrder", {
          mister: this.mister,
          filial: this.defFil,
          email: this.email,
          phone: this.phone,
          info: this.lastWord,
          mastercard: this.mastercard,
          city,
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
    async emptyCart() {
      try {
        await this.$store.dispatch("nomenklator/emptyCart");
        this.dialogEmptyCart = false;
        this.$router.push("/");
      } catch (e) {
      } finally {
      }
    },
  },

  head() {
    return {
      script: [
        {
          src:
            "https://securepayments.sberbank.ru/payment/docsite/assets/js/ipay.js",
        },
      ],
    };
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
