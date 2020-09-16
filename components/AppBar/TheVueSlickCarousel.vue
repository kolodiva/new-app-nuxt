<template>
  <VueSlickCarousel v-bind="options" style="margin-top: 20px">
    <v-img
      v-for="(item, i) in slidesLst"
      :key="i"
      :src="`https://newfurnitura.ru/news/${item.pic}`"
      :height="hgt"
      contain
    />
  </VueSlickCarousel>
</template>

<script>
import { mapGetters } from "vuex";

import VueSlickCarousel from "vue-slick-carousel";

import "vue-slick-carousel/dist/vue-slick-carousel.css";
// optional style for arrows & dots
import "@/assets/style/_vue-slick-carousel-theme.css";

export default {
  name: "SlickSlider",
  components: { VueSlickCarousel },
  data() {
    return {
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
        responsive: [
          {
            breakpoint: 1700,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          {
            breakpoint: 1000,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
              infinite: true,
              dots: true,
            },
          },
          // You can unslick at a given breakpoint now by adding:
          // settings: "unslick"
          // instead of a settings object
        ],
      },
    };
  },
  computed: {
    ...mapGetters({
      slidesLst: "service/getSlides",
    }),
  },
};
</script>

<style scoped></style>
