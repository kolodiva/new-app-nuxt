<template>
  <div id="sidebar1">
    <div>
      <v-expansion-panels
        v-if="switchFilter"
        v-model="openPanel2"
        focusable
        multiple
        class="mb-4"
      >
        <v-expansion-panel>
          <v-expansion-panel-header class="">
            Отбор по параметрам
          </v-expansion-panel-header>
          <v-row v-if="showResetFilter" justify="end" class="mx-0">
            <v-chip
              class="ma-2"
              color=""
              outlined
              close
              @click:close="setGroupFilter = [[]]"
            >
              Сбросить фильтр
            </v-chip>
          </v-row>
          <v-expansion-panel-content class="pb-4">
            <v-card-text
              v-for="(item, i) in groupFilter"
              :key="i"
              class="py-0 pt-1"
            >
              <h3 class="">
                {{ item.property }}
              </h3>
              <v-chip-group v-model="setGroupFilter[i]" column multiple>
                <v-chip
                  v-for="(item2, i2) in item.arrayprop"
                  :key="i2"
                  filter
                  outlined
                >
                  {{ item2 }}
                </v-chip>
              </v-chip-group>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

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
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { scrollToElm } from "@/utils/scrolling";
// const pause = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
export default {
  props: ["switchFilter", "parentguid"],
  data() {
    return {
      openPanel1: [0],
      openPanel2: [0],
      show: false,
      tree: [],
      open: [],
      active: [],

      groupFilter: [],
      setGroupFilter: [[]],
      showResetFilter: false,
    };
  },
  computed: {
    ...mapGetters({
      strucCatalog: "nomenklator/strucCatalog",
      breadCrumb: "nomenklator/getBreadCrumb",
    }),
  },
  watch: {
    setGroupFilter(v) {
      // console.log(this.setGroupFilter[0].length);
      this.showResetFilter = true;
    },
    async switchFilter(v) {
      if (v === true && this.parentguid) {
        const { rows } = await this.$api("getGroupFilter", {
          parentguid: this.parentguid,
        });

        this.groupFilter.push(...rows);

        //  console.log(this.groupFilter);
      }
    },
  },
  mounted() {
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
      const box = document.querySelector(".v-expansion-panel-content__wrap");
      const targetElm = document.querySelector(".v-treeview-node--active");

      try {
        scrollToElm(box, targetElm, 600);
      } catch (e) {
      } finally {
      }
    });

    window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
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
  height: 50vh;
}
</style>
