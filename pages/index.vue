<template>
  <div style="">
    <TheVueSlickCarousel />

    <div itemscope itemtype="https://schema.org/Article">
      <link itemprop="mainEntityOfPage" href="https://www.newfurnitura.ru/" />
      <link itemprop="image" href="https://www.newfurnitura.ru/logo_big.png" />
      <meta itemprop="headline name" content="Главная страница сайта" />
      <meta
        itemprop="description"
        content="Мебельная фурнитура. Наша складская программа, насчитывающая более 5000 наименований продукции, постоянно пополняется с учетом ваших потребностей."
      />
      <meta itemprop="author" content="MFKomplekt" />
      <meta
        itemprop="datePublished"
        datetime="2020-12-01"
        content="2020-12-01"
      />
      <meta
        itemprop="dateModified"
        datetime="2020-12-15"
        content="2020-12-15"
      />
      <div
        itemprop="publisher"
        itemscope
        itemtype="https://schema.org/Organization"
      >
        <div
          itemprop="logo"
          itemscope
          itemtype="https://schema.org/ImageObject"
        >
          <img
            itemprop="url image"
            src="https://www.newfurnitura.ru/upload/emblems/mf.png"
            alt="Логотип МФ"
            title=""
            style="display: none"
          />
        </div>
        <meta itemprop="name" content="Мебельная Фурнитура Подрезково" />
        <meta itemprop="telephone" content="+7 (495) 925-26-27" />

        <div
          itemprop="address"
          itemscope="itemscope"
          itemtype="https://schema.org/PostalAddress"
        >
          <meta itemprop="postalCode" content="141446" />
          <meta
            itemprop="addressLocality"
            content="Россия, Московская область, город Химки,"
          />
          <meta
            itemprop="streetAddress"
            content="микрорайон Подрезково, улица Центральная, дом 2/5"
          />
        </div>
      </div>
      <span itemprop="articleBody">
        <TheCatalogTopLevel />
      </span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },

  mounted() {},

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
