// const consola = require('consola')
export const strict = false;

export const actions = {
  async nuxtServerInit({ dispatch, commit }, { req }) {
    await dispatch("service/setSlider");
    await dispatch("nomenklator/loadSeoTextMain");
    await dispatch("nomenklator/getStrucCatalog");

    const connectionid = this.$cookies.get("connectionid");
    await dispatch("nomenklator/setUserInfo", { connectionid });
    await dispatch("nomenklator/refreshCountCart");
  },
};
