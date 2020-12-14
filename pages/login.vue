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
        :recovery-code="recoveryCode"
      />
    </v-card>
  </v-container>
</template>

<script>
// const consola = require('consola')
export default {
  middleware: ["auth-props"],
  data() {
    return { isLogin: true, chngtypetab: 0, recoveryCode: 0 };
  },
  mounted() {
    // consola.info('test LOGIN')
  },
  methods: {
    async loginUser(loginInfo, tOper = 1) {
      const { key1, key2 } = this.$getCryptoKey(this.$CryptoJS);

      this.$cookies.set("_keyUser", key1);

      // console.log(key1);

      const ciphertext = this.$CryptoJS.AES.encrypt(
        loginInfo.password,
        key2
      ).toString();

      const userInfo = { ...loginInfo };

      // console.log(userInfo);

      userInfo.password = ciphertext;

      userInfo.token = this.$cookies.get("connectionid");

      userInfo.recovCode = parseInt(userInfo.recovCode.toString().trim());

      userInfo.email = userInfo.email.toLowerCase().trim();

      if (tOper === 1) {
        try {
          const connectionid = await this.$api("loginUser", userInfo);

          await this.$store.dispatch("nomenklator/setUserInfo", {
            connectionid,
          });

          await this.$store.dispatch("nomenklator/refreshCountCart");

          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "green",
            text: `Приветствуем Вас, ${loginInfo.email}`,
            timeout: 5000,
          });
          this.$router.replace({ path: "/" });
        } catch (e) {
          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "red",
            text: (e.response && e.response.data) || e.response,
            timeout: 5000,
          });
          if (e.response.status === 404) {
            this.isLogin = false;
            this.chngtypetab = 1 - this.chngtypetab;
            // this.$router.replace('/register')
          }
        }
      } else if (tOper === 2) {
        try {
          userInfo.password = this.$CryptoJS
            .SHA256(loginInfo.password)
            .toString();
          // console.log(userInfo.password);

          const connectionid = await this.$api("addNewUser", userInfo);

          // console.log(connectionid);

          // console.log(data);
          await this.$store.dispatch("nomenklator/setUserInfo", {
            connectionid,
          });

          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "green",
            text: `Спасибо Вам за Регистрацию, ${loginInfo.email}`,
            timeout: 5000,
          });
          //
          // await this.$store.dispatch('nomenklator/refreshCountCart')
          //
          this.$router.replace("/");
        } catch (e) {
          // consola.info(e.response.data)
          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "error",
            text: `Ошибка при попытке регистрации: ${
              (e.response && e.response.data) || e.response
            }`,
            timeout: 5000,
          });
        }
      } else if (tOper === 3) {
        if (this.recoveryCode === 0) {
          try {
            this.recoveryCode = await this.$api(
              "recoveryUserPassword",
              userInfo
            );

            await this.$store.dispatch("nomenklator/setSnackbar", {
              color: "green",
              text:
                "Ссылка для восстановления Пароля отправлена Вам на почту по адресу: " +
                loginInfo.email,
              timeout: 5000,
            });
          } catch (e) {
            console.log(e);
            await this.$store.dispatch("nomenklator/setSnackbar", {
              color: "red",
              text: (e.response && e.response.data) || e.response,
              timeout: 5000,
            });
            if (e && e.response && e.response.status === 404) {
              this.isLogin = false;
              this.chngtypetab = 1 - this.chngtypetab;
            }
          }
        } else {
          try {
            userInfo.passwordnew = this.$CryptoJS
              .SHA256(loginInfo.passwordnew)
              .toString();

            await this.$api("changeUserPassword", userInfo);

            await this.$store.dispatch("nomenklator/setSnackbar", {
              color: "green",
              text:
                "Пароль для пользователя : " +
                loginInfo.email +
                " успешно изменен. Вы можете войти в личный кабинет с новым паролем.",
              timeout: 5000,
            });
            this.recoveryCode = 0;
            this.isLogin = true;
            this.chngtypetab = 1 - this.chngtypetab;
            // this.$router.push({ path: "/login" });
          } catch (e) {
            console.log(e);
            await this.$store.dispatch("nomenklator/setSnackbar", {
              color: "red",
              text: (e.response && e.response.data) || e.response,
              timeout: 5000,
            });
            if (e && e.response && e.response.status === 404) {
              this.isLogin = false;
              this.chngtypetab = 1 - this.chngtypetab;
              // this.$router.replace('/register')
            }
          }
        }
      }

      // console.log(this.$auth);
    },
  },
};
</script>

<style lang="scss" scoped></style>
