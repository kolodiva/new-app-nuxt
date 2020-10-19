<template lang="html">
  <v-container>
    <div itemprop="articleBody">
      <div class="container">
        <script></script>
        <div id="forpvz" style="width: 100%; height: 600px"></div>
        <div id="service_message"></div>
      </div>
    </div>
  </v-container>
</template>

<script>
// const consola = require('consola')
export default {
  data() {
    return { isLogin: true };
  },
  mounted() {
    this.$nextTick(function () {
      const ourWidjet = new window.ISDEKWidjet({
        defaultCity: "Новосибирск", // какой город отображается по умолчанию
        cityFrom: "Омск", // из какого города будет идти доставка
        country: "Россия", // можно выбрать страну, для которой отображать список ПВЗ
        link: "forpvz", // id элемента страницы, в который будет вписан виджет
        // servicepath: "https://kolodiva.com/widget/scripts/service.php", // ссылка на файл service.php на вашем сайте
      });
      this.$hello(ourWidjet);
    });
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
