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
});

export const mutations = {
  SET_SUB_NOMENKLATOR(state, rows) {
    state.subNomenklator = rows;
  },
  SET_GOOD_CARD(state, { rows, rowsphoto, breadcrumb }) {
    state.goodCard = { rows, rowsphoto };
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
    state.strucCatalog = JSON.parse(rows);
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
  SET_SNACKBAR(state, snackbar) {
    state.snackbars = state.snackbars.concat(snackbar);
  },
  SET_USER_INFO(state, userinfo) {
    state.userInfo = userinfo;
  },
  EMPTY_USER_INFO(state) {
    state.userInfo = undefined;
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
  pageHeader: (state) => {
    return state.pageHeader ? state.pageHeader : "*****";
  },
  getSubNomenklator: (state) => {
    return state.subNomenklator;
  },
  getCatalogTypeView: (state) => {
    return state.catalogTypeView;
  },

  getGoodCard: (state) => {
    return state.goodCard.rows[0];
  },
  getGoodCardRowsPhoto: (state) => {
    return state.goodCard.rowsphoto;
  },
  getBreadCrumb: (state) => {
    const pos = [];

    state.breadCrumb.forEach((v) => {
      pos.push({
        text: v.name,
        disable: false,
        href: v.guid === null ? "/" : v.guid,
      });
    });

    return pos;
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
    // const { userid, token } = this.$authinfo(this.$auth);

    // console.log("getSubNomenklator_0_dispatcher");

    // 1 ИСПОЛЬЗУЕМ В КАЧЕСТВЕ ID КЛИЕНТА TOKEN ИЗ GOOKIES ИБО ТАКАЯ ТЕНДЕНЦИЯ ЧТО ПРИ ВЫЗОВЕ ЭТОГО ДИСПАТЧЕРА ПОЧЕМУТО НЕ ВСЕГДА СУЩЕСТВУЕТ $AUTH И ПОЭТОМУ В БОЛЬШ СЛУЧАЕВ В КАЧ ID ИДЕТ 1 (ЕДИНИЦА)
    // ПРИ ЭТОМ ВАЖНО НАСТРОИТЬ  ПОИСК USERID В CONNECTIONS ЧЕРЕЗ ПОИСК USERS ПО ТОКЕНУ И INNER JOIN ПО IDUSER
    // 2 ПРОВЕРИТЬ СК ПО ВРЕМЕНИ ХРАНИТСЯ ОБЪЕКТ $AUTH В COOKIES ЕСТЬ ПОДОЗРЕНИЕ ЧТО В СВЯЗИ С ИСП REFRESH_TOKEN СИСТЕМА СБРАСЫВАЕТ ДАННЫЕ АВТОРИЗАЦИИ ЧЕРЕЗ 30 МИН
    // ЕСЛИ ЭТО ТАК ТО РАССМОТРЕТЬ  ВАРИАНТ С ХРАНИЛИЩЕМ но ЕГО НЕДОСТАТКО ЧТО ЕГО НЕ ВЕЗДЕ МОЖНО ПРОЧИТАТЬ ХОТЯ ЭТО УЧЕНЬ УСЛОВНО

    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");
    const { rows, breadcrumb, seoText } = await this.$api("getSubNomenklator", {
      userid,
      parentguid: id,
      token,
    });

    commit("SET_SUB_NOMENKLATOR", rows);
    commit("SET_BREAD_CRUMB", breadcrumb);
    commit("SET_SEO_TEXT", seoText);
    commit("SET_WAIT_LOAD_NOMENKLATOR", false);
  },
  async loadGoodCard({ commit, dispatch, state }, { id2 }) {
    // commit('SET_WAIT_LOAD_NOMENKLATOR', true)
    // consola.info(id2);
    // const userid = this.$auth.user ? this.$auth.user.id : 1;
    const userid = (state.userInfo && state.userInfo.id) || 1;
    const token = this.$cookies.get("connectionid");

    const { rows, rowsphoto, breadcrumb } = await this.$api("getGoodCard", {
      userid,
      synonym: id2,
      token,
    });

    commit("SET_GOOD_CARD", { rows, rowsphoto, breadcrumb });
  },
  async loadSeoTextMain({ commit, dispatch, state }) {
    const { seoText } = await this.$api("getSeoTextMain");

    commit("SET_SEO_TEXT_MAIN", seoText);
  },
  async getStrucCatalog({ commit, dispatch, state }) {
    const { rows } = await this.$api("getStrucCatalog");

    // consola.log( rows[0].tree );

    commit("SET_STRUC_CATALOG", rows[0].tree);
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
};
