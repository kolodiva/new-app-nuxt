<template>
  <v-app v-scroll="onScroll">
    <v-main>
      <TheAppBar :filials="filials" :show-second-menu="showSecondMenu" />
      <Nuxt />
      <TheFooter :filials="filials" />
    </v-main>
  </v-app>
</template>

<script>
// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
import { mapGetters } from "vuex";
import TheAppBar from "@/components/AppBar/TheAppBar.vue";
import TheFooter from "@/components/AppBar/TheFooter.vue";
export default {
  components: { TheAppBar, TheFooter },
  data: () => ({ showSecondMenu: false }),
  computed: {
    ...mapGetters({
      filials: "headerMenu/getAllSortCity",
    }),
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    // consola.log(this.$store.showBackSpace)
  },
  methods: {
    onScroll() {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      this.showSecondMenu = offsetTop > 100;
    },
  },
  head() {
    return {
      title: "МФ-Комплект",
    };
  },
};
</script>

<style lang="scss"></style>
