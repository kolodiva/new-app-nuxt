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
