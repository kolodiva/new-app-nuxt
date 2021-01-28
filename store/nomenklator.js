// import _ from 'lodash'

// import { getData } from '@/utils/store-utils'

// const consola = require("consola");

// import _ from 'lodash'

export const state = () => ({
  catalogTypeView: "list",
  strucCatalog: [],
  subNomenklator: [],
  goodCard: [],
  breadCrumb: [],
  pageHeader: "",
  seoText: "",
  seoTextMain: "",
  waitNomenklatorLoad: undefined,
  snackbars: [],
  userInfo: undefined,
  countCart: 0,
  cartList: [],
  canUseFilter: false,
  userFilter: null,
  userFilterFromGroup: null,
  orderListFromExcel: [],
});

export const mutations = {
  SET_SUB_NOMENKLATOR(state, rows) {
    state.subNomenklator = rows;
  },
  SET_CAN_USE_FILTER(state, canUseFilter) {
    state.canUseFilter = canUseFilter;
  },
  SET_GOOD_CARD(
    state,
    { rows, rowsphoto, breadcrumb, complects, dopcomplects }
  ) {
    state.goodCard = { rows, rowsphoto, breadcrumb, complects, dopcomplects };
  },
  SET_BREAD_CRUMB(state, rows) {
    state.breadCrumb = rows;
    state.pageHeader = rows.length > 1 ? rows[rows.length - 1].name : "";
  },
  SET_SEO_TEXT(state, rows) {
    state.seoText = rows.length > 0 ? rows[0].content : "";
  },
  SET_SEO_TEXT_MAIN(state, rows) {
    state.seoTextMain = rows.length > 0 ? rows[0].content : "";
  },
  SET_WAIT_LOAD_NOMENKLATOR(state, val) {
    state.waitNomenklatorLoad = val;
  },
  SET_STRUC_CATALOG(state, rows) {
    // state.strucCatalog = JSON.parse(rows);
    state.strucCatalog = rows;
  },
  SET_CATALOG_TYPE_VIEW(state, name) {
    state.catalogTypeView = name;
  },
  SET_NEW_QTY(state, { id, esc }) {
    const obj = id < 0 ? state.goodCard.rows[0] : state.subNomenklator[id];
    if (esc === true) {
      obj.qty2 = parseFloat(obj.qty1);
    } else {
      obj.qty1 = parseFloat(obj.qty2);
      obj.qty2 = parseFloat(obj.qty2);
      obj.total = parseFloat(obj.qty1 * obj.price1).toFixed(2);
    }
  },
  SET_NEW_QTY_FROMCART(state, { id, esc }) {
    const obj = state.cartList.find((o) => o.id === id);

    if (obj && esc === true) {
      obj.qty2 = parseFloat(obj.qty1);
    } else if (obj) {
      obj.qty1 = parseFloat(obj.qty2);
      obj.qty2 = parseFloat(obj.qty2);
      obj.sum = parseFloat(obj.qty1 * obj.price1).toFixed(2);

      let sumTotal = 0;

      state.countCart = state.cartList.filter((item) => {
        sumTotal = sumTotal + parseFloat(item.sum);
        return item.qty1 > 0;
      }).length;

      state.cartList[0].sum_total = sumTotal.toFixed(2);
    }
  },
  SET_NEW_QTY_FROMDOPCOMPLECT(state, { id, esc }) {
    if (!state.goodCard.dopcomplects) {
      return;
    }

    const obj = state.goodCard.dopcomplects.find((o) => o.guid === id);

    // console.log(id, obj);

    if (obj && esc === true) {
      obj.qty2 = parseFloat(obj.qty1);
    } else if (obj) {
      obj.qty1 = parseFloat(obj.qty2);
      obj.qty2 = parseFloat(obj.qty2);
      obj.sum = parseFloat(obj.qty1 * obj.price1).toFixed(2);
    }
  },
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = [];
    state.snackbars = state.snackbars.concat(snackbar);
  },
  SET_USER_INFO(state, userinfo) {
    state.userInfo = userinfo;
  },
  EMPTY_USER_INFO(state) {
    state.userInfo = undefined;
  },
  SET_COUNT_CART(state, rows) {
    state.cartList = rows;
    state.countCart = rows.length;
  },
  OPEN_FILTER(state, { rows, parentguid }) {
    if (rows === null) {
      state.userFilter = null;
    } else {
      state.userFilter = {
        rows,
        parentguid,
        stateFilter: [[]],
        filterOpened: true,
      };
    }
  },
  SET_FILTER_STATE(state, { groupFilter }) {
    // console.log(groupFilter);
    if (state.userFilter) {
      state.userFilter.stateFilter = [...groupFilter];
    }
  },
  SET_FILTER_FROM_GROUP(state, v) {
    state.userFilterFromGroup = v;
  },
  SET_ORDER_LIST_FROM_EXCEL(state, rows) {
    state.orderListFromExcel = rows;
  },
};
export const getters = {
  isGroup: (state) => {
    return (
      state.subNomenklator &&
      state.subNomenklator.length > 0 &&
      state.subNomenklator[0].itgroup
    );
  },
  getHeaderDescription: (state) => {
    return (
      state.breadCrumb &&
      state.breadCrumb.length > 0 &&
      state.breadCrumb[state.breadCrumb.length - 1].intrnt_microdata
    );
  },
  pageHeader: (state) => {
    return state.pageHeader
      ? state.pageHeader.toUpperCase() === "YANDEXPAGESECRET"
        ? "Каталог товаров"
        : state.pageHeader
      : "Мебельная фурнитура";
  },
  getSubNomenklator: (state) => {
    return state.subNomenklator;
  },
  getCanUseFilter: (state) => {
    return state.canUseFilter;
  },

  getCatalogTypeView: (state) => {
    return state.catalogTypeView;
  },

  getGoodCard: (state) => {
    return state.goodCard.rows && state.goodCard.rows.length > 0
      ? state.goodCard.rows[0]
      : null;
  },
  getBreadCrumb: (state) => {
    const pos = [];

    if (state.breadCrumb.length > 0) {
      let itsYPS = null;
      state.breadCrumb.forEach((v, ind) => {
        itsYPS = v.name.toUpperCase() === "YANDEXPAGESECRET";
        pos.push({
          text: itsYPS ? "Каталог товаров" : v.name,
          disable: false,
          to: v.guid === null ? "/" : itsYPS ? "/" : v.guid,
          ind: ind + 1,
          qty: state.breadCrumb.length,
        });
      });
    } else {
      pos.push({
        text: "На главную",
        disable: false,
        to: "/",
        ind: 1,
        qty: 1,
      });
    }

    return pos;
  },
  getGoodCardBreadCrumb: (state) => {
    const pos = [];

    if (
      state.goodCard &&
      state.goodCard.breadcrumb &&
      state.goodCard.breadcrumb.length > 0
    ) {
      state.goodCard.breadcrumb.forEach((v, ind) => {
        pos.push({
          text:
            v.name.toUpperCase() === "YANDEXPAGESECRET"
              ? "Каталог товаров"
              : v.name,
          disable: false,
          to: v.guid === null ? "/" : v.guid,
          ind: ind + 1,
          qty: state.breadCrumb.length,
        });
      });
    } else {
      pos.push({
        text: "На главную",
        disable: false,
        to: "/",
        ind: 1,
        qty: 1,
      });
    }

    return pos;
  },
  getGoodCardComplects: (state) => {
    return state.goodCard.complects;
  },
  getGoodCardDopComplects: (state) => {
    return state.goodCard.dopcomplects;
  },
  getGoodCardRowsPhoto: (state) => {
    return state.goodCard.rowsphoto;
  },
  getSeoText: (state) => {
    return state.seoText;
  },
  getSeoTextMain: (state) => {
    return state.seoTextMain;
  },
  strucCatalog: (state) => {
    return state.strucCatalog;
  },

  getUserInfoEmail: (state) => {
    return state.userInfo && state.userInfo.id > 1
      ? state.userInfo.email
      : undefined;
  },
  getUserInfo: (state) => {
    return state.userInfo ? state.userInfo : { email: "anonimus", id: 1 };
  },
  getCartCount: (state) => {
    return state.countCart;
  },
  getCartList: (state) => {
    return state.cartList;
  },
  getUserFilter: (state) => {
    return (state.userFilter && state.userFilter.rows) || [];
  },
  getUserFilterState: (state) => {
    // const tmp = [[]];
    return (state.userFilter && state.userFilter.stateFilter) || null;
  },
  getFilterOpened: (state) => {
    return !!state.userFilter;
  },
  getFilterFromGroup: (state) => {
    return state.userFilterFromGroup;
  },
  getParentGuid: (state) => {
    return (state.userFilter && state.userFilter.parentguid) || null;
  },
  getSnackbars: (state) => {
    return state.snackbars;
  },

  getOrderListFromExcel: (state) => {
    return state.orderListFromExcel;
  },
};

