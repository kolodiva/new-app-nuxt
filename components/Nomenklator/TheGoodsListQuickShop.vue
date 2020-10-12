<template>
  <v-dialog
    v-model="showQuickShopDialog"
    max-width="400"
    @click:outside="closeQuickShopDialog"
    @keydown="closeQuickShopDialog"
  >
    <v-card>
      <v-card-title class="headline">
        {{ paramsQuickShopDialog.artikul }} {{ paramsQuickShopDialog.name }}
      </v-card-title>

      <v-card-text>
        Здесь вы можете Хорошо подумать и принять самое ответственное решение в
        своей жизни - купить ЭТО или оставить на потом когда Цены подрастут?
      </v-card-text>

      <v-card-actions>
        <v-btn color="green darken-1" text @click="closeQuickShopDialog">
          спасибо, не надо...
        </v-btn>
        <v-spacer></v-spacer>

        <v-btn color="green darken-1" text @click="closeQuickShopDialog">
          в корзину
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
    };
  },
  computed: {
    ...mapGetters({
      showQuickShopDialog: "shop/showQuickShopDialog",
      paramsQuickShopDialog: "shop/paramsQuickShopDialog",
    }),
  },
  mounted() {
    // console.log(this.paramsQuickShopDialog);
  },
  methods: {
    async closeQuickShopDialog() {
      await this.$store.dispatch("shop/closeQuickShopDialog");
    },
  },
};
</script>

<style></style>
