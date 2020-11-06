<template lang="html">
  <v-container>
    <v-card flat class="pa-5 mx-auto" height="500">
      <div class="headline pb-5 greyMfText">
        У Вас есть несколько вариантов входа на сайт
      </div>
      <TheUserAuth
        :is-login="isLogin"
        :submit-form="loginUser"
        :chngtypetab="chngtypetab"
      />
    </v-card>
  </v-container>
</template>

<script>
// const consola = require('consola')
export default {
  data() {
    return { isLogin: true, chngtypetab: 0 };
  },
  mounted() {
    // consola.info('test LOGIN')
  },
  methods: {
    async loginUser(loginInfo, app) {
      const userInfo = { email: "", password: "", name: "", phone: "" };

      const { key1, key2 } = this.$getCryptoKey(this.$CryptoJS);

      this.$cookies.set("_keyUser", key1);

      // console.log(key1);

      const ciphertext = this.$CryptoJS.AES.encrypt(
        loginInfo.password,
        key2
      ).toString();

      userInfo.email = loginInfo.email;

      userInfo.phone = loginInfo.phone;

      userInfo.name = loginInfo.name;

      userInfo.password = ciphertext;

      try {
        // const { data } = await this.$api("loginUser", userInfo);

        await this.$auth.loginWith("local", {
          data: userInfo,
        });

        // this.$auth.user.id = data.id;
        // this.$auth.user.email = data.email;
        //
        // this.$auth.setUserToken(key2);

        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "green",
          text: `Спасибо Вам за авторизацию, ${this.$auth.user.name}`,
          timeout: 5000,
        });

        this.$router.push({ path: "/" });

        // console.log(this.$auth);
      } catch (e) {
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: (e.response && e.response.data) || e,
          timeout: 5000,
        });
        if (e.response.status === 404) {
          this.isLogin = false;
          this.chngtypetab = 1 - this.chngtypetab;
          // this.$router.replace('/register')
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
