<template>
  <div>
    <TheBreadCrumbs />
    <TheTextInfo />
    <ThePageHeader />
    <TheSubNomenklator v-if="isGroup" />
    <TheGoodsList v-else />
    <TheBreadCrumbs />
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
    }),
  },
  beforeCreate() {},
  mounted() {
    window.$("article").moreContent({
      height: 200,
      speed: 500,
      shadow: true,
      useCss: true,
      tpl: {
        btn: '<div class="mrc-btn" style="cursor: pointer"></div>',
        btnWrap: '<div class="mrc-btn-wrap" style="text-align: end;"></div>',
      },
    });
  },
  methods: {},
};
</script>

<style>
.mrc-shadow {
  pointer-events: none;
  position: absolute;
  height: 50px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  background: linear-gradient(to top, #fff 14%, rgba(0, 0, 0, 0) 100%);
}
</style>
