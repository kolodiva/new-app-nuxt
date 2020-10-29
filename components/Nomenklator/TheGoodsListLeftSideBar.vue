<template>
  <div id="sidebar1">
    <div>
      <v-expansion-panels v-model="openPanel1" focusable multiple>
        <v-expansion-panel v-for="(item, i) in 1" :key="i">
          <v-expansion-panel-header>
            Разделы каталога
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-treeview
              v-model="tree"
              :items="strucCatalog"
              item-key="node_id"
              hoverable
              rounded
              activatable
              transition
              dense
              :open="open"
              :active="active"
              @update:active="fetchUsers"
            >
            </v-treeview>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <v-expansion-panels v-model="openPanel2" focusable multiple class="mt-4">
        <v-expansion-panel v-for="(item, i) in 1" :key="i">
          <v-expansion-panel-header>
            Отбор по параметрам
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
// import { mapGetters } from "vuex";
import { mapGetters } from "vuex";
// const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  data() {
    return {
      openPanel1: [0],
      openPanel2: [0],
      show: false,
      tree: [],
      open: [],
      active: [],
    };
  },
  computed: {
    ...mapGetters({
      strucCatalog: "nomenklator/strucCatalog",
      breadCrumb: "nomenklator/getBreadCrumb",
    }),
  },
  mounted() {
    // this.$hello(lastEl);

    window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });

    if (this.breadCrumb.length === 2) {
      const lastEl = this.breadCrumb[this.breadCrumb.length - 1];

      this.active.push(lastEl.href);
    }

    if (this.breadCrumb.length > 2) {
      const lastEl1 = this.breadCrumb[this.breadCrumb.length - 1];
      const lastEl2 = this.breadCrumb[this.breadCrumb.length - 2];

      this.active.push(lastEl1.href);
      this.open.push(lastEl2.href);
    }

    if (this.breadCrumb.length > 3) {
      const lastEl = this.breadCrumb[this.breadCrumb.length - 3];
      this.open.push(lastEl.href);
    }

    if (this.breadCrumb.length > 4) {
      const lastEl = this.breadCrumb[this.breadCrumb.length - 4];
      this.open.push(lastEl.href);
    }

    if (this.breadCrumb.length > 5) {
      const lastEl = this.breadCrumb[this.breadCrumb.length - 5];
      this.open.push(lastEl.href);
    }

    /// //////////
    this.$nextTick(() => {
      const box = document.querySelector(".v-expansion-panel-content__wrap");
      const targetElm = document.querySelector(".v-treeview-node--active");

      scrollToElm(box, targetElm, 600);
    });

    function scrollToElm(container, elm, duration) {
      const pos = getRelativePos(container, elm);
      console.log(pos);
      scrollTo(container, pos.top - 150, 1); // duration in seconds
    }

    function getRelativePos(container, elm) {
      const pPos = container.getBoundingClientRect(); // parent pos
      const cPos = elm.getBoundingClientRect(); // target pos
      const pos = {};

      pos.top = cPos.top - pPos.top + elm.parentNode.scrollTop;
      pos.right = cPos.right - pPos.right;
      pos.bottom = cPos.bottom - pPos.bottom;
      pos.left = cPos.left - pPos.left;

      return pos;
    }

    function scrollTo(element, to, duration, onDone) {
      const start = element.scrollTop;
      const change = to - start;
      const startTime = performance.now();
      let now;
      let elapsed;
      let t;

      function animateScroll() {
        now = performance.now();
        elapsed = (now - startTime) / 1000;
        t = elapsed / duration;

        element.scrollTop = start + change * easeInOutQuad(t);

        if (t < 1) window.requestAnimationFrame(animateScroll);
        else onDone && onDone();
      }

      animateScroll();
    }

    function easeInOutQuad(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }
  },
  methods: {
    fetchUsers(items) {
      // this.$hello(items);
      // Remove in 6 months and say
      // you've made optimizations! :)
      // await pause(100);
      this.$router.push(items[0]);
    },
  },
};
</script>

<style>
.v-expansion-panel-content__wrap {
  padding-left: 5px;
  padding-right: 5px;
  font-size: 14px;
  overflow-y: scroll;
  height: 50vh;
}
</style>
