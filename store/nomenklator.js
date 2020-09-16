// import _ from 'lodash'

// import { getData } from '@/utils/store-utils'

// const consola = require('consola')

// import _ from 'lodash'

export const state = () => ({
  subNomenklator: [],
  breadCrumb: [],
  waitNomenklatorLoad: undefined,
});

export const mutations = {
  SET_SUB_NOMENKLATOR(state, rows) {
    state.subNomenklator = rows;
  },
  SET_BREAD_CRUMB(state, rows) {
    state.breadCrumb = rows;
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
  getSubNomenklator: (state) => {
    return state.subNomenklator;
  },
};

export const actions = {
  async loadSubNumenklator({ commit, dispatch, state }, { id }) {
    commit("SET_WAIT_LOAD_NOMENKLATOR", true);
    const userid = 1;
    const { rows, breadcrumb } = await this.$api(
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
    commit("SET_WAIT_LOAD_NOMENKLATOR", false);
  },
};
