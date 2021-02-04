<template>
  <div itemprop="author" itemscope itemtype="https://schema.org/Organization">
    <meta itemprop="name" content="Мебельная Фурнитура Подрезково" />
    <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
      <img
        itemprop="url image"
        src="https://www.newfurnitura.ru/upload/emblems/mf.png"
        alt="Логотип МФ"
        title=""
        style="display: none"
      />
    </div>
    <meta itemprop="telephone" :content="filials[0].departments[0].phone" />

    <div
      itemprop="address"
      itemscope="itemscope"
      itemtype="https://schema.org/PostalAddress"
    >
      <meta
        itemprop="postalCode"
        :content="filials[0].departments[0].postalCode"
      />
      <meta
        itemprop="addressLocality"
        :content="filials[0].departments[0].addressLocality"
      />
      <meta
        itemprop="streetAddress"
        :content="filials[0].departments[0].streetAddress"
      />
    </div>
    <div
      v-for="(filial, ind) in filialsExclMSC"
      :key="ind"
      itemscope
      itemprop="subOrganization"
      itemtype="https://schema.org/LocalBusiness"
    >
      <meta itemprop="name" :content="filial.name" />
      <div itemprop="logo" itemscope itemtype="https://schema.org/ImageObject">
        <img
          itemprop="url image"
          src="https://www.newfurnitura.ru/upload/emblems/mf.png"
          alt="Логотип МФ"
          title=""
          style="display: none"
        />
      </div>
      <meta itemprop="telephone" :content="filial.phone" />

      <div
        itemprop="address"
        itemscope="itemscope"
        itemtype="https://schema.org/PostalAddress"
      >
        <meta
          v-if="filial.postalCode"
          itemprop="postalCode"
          :content="filial.postalCode"
        />
        <meta itemprop="addressLocality" :content="filial.addressLocality" />
        <meta itemprop="streetAddress" :content="filial.streetAddress" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  props: [],

  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      filials: "headerMenu/getAllSortCity",
      filialsExclMSC: "headerMenu/getAllSortCityExclMsc",
    }),
  },
};
</script>
