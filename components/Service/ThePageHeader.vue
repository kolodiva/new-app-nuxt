<template>
  <v-row justify="center" class="my-5 animate__heartBeat animate__delay-1s">
    <hr v-if="!showLimitWidth" class="mr-4" :style="objStyle" />
    <h1
      class="text-uppercase text-center text-h5 font-weight-bold"
      style="color: #565656"
    >
      {{ descr ? descr : pageHeader }}
    </h1>
    <hr v-if="!showLimitWidth" class="ml-4" :style="objStyle" />
  </v-row>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  props: ["descr"],
  data() {
    return {
      objStyle: {
        height: "2px",
        marginTop: "14px",
        backgroundColor: "#565656",
        width: "150px",
      },
    };
  },
  computed: {
    ...mapGetters({
      pageHeader: "nomenklator/pageHeader",
      showLimitWidth: "service/getShowLimitWidth",
    }),
  },
};
</script>
