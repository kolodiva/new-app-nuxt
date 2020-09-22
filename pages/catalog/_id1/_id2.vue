<template>
  <div v-scroll="onScroll">
    <TheBreadCrumbs :bread-crumb="breadCrumb" />
    <v-row style="height: 200px; border: 1px solid black" align="center"
      ><v-col><h2 style="text-align: center">Заголовок</h2></v-col></v-row
    >
    <v-row style="border: 1px solid black"
      ><v-col
        class="leftColumn"
        cols="3"
        style="border: 1px solid black; height: calc(100vh - 50px)"
        ><v-row class="fill-height"
          ><v-col class="blockInfoCol">
            <h2 style="text-align: center">Левый блок</h2>
          </v-col></v-row
        >
      </v-col>
      <v-col cols="6" style="border: 1px solid black" class="menuHeader3"
        ><h2 v-for="(i, id) in 150" :key="id" style="text-align: center">
          Центр
        </h2></v-col
      >
      <v-col
        cols="3"
        style="border: 1px solid black; height: calc(100vh - 50px)"
        class="rightColumn"
        ><h2 style="text-align: center">Правый блок</h2></v-col
      >
    </v-row>

    <TheBreadCrumbs :bread-crumb="breadCrumb" />
  </div>
</template>

<script>
import $ from "jquery";
import { mapGetters } from "vuex";
import TheBreadCrumbs from "@/components/Service/TheBreadCrumbs.vue";
// const consola = require("consola");
export default {
  components: { TheBreadCrumbs },
  data: () => ({ posSwitchLeftRightPanel: 0 }),
  computed: {
    ...mapGetters({
      breadCrumb: "nomenklator/getBreadCrumb",
    }),
  },
  mounted() {},
  methods: {
    onScroll() {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const elLeft = $(".leftColumn")[0];
      const elCenter = $(".menuHeader3")[0];
      const elRight = $(".leftColumn")[0];
      const posBoundLeft = elLeft.getBoundingClientRect();
      const posBoundCenter = elCenter.getBoundingClientRect();
      // const posBoundRight = elRight.getBoundingClientRect();
      const curHeight = elCenter.offsetTop;

      // const blockInfo = $("div.blockInfoCol")[0];

      // consola.info(el2.offsetTop + el2.offsetHeight);
      // consola.info(el2.offsetTop + el2.offsetHeigth);
      // consola.info(el.offsetTop + el.offsetHeight);

      if (posBoundCenter.top < 51) {
        if (
          elLeft.offsetTop + elLeft.offsetHeight >
          elCenter.offsetTop + elCenter.offsetHeight
        ) {
          $(".leftColumn").css(
            "margin-top",
            elCenter.offsetTop +
              elCenter.offsetHeight -
              elLeft.offsetHeight -
              curHeight +
              "px"
          );
          $(".rightColumn").css(
            "margin-top",
            elCenter.offsetTop +
              elCenter.offsetHeight -
              elRight.offsetHeight -
              curHeight +
              "px"
          );
        } else if (
          elLeft.offsetTop + elLeft.offsetHeight ===
            elCenter.offsetTop + elCenter.offsetHeight &&
          posBoundLeft.top <= 50
        ) {
          // blockInfo.style.alignSelf = "flex-end";
          // elLeft.style.height = elLeft.offsetHeight;
        } else {
          // blockInfo.style.alignSelf = "";
          $(".leftColumn").css("margin-top", offsetTop - curHeight + 50 + "px");
          $(".rightColumn").css(
            "margin-top",
            offsetTop - curHeight + 50 + "px"
          );
        }
      } else {
        $(".leftColumn").css("margin-top", "0px");
        $(".rightColumn").css("margin-top", "0px");
      }
    },
  },
};
</script>

<style lang="" scoped></style>
