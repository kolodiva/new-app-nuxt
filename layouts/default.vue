<template>
  <v-app v-scroll="onScroll">
    <v-main>
      <TheAppBar
        :show-second-menu="showSecondMenu"
        :loggedin="loggedin"
        @logout="logout"
      />
      <Nuxt />
      <TheFooter />
    </v-main>
    <TheSnackbar />
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
  data: () => ({
    showSecondMenu: false,
    showScrollTop: false,
  }),
  computed: {
    loggedin() {
      return (
        (this.$auth &&
          this.$auth.user !== null &&
          this.$auth.user.name &&
          this.$auth.user.name.length > 0) ||
        false
      );
    },
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
      const username = this.$auth.user.name;

      await this.$auth.logout();

      this.$cookies.remove("connectionid");

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
