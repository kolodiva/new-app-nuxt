<template>
  <div>
    <TheBreadCrumbs :bread-crumb="breadCrumb" />
    <h1 class="my-10" style="text-align: center; height: 300px">
      А здесся планируется Карточка товара.
    </h1>

    <TheBreadCrumbs :bread-crumb="breadCrumb" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TheBreadCrumbs from "@/components/Service/TheBreadCrumbs.vue";
export default {
  components: { TheBreadCrumbs },
  computed: {
    ...mapGetters({
      breadCrumb: "nomenklator/getBreadCrumb",
    }),
  },
};
</script>

<style lang="" scoped></style>
