// import _ from "lodash";
import nomenklTopLevelList from "@/assets/data/nomenkl-top-level.json";
// const consola = require("consola");

export const state = () => ({
  slides: "",
  nomenklTopLevel: nomenklTopLevelList.rows,
  windowSize: {
    x: 0,
    y: 0,
  },
  widthLimit: 1000,
  tabCartOrder: null,
  showMainDisclaimer: false,
});

export const mutations = {
  SET_SLIDER(state, data) {
    state.slides = data;
  },
  SET_YOUR_CITY(state, nameCity) {
    state.yourCity = nameCity;
  },
  SET_WINDOW_SIZE(state, { x, y }) {
    state.windowSize = { x, y };
  },
  SET_CART_ORDER_SETTINGS(state, { tabOrders, expandedOrders }) {
    state.tabCartOrder = { tabOrders, expandedOrders };
  },
  SET_EMPTY_CART_ORDER_SETTINGS(state) {
    state.tabCartOrder = null;
  },
  SET_SHOW_MAIN_DISCLAIMER(state, val) {
    state.showMainDisclaimer = val;
  },
};

export const getters = {
  showMainDisclaimer: (state) => {
    return state.showMainDisclaimer;
  },
  showSecondMenu: (state) => {
    return state.showSecondMenu;
  },
  getSlides: (state) => {
    return state.slides;
  },
  getNomenklTopLevel: (state) => {
    return state.nomenklTopLevel;
  },
  getShowLimitWidth: (state) => {
    return state.windowSize.x <= state.widthLimit;
  },
  getDisplayWidth: (state) => {
    return state.windowSize.x;
  },
  getWindowSize: (state) => {
    return state.windowSize;
  },
  getTabCartOrder: (state) => {
    return state.tabCartOrder;
  },
};

export const actions = {
  async setSlider({ commit, dispatch, state }) {
    const rows = await this.$api("getNewsBlock");
    // consola.info(rows);
    await commit("SET_SLIDER", rows);
  },
};
