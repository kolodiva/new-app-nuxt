<template>
  <v-app v-scroll="onScroll">
    <v-main>
      <TheAppBar
        :show-second-menu="showSecondMenu"
        :user-email="userEmail"
        @logout="logout"
      />
      <Nuxt />
      <TheFooter />
    </v-main>
    <v-snackbar
      v-for="(snackbar, index) in snackbars.filter((s) => s.showing)"
      :key="snackbar.text + Math.random()"
      v-model="snackbar.showing"
      :timeout="snackbar.timeout"
      :color="snackbar.color"
      :style="`bottom: ${index * 60 + 8}px;`"
      class="body-2"
    >
      {{ snackbar.text }}

      <v-btn text @click="snackbar.showing = false">Закрыть</v-btn>
    </v-snackbar>
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
import { mapGetters } from "vuex";
import { mapState } from "vuex";
export default {
  data: () => ({
    showSecondMenu: false,
    showScrollTop: false,
  }),
  computed: {
    ...mapGetters({
      userEmail: "nomenklator/getUserInfoEmail",
    }),
    ...mapState({
      snackbars: (state) => state.nomenklator.snackbars,
    }),
  },
  watch: {},
  beforeCreate() {},
  mounted() {
    this.setCityName();
  },
  methods: {
    onScroll() {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      this.showSecondMenu = offsetTop > 100;
      this.showScrollTop = offsetTop > 250;
    },
    setCityName() {
      window.ymaps.ready(function () {
        const geolocation = window.ymaps.geolocation;

        geolocation
          .get({
            provider: "yandex",

            apikey:
              "AHrt3VkBAAAA8BlbBgIAZrCxDUN8-eQCHoslyWSOxn4f9BsAAAAAAAAAAAC8q4yumY24XBwVMQ3SeWvWgcbYnw==",
          })
          .then(
            function (res, _this) {
              const nameCity = res.geoObjects.get(0).properties.get("name");
              // const descr = res.geoObjects.get(0).properties.get("description");

              // console.log(this.geoSityName);

              // console.log(nameCity);

              // console.log(_this);

              window.$("#yourCity").html(nameCity);
              // await this.$store.dispatch("service/setYourCityName", nameCity);
            },
            function (e) {
              // await this.$store.dispatch("service/setYourCityName", "");

              console.log(e);

              // console.log(e)
            }
          );
      });
    },
    async logout() {
      const username = this.userEmail;

      this.$cookies.remove("connectionid");

      await this.$store.commit("nomenklator/EMPTY_USER_INFO");

      this.$store.dispatch("nomenklator/setSnackbar", {
        color: "green",
        text: `До свидания, ${username}`,
        timeout: 5000,
      });
      this.$router.push({ path: "/" });
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
