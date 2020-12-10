<template>
  <div
    class="d-flex flex-column"
    style="position: fixed; left: 5px; z-index: 1"
  >
    <v-tooltip right>
      <template v-slot:activator="{ on, attrs }">
        <v-badge color="pink" dot overlap>
          <v-btn
            fab
            color="blue"
            x-small
            class="mb-4"
            v-bind="attrs"
            v-on="on"
            @click="$emit('openQuickCatalog')"
          >
            <v-icon color="white">mdi-format-list-bulleted-square</v-icon>
          </v-btn>
        </v-badge>
      </template>
      <span>Быстрая Навигация</span>
    </v-tooltip>
    <v-tooltip v-if="canUseFilter" right>
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-if="canUseFilter"
          fab
          color="blue"
          x-small
          v-bind="attrs"
          v-on="on"
          @click="$emit('openFilter')"
        >
          <v-icon color="white">mdi-filter</v-icon>
        </v-btn>
      </template>
      <span>Фильтр</span>
    </v-tooltip>
  </div>
</template>
<script>
export default {
  props: ["canUseFilter"],
  data() {
    return {};
  },

  computed: {},
  watch: {},
  methods: {},
};
</script>
