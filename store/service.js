// import _ from "lodash";
import nomenklTopLevelList from "@/assets/data/nomenkl-top-level.json";
// const consola = require("consola");

export const state = () => ({
  showSecondMenu: false,
  slides: "",
  nomenklTopLevel: nomenklTopLevelList.rows,
});

export const mutations = {
  SET_SHOW_SECOND_MENU(state, data) {
    state.showSecondMenu = data;
  },
  SET_SLIDER(state, data) {
    state.slides = data;
  },
};

export const getters = {
  showSecondMenu: (state) => {
    return state.showSecondMenu;
  },
  getSlides: (state) => {
    return state.slides;
  },
  getNomenklTopLevel: (state) => {
    return state.nomenklTopLevel;
  },
};

export const actions = {
  setShowSecondMenu({ commit, dispatch, state }, data) {
    commit("SET_SHOW_SECOND_MENU", data);
  },
  async setSliderSlides({ commit, dispatch, state }) {
    const rows = await this.$api("news", "getNewsBlock");
    // consola.info(rows);
    await commit("SET_SLIDER", rows);
  },
};
