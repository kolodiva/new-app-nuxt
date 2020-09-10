<template>
  <div>
    <v-app-bar
      v-show="showSecondMenu"
      class="greyMfBckg"
      height="50"
      fixed
      width="100%"
      dark
    >
      <v-toolbar-title>
        <img
          src="logo_small.png"
          style="height: 50; width: 90; padding-top: 5px"
        />
      </v-toolbar-title>
      <TheToolbarItems :header="header3" />
      <v-spacer />
      <v-btn text :class="['buttonMFWhiteColor']"> ГЕО.ИНФ. </v-btn>
    </v-app-bar>
    <v-toolbar height="105" flat>
      <v-toolbar-title>
        <img src="logo_big.png" style="height: 80; width: 212" />
      </v-toolbar-title>
      <v-spacer />
      <TheToolbarItems :header="header1" />
      <v-spacer />
      <v-btn text class="buttonMFGreyColorBold"> Войти </v-btn>
    </v-toolbar>
    <v-toolbar class="greyMfBckg" height="50">
      <v-spacer />
      <TheToolbarItems :header="header2" :addresses="addresses" />
      <v-spacer />
      <v-btn text :class="[header2.css_class]"> КОРЗИНА </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheToolbarItems from "./TheToolbarItems.vue";

export default {
  components: { TheToolbarItems },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      header1: "headerMenu/getHeader1",
      header2: "headerMenu/getHeader2",
      header3: "headerMenu/getHeader3",
      addresses: "headerMenu/getAllSortCity",
      showSecondMenu: "service/showSecondMenu",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
