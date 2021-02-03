<template>
  <div>
    <v-breadcrumbs
      v-if="microdata == 'true'"
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
    <v-breadcrumbs
      v-else
      :items="itemsBreadCrumb"
      :class="[
        typeSrc ? 'justify-left' : 'justify-center',
        'text-subtitle-1',
        'pb-0',
      ]"
      style=""
    >
      <template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template>

      <template v-slot:item="{ item }">
        <li>
          <NuxtLink
            :to="item.to == '/' ? '/' : '/catalog/' + item.to"
            style="text-decoration: none"
          >
            <span>{{ item.text }}</span></NuxtLink
          >
        </li>
      </template>
    </v-breadcrumbs>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["typeSrc", "goodCardBreadCrumb", "microdata"],

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
