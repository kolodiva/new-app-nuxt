<template>
  <div>
    <v-app-bar
      v-show="showSecondMenu"
      class="greyMfBckg"
      height="50"
      fixed
      width="100vw"
      dark
    >
      <v-toolbar-title>
        <v-img
          class="pt-5"
          src="logo_small.png"
          max-height="50"
          max-width="90"
          contain
        />
      </v-toolbar-title>
      <TheToolbarItems :header="header3" />
      <v-spacer />
      <v-btn text :class="['buttonMFWhiteColor']"> ГЕО.ИНФ. </v-btn>
    </v-app-bar>
    <v-toolbar height="105" width="100vw" flat>
      <v-toolbar-title>
        <v-img
          class=""
          src="logo_big.png"
          max-height="80"
          max-width="212"
          contain
        />
      </v-toolbar-title>
      <v-spacer />
      <TheToolbarItems :header="header1" />
      <v-spacer />
      <v-btn text class="buttonMFGreyColorBold"> Войти </v-btn>
    </v-toolbar>
    <v-toolbar class="greyMfBckg" height="50" width="100vw">
      <v-spacer />
      <TheToolbarItems :header="header2" :addresses="filials" />
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
  props: ["filials"],
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      header1: "headerMenu/getHeader1",
      header2: "headerMenu/getHeader2",
      header3: "headerMenu/getHeader3",
      showSecondMenu: "service/showSecondMenu",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
