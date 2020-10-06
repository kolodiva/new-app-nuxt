<template>
  <v-app v-scroll="onScroll">
    <v-main>
      <TheAppBar :show-second-menu="showSecondMenu" />
      <Nuxt />
      <TheFooter />
    </v-main>
  </v-app>
</template>

<script>
// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  data: () => ({ showSecondMenu: false }),
  watch: {},
  beforeCreate() {},
  mounted() {},
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
