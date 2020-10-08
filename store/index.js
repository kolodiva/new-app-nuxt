// const consola = require('consola')
export const strict = false;

export const actions = {
  async nuxtServerInit({ dispatch }, { req }) {
    await dispatch("service/setSlider");
    await dispatch("nomenklator/loadSeoTextMain");
  },
};
