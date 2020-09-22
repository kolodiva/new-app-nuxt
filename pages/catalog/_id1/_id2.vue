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
        style="border: 1px solid black; height: 100vh"
        ><h2 style="text-align: center">Левый блок</h2></v-col
      >
      <v-col cols="6" style="border: 1px solid black; height: 300vh"
        ><h2 style="text-align: center">Центр</h2></v-col
      >
      <v-col
        cols="3"
        style="border: 1px solid black; height: 70vh"
        class="leftColumn"
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
  data: () => ({}),
  computed: {
    ...mapGetters({
      breadCrumb: "nomenklator/getBreadCrumb",
    }),
  },
  methods: {
    onScroll() {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (offsetTop > 380) {
        $(".leftColumn").css("margin-top", offsetTop - 431 + 50 + "px");
      } else {
        $(".leftColumn").css("margin-top", "0px");
      }
    },
  },
};
</script>

<style lang="" scoped></style>
