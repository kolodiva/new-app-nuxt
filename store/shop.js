// const consola = require("consola");

export const state = () => ({
  showQuickShopDialog: false,
  posQuickShopDialog: null,
});

export const mutations = {
  OPEN_QUICK_SHOP_DIALOG(state, params) {
    state.showQuickShopDialog = true;
    state.posQuickShopDialog = params;
  },
  CLOSE_QUICK_SHOP_DIALOG(state) {
    state.showQuickShopDialog = false;
  },
};

export const getters = {
  showQuickShopDialog: (state) => {
    return state.showQuickShopDialog;
  },
  paramsQuickShopDialog: (state) => {
    return state.posQuickShopDialog;
  },
};

export const actions = {
  async openQuickShopDialog({ commit, dispatch, state }, params) {
    await commit("OPEN_QUICK_SHOP_DIALOG", params);
  },
  async closeQuickShopDialog({ commit, dispatch, state }) {
    await commit("CLOSE_QUICK_SHOP_DIALOG");
  },
};
