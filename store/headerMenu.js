import header1 from "@/assets/data/header1.json";

export const state = () => ({
  header1: header1.data,
});

export const getters = {
  getHeader1: (state) => {
    return state.header1;
  },
};
