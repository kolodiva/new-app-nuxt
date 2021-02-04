<template>
  <v-navigation-drawer v-model="drawerFilter" app light temporary width="290">
    <v-toolbar dense color="transparent" flat>
      <v-toolbar-title>Фильтр</v-toolbar-title>
      <v-spacer />
      <v-btn icon @click="$emit('switchFilter')">
        <v-icon>mdi-undo-variant</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider />
    <v-card flat>
      <v-row v-if="showResetFilter" justify="end" class="mx-0">
        <v-chip class="ma-2" color="" outlined close link @click="resetFilter">
          Сбросить фильтр
        </v-chip>
      </v-row>

      <v-card-text v-for="(item, i) in groupFilter" :key="i" class="py-0 pt-1">
        <h3 class="">
          {{ item.property }}
        </h3>
        <v-chip-group v-model="setGroupFilter[i]" column multiple>
          <v-chip
            v-for="(item2, i2) in item.arrayprop"
            :key="i2 * 100 + 1"
            filter
            outlined
          >
            {{ item2 }}
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: {
    openWin: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      drawerFilter: true,
      groupDrawer: null,

      setGroupFilter: [[]],
      showResetFilter: false,
    };
  },
  computed: {
    ...mapGetters({
      groupFilter: "nomenklator/getUserFilter",
      userFilterState: "nomenklator/getUserFilterState",
      userFilterParentGuid: "nomenklator/getParentGuid",
    }),
  },
  watch: {
    openWin: {
      handler(v) {
        // console.log("Watcher child getting propChange ", newValue);
        this.setGroupFilter = [...this.userFilterState];

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

        this.showResetFilter = filterParams.length > 0;
      },
      immediate: true,
    },
    drawerFilter(v) {
      if (v === false) {
        this.$emit("switchFilter");
      }
    },
    async setGroupFilter(v) {
      // console.log(v);
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

      window.$("html, body").animate({ scrollTop: 0 }, "fast");
    },
  },
  mounted() {},
  methods: {
    async resetFilter() {
      this.setGroupFilter = [[]];

      await this.$store.dispatch("nomenklator/setFilterState", {
        groupFilter: this.setGroupFilter,
      });

      await this.$store.dispatch("nomenklator/loadSubNumenklator", {
        id: null,
      });

      this.showResetFilter = false;

      if (window.$("article")) {
        window.$("article").moreContent({
          height: 150,
          speed: 500,
          shadow: true,
        });
        window.$("div.mrc-btn-wrap").css("text-align", "end");
        window.$("button.mrc-btn").css("outline", "none");
      }

      window.$("html, body").animate({ scrollTop: 0 }, "fast");

      // this.$emit("switchFilter");
    },
  },
};
</script>

<style></style>
