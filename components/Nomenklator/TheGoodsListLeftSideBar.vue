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
              :load-children="fetchUsers"
              activatable
              item-key="name"
              open-on-click
              dense
              style="height: 70vh; overflow-y: auto"
            >
              <template v-slot:prepend="{ item, open }">
                <v-icon>
                  {{ open ? "mdi-folder-open" : "mdi-folder" }}
                </v-icon>
              </template>
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
    };
  },
  computed: {
    ...mapGetters({
      strucCatalog: "nomenklator/strucCatalog",
    }),
  },
  mounted() {
    window.$("#sidebar1").stickr({ duration: 0, offsetTop: 80 });
  },
  methods: {
    fetchUsers(item) {
      // Remove in 6 months and say
      // you've made optimizations! :)
      // await pause(100);
      this.$router.push(item.node_id);
    },
  },
};
</script>

<style>
.v-expansion-panel-content__wrap {
  padding-left: 0;
  padding-right: 0;
}
</style>
