<template>
  <div class="text-center mt-3">
    <h3>Любые обрамления по желанию Заказчика</h3>
    <h4>
      Вставка тегов в HEAD и BODY которые должен заполнить Глеб по данными
      Володи SEO
    </h4>
    <h5>
      На практике все намного проще. Наводите курсор на страницу появится Лупа
      нажимаете Левую кнопку появл РУЧОНКА ей влево вправо
    </h5>
    <client-only>
      <flipbook
        class="flipbook"
        :pages="[
          '/test/Proba1.jpg',
          '/test/Proba2.jpg',
          '/test/Proba3.jpg',
          '/test/Proba4.jpg',
        ]"
      ></flipbook>
    </client-only>
  </div>
</template>

<script>
export default {
  layout: "test",
  mounted() {},

  head() {
    return {
      title: `Невероятные перелистывания`,

      meta: [
        {
          name: "description",
          content: `Купить в Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар `,
        },
        {
          property: "og:type",
          content: "Большой ассортимент и выгодные цены 👍:",
        },
        {
          property: "og:title",
          content: `Лучшая цена 👍:  ⭐ ⭐ ⭐ ⭐ ⭐`,
          body: true,
        },
        {
          name: "og:description",
          content: ` руб., купить в Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар (стоимость мелкий опт руб.). Доставка во все города РФ. Оптовые цены и скидки, акции, распродажи в Интернет магазине мебельной фурнитуры МФ-Комплект`,
          body: true,
        },
        {
          name: "og:url",
          content: `/catalog/`,
          body: true,
        },
        {
          name: "og:type",
          content: `website`,
          body: true,
        },
        {
          name: "og:image",
          content: ``,
          body: true,
        },
      ],
    };
  },
};
</script>

<style scoped>
.flipbook {
  width: 90vw;
  height: 80vh;
}
</style>