export const actions = {
  chngCatalogTypeView({ commit, dispatch, state }, name) {
    commit("SET_CATALOG_TYPE_VIEW", name);
  },
  setSnackbar({ commit }, snackbar) {
    snackbar.showing = true;
    snackbar.color = snackbar.color || "success";
    commit("SET_SNACKBAR", snackbar);
  },

  async setUserInfo({ commit, dispatch, state }, { connectionid }) {
    // console.log("connectionid", connectionid);

    const userInfo = await this.$api("getUserInfo", {
      connectionid,
    });

    commit("SET_USER_INFO", userInfo);

    // console.log("nuxtServerInit", userInfo);
  },
  async emptyUserInfo({ commit, dispatch, state }) {
    await commit("EMPTY_USER_INFO");
  },

  async loadSubNumenklator({ commit, dispatch, state }, { id }) {
    commit("SET_WAIT_LOAD_NOMENKLATOR", true);

    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    if (
      state.userFilter &&
      state.userFilter.parentguid &&
      state.userFilter.parentguid !== id &&
      id !== null
    ) {
      await commit("OPEN_FILTER", { rows: null });
    }

    const filterParams = [];

    if (
      state.userFilter &&
      state.userFilter.rows &&
      state.userFilter.stateFilter
    ) {
      state.userFilter.stateFilter.forEach((e, i) => {
        if (e && e.length > 0) {
          e.forEach((v, j) => {
            filterParams.push({
              property: state.userFilter.rows[i].property,
              value: state.userFilter.rows[i].arrayprop[v],
            });
          });
        }
      });
    }

    // console.log(id, (state.userFilter && state.userFilter.parentguid) || null);
    if (filterParams.length === 0) {
      const parentguid =
        (state.userFilter && state.userFilter.parentguid) || id;
      const { rows, breadcrumb, seoText, canUseFilter } = await this.$api(
        "getSubNomenklator",
        {
          userid,
          parentguid,
          token,
        }
      );

      commit("SET_SUB_NOMENKLATOR", rows);
      commit("SET_CAN_USE_FILTER", canUseFilter);
      commit("SET_BREAD_CRUMB", breadcrumb);
      commit("SET_SEO_TEXT", seoText);
    } else {
      const { rows } = await this.$api("getSubNomenklatorByFilter", {
        userid,
        parentguid: state.userFilter.parentguid,
        token,
        filterParams,
      });
      // console.log(rows);
      commit("SET_SUB_NOMENKLATOR", rows);
    }
    commit("SET_WAIT_LOAD_NOMENKLATOR", false);
  },
  async setFilterState({ commit, dispatch, state }, { groupFilter }) {
    await commit("SET_FILTER_STATE", { groupFilter });
  },
  async openFilter({ commit, dispatch, state }, { parentguid, fromGroup }) {
    const { rows } = await this.$api("getGroupFilter", {
      parentguid,
    });

    // console.log(parentguid, rows);

    commit("OPEN_FILTER", { rows, parentguid });
  },
  async closeFilter({ commit, dispatch, state }) {
    const id = state.userFilter.parentguid;
    await commit("OPEN_FILTER", { rows: null });
    await dispatch("loadSubNumenklator", { id });
  },
  async loadGoodCard({ commit, dispatch, state }, { id2 }) {
    // commit('SET_WAIT_LOAD_NOMENKLATOR', true)
    // consola.info(id2);
    // const userid = this.$auth.user ? this.$auth.user.id : 1;
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    const {
      rows,
      rowsphoto,
      breadcrumb,
      complects,
      dopcomplects,
    } = await this.$api("getGoodCard", {
      userid,
      synonym: id2,
      token,
    });

    commit("SET_GOOD_CARD", {
      rows,
      rowsphoto,
      breadcrumb,
      complects,
      dopcomplects,
    });

    return rows && rows.length > 0;
  },
  async loadSeoTextMain({ commit, dispatch, state }) {
    const { seoText } = await this.$api("getSeoTextMain");

    commit("SET_SEO_TEXT_MAIN", seoText);
  },
  async getStrucCatalog({ commit, dispatch, state }) {
    const { tree } = await this.$api("getStrucCatalog");

    commit("SET_STRUC_CATALOG", tree);
  },
  async chngeCart({ commit, dispatch, state }, id) {
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    //  consola.info(token);

    // id < 0 case chnge from cardGood
    const obj = id < 0 ? state.goodCard.rows[0] : state.subNomenklator[id];

    const info = {
      guid: obj.guid,
      qty: obj.qty2 || 0,
      price1: obj.price1,
      unit_type_id: obj.unit_type_id,
      userid,
      token,
    };

    // consola.info(info);

    const resOk = await this.$api("chngeCart", info);

    if (resOk === true) {
      obj.qty2 = obj.qty2 === null ? 0 : parseFloat(obj.qty2);

      const qty2eq0 = obj.qty2 === 0;

      commit("SET_NEW_QTY", { id, esc: false });

      await dispatch("refreshCountCart");

      await dispatch("setSnackbar", {
        color: qty2eq0 ? "lightgrey" : "green",
        text: qty2eq0
          ? `Позиция, ${obj.artikul} удалена из корзины.`
          : `Позиция, ${obj.artikul} в кол-ве: ${obj.qty2} доб/изм.`,
        timeout: 3000,
        showing: true,
      });
    } else {
      commit("SET_NEW_QTY", { id, esc: true });

      await dispatch("setSnackbar", {
        color: "red",
        text: `Ошибка по многим разным причинам. Попробуйте позже.`,
        timeout: 3000,
        showing: true,
      });
    }
  },
  async chngeCartFromCart({ commit, dispatch, state }, obj) {
    // изменение по позиции из Корзины ОЧЕНЬ специфично поэтому выделяем в отдельную процедуру
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    const info = {
      guid: obj.guid,
      qty: obj.qty2 || 0,
      price1: obj.price1,
      unit_type_id: obj.unit_type_id,
      userid,
      token,
    };

    // consola.info(info);

    const resOk = await this.$api("chngeCart", info);

    if (resOk === true) {
      obj.qty2 = obj.qty2 === null ? 0 : parseFloat(obj.qty2);

      const qty2eq0 = obj.qty2 === 0;

      commit("SET_NEW_QTY_FROMCART", { id: obj.id, esc: false });

      await dispatch("setSnackbar", {
        color: qty2eq0 ? "lightgrey" : "green",
        text: qty2eq0
          ? `Позиция, ${obj.artikul} удалена из корзины.`
          : `Позиция, ${obj.artikul} в кол-ве: ${obj.qty2} доб/изм.`,
        timeout: 3000,
        showing: true,
      });
    } else {
      commit("SET_NEW_QTY_FROMCART", { id: obj.id, esc: true });

      await dispatch("setSnackbar", {
        color: "red",
        text: `Ошибка по многим разным причинам. Попробуйте позже.`,
        timeout: 3000,
        showing: true,
      });
    }
  },
  async chngeCartFromDopComplect({ commit, dispatch, state }, obj) {
    // изменение по позиции из Доп комплектации так же специфично поэтому выделяем в отдельную процедуру
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    const info = {
      guid: obj.guid,
      qty: parseFloat(obj.qty2) || 0,
      price1: obj.price1,
      unit_type_id: obj.unit_type_id,
      userid,
      token,
    };

    // console.log(info);

    const resOk = await this.$api("chngeCart", info);

    if (resOk === true) {
      obj.qty2 = obj.qty2 === null ? 0 : parseFloat(obj.qty2);

      const qty2eq0 = obj.qty2 === 0;

      commit("SET_NEW_QTY_FROMDOPCOMPLECT", { id: obj.guid, esc: false });

      await dispatch("refreshCountCart");

      await dispatch("setSnackbar", {
        color: qty2eq0 ? "lightgrey" : "green",
        text: qty2eq0
          ? `Позиция, ${obj.artikul} удалена из корзины.`
          : `Позиция, ${obj.artikul} в кол-ве: ${obj.qty2} доб/изм.`,
        timeout: 3000,
        showing: true,
      });
    } else {
      commit("SET_NEW_QTY_FROMDOPCOMPLECT", { id: obj.guid, esc: true });

      await dispatch("setSnackbar", {
        color: "red",
        text: `Ошибка по многим разным причинам. Попробуйте позже.`,
        timeout: 3000,
        showing: true,
      });
    }
  },
  async chngeCartFromOrdersList({ commit, dispatch, state }, obj) {
    // изменение по позиции из Доп комплектации так же специфично поэтому выделяем в отдельную процедуру
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    const info = {
      guid: obj.guid,
      qty: parseFloat(obj.qty) || 0,
      price1: obj.priceCur,
      unit_type_id: obj.unit_type_id,
      userid,
      token,
    };

    // console.log(info);
    // debugger;
    const resOk = await this.$api("chngeCart", info);

    if (resOk === true) {
      obj.qty = obj.qty === null ? 0 : parseFloat(obj.qty);

      const qty2eq0 = obj.qty === 0;

      await dispatch("refreshCountCart");

      await dispatch("setSnackbar", {
        color: qty2eq0 ? "lightgrey" : "green",
        text: qty2eq0
          ? `Позиция, ${obj.artikul} удалена из корзины.`
          : `Позиция, ${obj.artikul} в кол-ве: ${obj.qty} доб/изм.`,
        timeout: 3000,
        showing: true,
      });
    } else {
      await dispatch("setSnackbar", {
        color: "red",
        text: `Ошибка по многим разным причинам. Попробуйте позже.`,
        timeout: 3000,
        showing: true,
      });
    }
  },
  async chngeCartFromExcelLoader({ commit, dispatch, state }, arrayOrderList) {
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    const info = {
      arrayOrderList,
      userid,
      token,
    };

    // console.log(info);
    const { rows } = await this.$api("addCartFromExcel", info);

    await commit("SET_ORDER_LIST_FROM_EXCEL", rows);

    await dispatch("refreshCountCart");

    await dispatch("setSnackbar", {
      color: "green",
      text: "Ваш Заказ успешно загружен. Не найденные позиции в верхней части.",
      timeout: 6000,
      showing: true,
    });
  },
  async refreshCountCart({ commit, dispatch, state }) {
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");
    const rows = await this.$api("getCart", { userid, token });
    // console.log(userid, conntoken)
    commit("SET_COUNT_CART", rows);
  },
  async procOrder(
    { commit, dispatch, state },
    { mister, filial, email, phone, info, mastercard }
  ) {
    let _email = email;
    let _mister = mister;
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");
    if (!email) {
      _email = state.userInfo && state.userInfo.email;
      _mister = _email;
    }
    const infoOrder = {
      mister: _mister,
      filial,
      email: _email,
      phone,
      info,
      userid,
      token,
      mastercard,
    };

    const rows = await this.$api("procOrder", infoOrder);

    return rows;
  },
  async emptyCart({ commit, dispatch, state }) {
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    const info = {
      userid,
      token,
    };

    // console.log(info);
    await this.$api("emptyCart", info);

    await dispatch("refreshCountCart");

    await dispatch("setSnackbar", {
      color: "green",
      text: "Ваша Корзина пуста.",
      timeout: 6000,
      showing: true,
    });
  },
};
