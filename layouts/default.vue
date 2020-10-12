<template>
  <v-app v-scroll="onScroll">
    <v-main>
      <TheAppBar :show-second-menu="showSecondMenu" />
      <Nuxt />
      <TheFooter />
    </v-main>
    <v-fab-transition>
      <v-btn
        v-show="showScrollTop"
        color="blue"
        ripple
        dark
        fab
        fixed
        bottom
        small
        left
        @click="$vuetify.goTo('#app', { duration: 500, offset: 0 })"
      >
        <v-icon>mdi-chevron-up</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  data: () => ({ showSecondMenu: false, showScrollTop: false }),
  watch: {},
  beforeCreate() {},
  mounted() {},
  methods: {
    onScroll() {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      this.showSecondMenu = offsetTop > 100;
      this.showScrollTop = offsetTop > 250;
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
