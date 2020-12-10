<template>
  <v-speed-dial
    v-model="fab"
    fixed
    bottom
    left
    class=""
    style="margin-left: 50px"
  >
    <template v-slot:activator>
      <v-btn v-model="fab" color="blue" dark fab small left>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-apps</v-icon>
      </v-btn>
    </template>
    <template v-for="(el, i) in breadCrumb">
      <v-btn
        :key="i"
        :to="el.to === '/' ? '/' : `/catalog/${el.to}`"
        exact
        text
        dark
        fab
        small
        style="justify-content: start; background-color: transparent"
      >
        <v-chip>{{ el.text }}</v-chip>
      </v-btn>
    </template>
  </v-speed-dial>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    fab: false,
  }),

  computed: {
    ...mapGetters({
      breadCrumb: "nomenklator/getBreadCrumb",
    }),
  },
};
</script>

<style></style>
