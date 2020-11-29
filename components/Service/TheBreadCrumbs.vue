<template>
  <v-breadcrumbs
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
      <v-breadcrumbs-item
        :to="item.to == '/' ? '/' : '/catalog/' + item.to"
        exact
      >
        {{ item.text }}
      </v-breadcrumbs-item>
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
    itemsBreadCrumb_old() {
      return this.typeSrc && this.typeSrc.src === "goodCard"
        ? this.goodCardBreadCrumb
        : this.typeSrc.src === "Cart"
        ? [
            {
              text: "На главную",
              disable: false,
              to: "/",
            },
          ]
        : this.breadCrumb;
    },
    itemsBreadCrumb() {
      return this.typeSrc && this.typeSrc.src === "goodCard"
        ? this.goodCardBreadCrumb
        : this.breadCrumb;
    },
  },
  methods: {},
};
</script>
