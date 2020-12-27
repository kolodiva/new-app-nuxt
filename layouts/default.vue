<template>
  <v-app v-scroll="onScroll" v-resize="onResize" style="position: relative">
    <!-- <client-only>
      <let-it-snow v-bind="snowConf" :show="show"></let-it-snow>
    </client-only> -->
    <v-main>
      <TheAppBar
        :show-second-menu="showSecondMenu"
        :user-email="userEmail"
        @logout="logout"
      />

      <client-only>
        <!-- Google Tag Manager (noscript) -->
        <noscript
          ><iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-59444LN"
            height="0"
            width="0"
            style="display: none; visibility: hidden"
          ></iframe
        ></noscript>
        <!-- End Google Tag Manager (noscript) -->
      </client-only>

      <Nuxt />
      <TheFooter />

      <client-only>
        <script>
          (function (w, d, u) {
            var s = d.createElement("script");
            s.async = true;
            s.src = u + "?" + ((Date.now() / 60000) | 0);
            var h = d.getElementsByTagName("script")[0];
            h.parentNode.insertBefore(s, h);
          })(
            window,
            document,
            "https://cdn-ru.bitrix24.ru/b13663838/crm/site_button/loader_2_73qubw.js"
          );
        </script>
      </client-only>
    </v-main>
    <client-only>
      <TheSnackbar :objects.sync="objects"></TheSnackbar>
    </client-only>
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
export default {
  data: () => ({
    showSecondMenu: false,
    showScrollTop: false,
    objects: [],
    transitions: ["fab-transition", "scale-transition", "fade-transition"],
    // snowConf: {
    //   windPower: 1,
    //   interaction: true,
    //   speed: 1,
    //   count: 24,
    //   size: 10,
    //   opacity: 1,
    //   images: [
    //     "https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/snow.png",
    //     "https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/sock.png",
    //     "https://raw.githubusercontent.com/bob-chen/let_it_snow/master/demo/tree.png",
    //     "/favicon.ico",
    //   ],
    // },
    // show: false,
  }),
  computed: {
    ...mapGetters({
      userEmail: "nomenklator/getUserInfoEmail",
      snackbars: "nomenklator/getSnackbars",
      windowSize: "service/getWindowSize",
    }),
  },
  watch: {
    snackbars(v) {
      const msgs = this.snackbars || [];
      if (msgs.length > 0) {
        const el = msgs[0];
        this.objects.push({
          message: el.text,
          bottom: true,
          color: el.color,
          transition: this.transitions[0],
          timeout: el.timeout,
        });
      }
    },
  },
  beforeCreate() {},
  async mounted() {
    this.setCityName();
    this.onResize();

    const connectionid = this.$cookies.get("connectionid");

    if (!this.userEmail && connectionid) {
      await this.$store.dispatch("nomenklator/setUserInfo", { connectionid });
      await this.$store.dispatch("nomenklator/refreshCountCart");
    }

    // setTimeout(() => {
    //   this.show = true;
    // }, 1000);
  },
  methods: {
    onScroll() {
      const offsetTop =
        window.pageYOffset || document.documentElement.scrollTop;
      this.showSecondMenu = offsetTop > 100;
      this.showScrollTop = offsetTop > 250;
    },
    async onResize() {
      if (
        this.windowSize.x !== window.innerWidth ||
        this.windowSize.y !== window.innerHeight
      ) {
        await this.$store.commit("service/SET_WINDOW_SIZE", {
          x: window.innerWidth,
          y: window.innerHeight,
        });
      }
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

      await this.$store.dispatch("nomenklator/refreshCountCart");

      this.$store.dispatch("nomenklator/setSnackbar", {
        color: "green",
        text: `До свидания, ${username}`,
        timeout: 5000,
      });
      this.$router.push({ path: "/" });
    },
  },
  head() {
    return {};
  },
};
</script>

<style lang="scss">
body,
html {
  max-width: 100%;
  overflow-x: hidden;
}
</style>
