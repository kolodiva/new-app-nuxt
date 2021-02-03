<template>
  <div>
    <TheBreadCrumbs microdata="true" />

    <div itemscope itemtype="https://schema.org/Article">
      <link itemprop="mainEntityOfPage" href="https://www.newfurnitura.ru/" />
      <link itemprop="image" href="https://www.newfurnitura.ru/logo_big.png" />
      <meta itemprop="headline name" content="Главная страница сайта" />
      <meta
        itemprop="description"
        :content="
          getDescription
            ? getDescription.intrnt_microdata.description
            : 'Мебельная фурнитура. Наша складская программа, насчитывающая более 5000 наименований продукции, постоянно пополняется с учетом ваших потребностей.'
        "
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
      <TheSchemaOrganization />
      <TheTextInfo v-if="isGroup" />
      <ThePageHeader />

      <span v-if="isGroup">
        <TheSubNomenklator />
      </span>
      <span v-else itemprop="articleBody">
        <TheGoodsList />
      </span>
    </div>

    <TheBreadCrumbs />
    <!-- <TheBreadCrumbs2 /> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async fetch({ app, params, query, store }) {
    if (params && params.id) {
      await store.dispatch("nomenklator/loadSubNumenklator", params);
    }
  },

  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      isGroup: "nomenklator/isGroup",
      getDescription: "nomenklator/getHeaderDescription",
    }),
  },
  beforeCreate() {},

  mounted() {
    window.$("article").moreContent({
      height: 150,
      speed: 500,
      shadow: true,
      // useCss: true,
      // tpl: {
      //   btn: '<button class="mrc-btn" style="cursor: pointer"></button>',
      //   btnWrap: '<div class="mrc-btn-wrap" ></div>',
      // },
    });
    window.$("div.mrc-btn-wrap").css("text-align", "end");
    window.$("button.mrc-btn").css("outline", "none");
  },
  methods: {},
  head() {
    return {
      title: `${this.getDescription.intrnt_microdata.title} - Купить в Москва, Санкт-Петербург, Казань, Екатеринбург, Ростов-на-Дону, Краснодар | Описание, фото, характеристики, цены в Интернет магазине МФ-Комплект`,
      meta: [
        {
          name: "description",
          content: `${this.getDescription.intrnt_microdata.description}`,
        },
        {
          name: "og:title",
          content: `Лучшая цена 👍: ${this.getDescription.intrnt_microdata.title} ⭐ ⭐ ⭐ ⭐ ⭐`,
        },
        {
          name: "og:description",
          content: `Лучшая цена 👍: ${this.getDescription.intrnt_microdata.description} ⭐ ⭐ ⭐ ⭐ ⭐`,
        },
        {
          name: "og:site_name",
          content: `Мебельная фурнитура Подрезково`,
        },
        {
          name: "og:url",
          content: `https://newfurnitura.ru/catalog/${this.getDescription.guid}`,
        },
        {
          name: "og:type",
          content: `website`,
        },
        {
          name: "og:image",
          content: `${this.getDescription.guid_picture.replace(
            "_250x250",
            ""
          )}`,
        },
      ],
    };
  },
};
</script>

<style>
.mrc-shadow {
  pointer-events: none;
  position: absolute;
  height: 70px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: linear-gradient(to top, #fff 14%, rgba(0, 0, 0, 0) 100%);
}
</style>
