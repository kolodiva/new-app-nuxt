import _ from "lodash";
import header1 from "@/assets/data/header1.json";
import header2 from "@/assets/data/header2.json";
import header3 from "@/assets/data/header3.json";
import addresses from "@/assets/data/addresses.json";
import requisites from "@/assets/data/requisites.json";

export const state = () => ({
  header1: header1.data,
  header2: header2.data,
  header3: header3.data,
  addresses: addresses.address,
  requisites: requisites.requisite,
});

export const getters = {
  getHeader1: (state) => {
    return state.header1;
  },
  getHeader2: (state) => {
    return state.header2;
  },
  getHeader3: (state) => {
    return state.header3;
  },
  getAllSortCity: (state) => {
    const list = _.sortBy(state.addresses, "id");

    _.forEach(list, (v) => {
      v.phone_call = v.phone.replace(/[^0-9||+]/g, "");
    });

    return list;
  },
  getAllSortCityExclMsc: (state) => {
    const list = _.sortBy(state.addresses, "id");

    _.forEach(list, (v) => {
      v.phone_call = v.phone.replace(/[^0-9||+]/g, "");
    });

    list.shift();

    return list;
  },
  getCityNameClassicOrder: (state) => {
    const list = ["МСК", "РНД", "НСБ", "ЕКБ", "КЗН", "СПБ", "КРД"];

    return list;
  },
  getRequisites: (state) => {
    return state.requisites[0];
  },
};
