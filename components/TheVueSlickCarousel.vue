<template>
  <VueSlickCarousel v-bind="options" style="margin-top: 20px">
    <v-img
      v-for="(item, i) in img_lst"
      :key="i"
      :src="`https://newfurnitura.ru/news/${item}`"
      :height="hgt"
      contain
    />
  </VueSlickCarousel>
</template>

<script>
import VueSlickCarousel from "vue-slick-carousel";

import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "@/assets/style/_vue-slick-carousel-theme.css";

export default {
  name: "SlickSlider",
  components: { VueSlickCarousel },
  data() {
    return {
      img_lst: [
        "pic2_postfix_8ImO0hqpDH0_c3ovJJaG-Q.jpg",
        "pic2_postfix_4miK6QJHtRxzGKJ332LqCQ.jpg",
        "pic2_postfix_jT4Z1inTXSgWoXLSSDg6Vg.jpg",
        "pic2_postfix_-GM_nE2tCWx_wcOz5VBgpQ.jpg",
        "pic2_postfix_spCFxOW9Uznrw2CRVIsBEg.jpg",
        "pic2_postfix_-uSrPKb5bCPIuGDl7mZuJQ.jpg",
        "pic2_postfix_jSXPYGWU9zhgA_wN_UjIrQ.jpg",
        "pic2_postfix_BZlfgEVlgg_NN1QZtFZ2eQ.jpg",
        "pic2_postfix_YSqM-UVaegaRXdrVwPJDhQ.jpg",
        "pic2_postfix_ScFhAQevPWDeVpYSDioATA.jpg",
        "pic2_postfix_-itmv4OuuqrmtwrZPiTkPg.jpg",
        "pic2_postfix_xEsgkzRXVojgIjOjN_Dg1w.jpg",
      ],
      hgt: "320",
      options: {
        arrows: true,
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 2000,
        cssEase: "linear",
        pauseOnDotsHover: true,
        pauseOnFocus: true,
        pauseOnHover: true,
        focusOnSelect: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        // touchThreshold: 1,
      },
    };
  },
};
</script>

<style scoped></style>
