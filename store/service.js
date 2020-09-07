export const state = () => ({
  showSecondMenu: false,
});

export const mutations = {
  SET_SHOW_SECOND_MENU(state, data) {
    state.showSecondMenu = data;
  },
};

export const getters = {
  showSecondMenu: (state) => {
    return state.showSecondMenu;
  },
};

export const actions = {
  setShowSecondMenu({ commit, dispatch, state }, data) {
    commit("SET_SHOW_SECOND_MENU", data);
  },
};
