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
          property: "og:title",
          content: "Мебельная фурнитура от компании МФ-Комплект.",
          vmid: "og:title",
        },
        {
          name: "description",
          content:
            "Мебельная фурнитура. Наша складская программа, насчитывающая более 5000 наименований продукции, постоянно пополняется с учетом ваших потребностей.",
          vmid: "description",
        },
        {
          name: "keywords",
          content:
            "Мебельная фурнитура МФ-Комплект, кухонная фурнитура, мебельные ручки, DIY",
          vmid: "keywords",
        },
        {
          name: "fragment",
          content: "!",
          vmid: "fragment",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
