<template>
  <v-breadcrumbs
    :items="itemsBreadCrumb"
    :class="[
      typeSrc ? 'justify-left' : 'justify-center',
      'text-subtitle-1',
      'pb-0',
    ]"
    style=""
    itemscope
    itemtype="https://schema.org/BreadcrumbList"
  >
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>

    <template v-slot:item="{ item }">
      <li
        itemprop="itemListElement"
        itemscope
        itemtype="https://schema.org/ListItem"
      >
        <NuxtLink
          itemprop="item"
          :to="item.to == '/' ? '/' : '/catalog/' + item.to"
          style="text-decoration: none"
        >
          <span itemprop="name">{{ item.text }}</span></NuxtLink
        >
        <meta itemprop="position" :content="item.ind" />
      </li>
    </template>
  </v-breadcrumbs>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["typeSrc", "goodCardBreadCrumb"],

  computed: {
    ...mapGetters({
      breadCrumb: "nomenklator/getBreadCrumb",
    }),
    itemsBreadCrumb() {
      return this.typeSrc && this.typeSrc.src === "goodCard"
        ? this.goodCardBreadCrumb
        : this.breadCrumb;
    },
  },
  methods: {},
};
</script>
