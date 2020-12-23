<template>
  <v-container class="" style="min-height: 80vh">
    <div class="headline py-2">Контакты компании МФ-Комплект по филиалам</div>
    <client-only>
      <div id="YMapsID" style="width: 450px; height: 350px"></div>
    </client-only>
  </v-container>
</template>

<script>
// import { mapGetters } from "vuex";
// import { yandexMap } from "vue-yandex-maps";
export default {
  // components: { yandexMap },
  data() {
    return { isMounted: false };
  },
  computed: {},
  mounted() {
    this.isMounted = true;
    // const settings = {
    //   apiKey: "a0730179-856a-47bc-bc4a-eab5cf8d185a",
    //   lang: "ru_RU",
    //   coordorder: "latlong",
    //   version: "2.1",
    // };
    //
    // await loadYmap({ ...settings, debug: true });
    //
    // // console.log(window.ymaps);
    //
    // let myMap = null;
    // if (window.ymaps) {
    window.ymaps.ready(function () {
      const myMap = new window.ymaps.Map(
        "YMapsID",
        {
          center: [55.76, 37.64],
          zoom: 10,
        },

        { searchControlProvider: "yandex#search" }
      );

      myMap.controls.remove("fullscreenControl");

      // console.log(t1);
    });

    // const myMap = new window.ymaps.Map(
    //   "YMapsID",
    //   {
    //     center: [55.944334, 37.336009],
    //     zoom: 10,
    //   },
    //
    //   { searchControlProvider: "yandex#search" }
    // );
    // //
    // console.log(myMap);
    //   // myMap.controls.remove("fullscreenControl");
    // } else {
    //   console.log(myMap);
    // }
  },

  methods: {
    downloadResource(path) {
      window.open(path);
    },
  },
  head: {},
};
</script>

<style scoped>
.ymap-container {
  height: 600px;
}
</style>
