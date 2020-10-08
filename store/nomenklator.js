// import _ from 'lodash'

// import { getData } from '@/utils/store-utils'

// const consola = require("consola");

// import _ from 'lodash'

export const state = () => ({
  subNomenklator: [],
  breadCrumb: [],
  pageHeader: "",
  seoText: "",
  seoTextMain: "",
  waitNomenklatorLoad: undefined,
});

export const mutations = {
  SET_SUB_NOMENKLATOR(state, rows) {
    state.subNomenklator = rows;
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
};

export const actions = {
  async loadSubNumenklator({ commit, dispatch, state }, { id }) {
    commit("SET_WAIT_LOAD_NOMENKLATOR", true);
    const userid = 1;
    const { rows, breadcrumb, seoText } = await this.$api(
      "nomenklator",
      "getSubNomenklator",
      {
        userid,
        parentguid: id,
        connectionid: "",
      }
    );

    commit("SET_SUB_NOMENKLATOR", rows);
    commit("SET_BREAD_CRUMB", breadcrumb);
    commit("SET_SEO_TEXT", seoText);
    commit("SET_WAIT_LOAD_NOMENKLATOR", false);
  },
  async loadSeoTextMain({ commit, dispatch, state }) {
    const { seoText } = await this.$api("nomenklator", "getSeoTextMain");

    commit("SET_SEO_TEXT_MAIN", seoText);
  },
};
