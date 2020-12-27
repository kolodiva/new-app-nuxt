import Vue from "vue";
import InfiniteLoading from "vue-infinite-loading";

Vue.use(InfiniteLoading, {
  slots: {
    noMore: "Дно достигнуто, данных больше нет", // you can pass a string value
    noResults: "Нет данных для этого раздела", // you can pass a string value
  },
});
