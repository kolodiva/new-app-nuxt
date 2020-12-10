<template>
  <v-navigation-drawer v-model="onOpen" app temporary light width="400">
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
      @update:active="letsGoFreddy"
    >
    </v-treeview>
  </v-navigation-drawer>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: [],
  data() {
    return {
      tree: [],
      open: [],
      active: [],
      onOpen: true,
    };
  },

  computed: {
    ...mapGetters({
      strucCatalog: "nomenklator/strucCatalog",
    }),
  },
  watch: {
    onOpen(v) {
      if (v === false) {
        this.$emit("closeQuickCatalog");
      }
    },
  },
  methods: {
    letsGoFreddy(items) {
      // console.log(items[0]);
      if (items.length > 0) {
        this.$router.push("/catalog/" + items[0]);
      }
    },
  },
};
</script>
