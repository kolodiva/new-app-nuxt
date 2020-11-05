<template lang="html">
  <v-container>
    <v-card flat class="pa-5 mx-auto" height="500">
      <div class="headline pb-5 greyMfText">
        У Вас есть несколько вариантов входа на сайт
      </div>
      <TheUserAuth
        :button-text="isLogin ? 'Войти' : 'Зарегистрироваться'"
        :submit-form="loginUser"
        :has-name="!isLogin"
      />
    </v-card>
  </v-container>
</template>

<script>
// const consola = require('consola')
export default {
  data() {
    return { isLogin: true };
  },
  mounted() {
    // consola.info('test LOGIN')
  },
  methods: {
    async loginUser(loginInfo, app) {
      const userInfo = { email: "", password: "", name: "", phone: "" };

      const { key1, key2 } = this.$getCryptoKey(this.$CryptoJS);

      // this.$auth.$storage.setCookie("_keyUser", key1);

      // this.$hello(key1);

      this.$cookies.set("_keyUser", key1);

      const ciphertext = this.$CryptoJS.AES.encrypt(
        loginInfo.password,
        key2
      ).toString();

      userInfo.email = loginInfo.email;

      userInfo.phone = loginInfo.phone;

      userInfo.name = loginInfo.name;

      userInfo.password = ciphertext;

      this.$auth.setUserToken(key1);

      const res = await this.$api("loginUser", userInfo);

      console.log(res);
    },
  },
};
</script>

<style lang="scss" scoped></style>
