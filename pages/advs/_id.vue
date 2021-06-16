<template>
  <div
    v-if="advsHtml.rows && advsHtml.rows.length > 0"
    v-html="`${advsHtml.rows[0].alt}`"
  ></div>
  <div v-else style="height: 500px">
    <h2 style="text-align: center; line-height: 500px">
      Страница с таким адресом не найдена
    </h2>
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  async fetch({ app, params, query, store }) {
    if (params && params.id) {
      await store.dispatch("nomenklator/loadAdvsHtml", params);
    }
  },

  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      advsHtml: "nomenklator/getAdvsHtml",
      requisite: "headerMenu/getRequisites",
    }),
    propHeader() {
      const tmp = {};
      try {
        tmp.title = this.advsHtml.rows[0].intrnt_html.title;
      } catch (e) {}

      try {
        tmp.style1 = this.advsHtml.rows[0].intrnt_html.style1;
      } catch (e) {}

      try {
        tmp.meta = this.getArray(this.advsHtml.rows[0].intrnt_html.meta)();
      } catch (e) {}

      try {
        tmp.script = this.getArray(this.advsHtml.rows[0].intrnt_html.script)();
      } catch (e) {}

      try {
        tmp.link = this.getArray(this.advsHtml.rows[0].intrnt_html.style)();
      } catch (e) {}

      return tmp || {};
    },
  },
  beforeCreate() {},

  mounted() {
    // const res = this.getArray(this.advsHtml.rows[0].intrnt_html)();
    // console.log(this.propHeader);
  },
  methods: {
    getArray(str) {
      const Fn = Function;
      return new Fn("return " + str);
    },
  },
  head() {
    return {
      title: this.propHeader.title,
      meta: this.propHeader.meta,
      script: this.propHeader.script,
      link: this.propHeader.link,
    };
  },
};
</script>

<style></style>
