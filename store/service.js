// const consola = require("consola");

export const state = () => ({
  showSecondMenu: false,
  slides: [],
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
