<template>
  <div>
    <TheVueSlickCarousel />
    <TheCatalogTopLevel />
  </div>
</template>

<script>
export default {
  head() {
    return {
      meta: [
        {
          name: "description",
          content:
            "Мебельная фурнитура. Наша складская программа, насчитывающая более 5000 наименований продукции, постоянно пополняется с учетом ваших потребностей.",
          hid: "description",
        },
        {
          name: "keywords",
          content:
            "Мебельная фурнитура МФ-Комплект, кухонная фурнитура, мебельные ручки, DIY",
          hid: "keywords",
        },
        {
          name: "fragment",
          content: "!",
          hid: "fragment",
        },
        {
          property: "og:title",
          content: "Мебельная фурнитура от компании МФ-Комплект.",
          hid: "og:title",
        },
        {
          property: "og:description",
          content:
            "Мебельная фурнитура. Наша складская программа, насчитывающая более 5000 наименований продукции, постоянно пополняется с учетом ваших потребностей.",
          hid: "og:description",
        },
        {
          property: "og:url",
          content: "https://www.newfurnitura.ru",
          hid: "og:url",
        },
        {
          property: "og:type",
          content: "website",
          hid: "og:type",
        },
        {
          property: "og:site_name",
          content: "Мебельная фурнитура Подрезково",
          hid: "og:site_name",
        },
        {
          property: "og:locale",
          content: "ru_RU",
          hid: "og:locale",
        },
        {
          property: "og:update_time",
          content: "2020-12-19T18:45:15+03:00",
          hid: "og:update_time",
        },
        {
          property: "og:image:type",
          content: "image/jpeg",
          hid: "og:image:type",
        },
        {
          property: "og:image",
          content: "/logo_big.png",
          hid: "og:image",
        },
        {
          property: "og:image:alt",
          content: "Логотип компании",
          hid: "og:image:alt",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
