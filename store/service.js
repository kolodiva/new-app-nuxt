// import _ from "lodash";
import nomenklTopLevelList from "@/assets/data/nomenkl-top-level.json";
// const consola = require("consola");

export const state = () => ({
  slides: "",
  nomenklTopLevel: nomenklTopLevelList.rows,
});

export const mutations = {
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
  async setSlider({ commit, dispatch, state }) {
    const rows = await this.$api("news", "getNewsBlock");
    // consola.info(rows);
    await commit("SET_SLIDER", rows);
  },
};
