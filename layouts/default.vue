<template>
  <v-app v-scroll="onScroll" v-resize="onResize" style="position: relative">
    <!-- End Google Tag Manager (noscript) -->

    <!-- <client-only>
      <let-it-snow v-bind="snowConf" :show="show"></let-it-snow>
    </client-only> -->
    <v-main>
      <TheAppBar
        :show-second-menu="showSecondMenu"
        :user-email="userEmail"
        @logout="logout"
      />

      <Nuxt />
      <TheFooter />
    </v-main>
    <client-only>
      <TheSnackbar :objects.sync="objects"></TheSnackbar>
    </client-only>
    <client-only>
      <v-overlay :value="showMainDisclaimer == 1">
        <v-card light width="700px">
          <div class="pt-5">
            <div
              class="cyan white--text text-center pa-2 px-4 mx-auto"
              style="width: 270px; top: 30px"
            >
              УВАЖАЕМЫЕ ПОКУПАТЕЛИ !
            </div>
          </div>
          <div class="text-center mx-auto mt-5" style="width: 270px">
            Компания "МФ-КОМПЛЕКТ"
          </div>
          <div
            class="text-center mx-auto mt-1 red--text headline font-weight-medium"
            style="width: 270px"
          >
            НЕ РАБОТАЕТ
          </div>
          <div
            class="text-center mx-auto red--text subtitle-2 font-weight-medium"
            style="width: 270px"
          >
            с 31 декабря по 11 января 2021 года!
          </div>
          <v-divider class="mx-auto my-3" style="width: 270px" />
          <div class="text-center mx-auto subtitle-1 font-weight-bold" style="">
            ВСЕ ВАШИ ЗАКАЗЫ ПОПАДУТ В НАШУ СИСТЕМУ ОБРАБОТКИ ЗАКАЗОВ,
          </div>
          <div class="text-center mx-auto subtitle-2" style="">
            но будут обработаны 11 января 2021 года.
          </div>
          <div
            class="text-center mx-auto subtitle-1 font-weight-bold mt-4"
            style=""
          >
            ДОСТАВКА И САМОВЫВОЗ БУДУТ ТАК ЖЕ ОСУЩЕСТВЛЯТЬСЯ
          </div>
          <div class="text-center mx-auto subtitle-2" style="">
            после Новогодних праздников с 11 января 2021 года.
          </div>
          <v-divider class="mx-auto my-3" style="width: 270px" />
          <div class="text-center mx-auto mb-3" style="width: 270px">
            С уважением Ваш, "МФ-КОМПЛЕКТ"
          </div>

          <v-divider />
          <v-card-actions
            ><v-spacer /><v-btn text @click="closeShowMainDisclaimer"
              >Закрыть</v-btn
            ></v-card-actions
          >
          <v-img
            src="/logo_blue_na_fone.png"
            max-width="80"
            style="top: -2px; right: 30px; position: absolute"
          />
          <v-img
            src="/Shariki_NG.png"
            max-width="88"
            style="top: -32px; left: -4px; position: absolute"
          />
        </v-card>
      </v-overlay>
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
      showMainDisclaimer: "service/showMainDisclaimer",
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
    closeShowMainDisclaimer() {
      this.$store.commit("service/SET_SHOW_MAIN_DISCLAIMER", false);
    },
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
    return {
      script: [{ src: "/src/bitrix24.js", body: true }],
    };
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
