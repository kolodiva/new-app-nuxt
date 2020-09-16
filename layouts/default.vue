<template>
  <v-app v-scroll="onScroll">
    <v-main>
      <v-container class="pa-0" fluid>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import TheCucumbers from '@/components/TheCucumbers.vue'

// const consola = require('consola')
export default {
  data: () => ({}),
  computed: {},
  watch: {},
  beforeCreate() {},
  mounted() {
    // consola.log(this.$store.showBackSpace)
  },
  methods: {
    onScroll() {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      this.$store.dispatch("service/setShowSecondMenu", offsetTop > 100);
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
