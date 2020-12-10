<template>
  <div id="sidebar1">
    <div id="sidebarGoodsGroup">
      <v-expansion-panels v-model="openPanel1" focusable multiple>
        <v-expansion-panel v-for="(item, i) in 1" :key="i">
          <v-expansion-panel-header> Каталог </v-expansion-panel-header>
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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { scrollToElm } from "@/utils/scrolling";
// const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  props: ["switchFilter"],
  data() {
    return {
      openPanel1: [0],
      openPanel2: [0],
      tree: [],
      open: [],
      active: [],

      // groupFilter: [],
      setGroupFilter: [[]],
      showResetFilter: false,
    };
  },
  computed: {
    ...mapGetters({
      strucCatalog: "nomenklator/strucCatalog",
      breadCrumb: "nomenklator/getBreadCrumb",
      groupFilter: "nomenklator/getUserFilter",
      userFilterState: "nomenklator/getUserFilterState",
      userFilterParentGuid: "nomenklator/getParentGuid",
    }),
  },
  watch: {
    async setGroupFilter(v) {
      const filterParams = [];

      this.setGroupFilter.forEach((e, i) => {
        if (e && e.length > 0) {
          e.forEach((v, j) => {
            filterParams.push({
              property: this.groupFilter[i].property,
              value: this.groupFilter[i].arrayprop[v],
            });
          });
        }
      });

      await this.$store.dispatch("nomenklator/setFilterState", {
        groupFilter: this.setGroupFilter,
      });

      await this.$store.dispatch("nomenklator/loadSubNumenklator", {
        id: null,
      });

      this.showResetFilter = filterParams.length > 0;
    },
  },
  mounted() {
    if (this.userFilterState) {
      // console.log("1111111111111111111111111111111111111111111");
      this.setGroupFilter = [...this.userFilterState];
    }

    if (this.breadCrumb.length === 2) {
      const lastEl = this.breadCrumb[this.breadCrumb.length - 1];

      // console.log(lastEl.to);

      this.active.push(lastEl.to);
    }

    if (this.breadCrumb.length > 4) {
      // const lastEl1 = this.breadCrumb[3];
      // const lastEl2 = this.breadCrumb[2];
      //
      // this.active.push(lastEl1.href);
      // this.open.push(lastEl2.href);
    } else if (this.breadCrumb.length > 2) {
      const lastEl1 = this.breadCrumb[this.breadCrumb.length - 1];
      const lastEl2 = this.breadCrumb[this.breadCrumb.length - 2];

      this.active.push(lastEl1.to);
      this.open.push(lastEl2.to);

      let i = 3;

      while (i <= this.breadCrumb.length) {
        // выводит 0, затем 1, затем 2

        const lastEl = this.breadCrumb[this.breadCrumb.length - i];

        try {
          this.open.push(lastEl.to);
        } catch (e) {
        } finally {
        }

        i++;
      }
    }
    /// //////////
    this.$nextTick(() => {
      const box = document.querySelector(
        "#sidebarGoodsGroup .v-expansion-panel-content__wrap"
      );
      const targetElm = document.querySelector(".v-treeview-node--active");

      try {
        scrollToElm(box, targetElm, 600);
      } catch (e) {
      } finally {
      }
    });

    window.$("#sidebar1").stickr({ duration: 300, offsetTop: 80 });
  },
  methods: {
    fetchUsers(items) {
      if (items.length > 0) {
        this.$router.push(items[0]);
      }
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
  height: 80vh;
}
</style>
