import Vue from "vue";
import VueCryptojs from "vue-cryptojs";

Vue.use(VueCryptojs);

Vue.prototype.$getCryptoKey = (CryptoJS) => {
  const key1 = CryptoJS.SHA256(
    new Date().getTime().toString() + new Date(1972, 1, 4).getTime().toString()
  ).toString();
  const key2 = CryptoJS.SHA256(key1 + "118540800").toString();

  return { key1, key2 };
};
