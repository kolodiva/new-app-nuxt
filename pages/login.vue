<template lang="html">
  <v-container>
    <v-card flat class="pa-5 mx-auto">
      <div class="headline pb-5">Варианты входа на сайт</div>
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
    async loginUser(loginInfo) {},
  },
};
</script>

<style lang="scss" scoped></style>
