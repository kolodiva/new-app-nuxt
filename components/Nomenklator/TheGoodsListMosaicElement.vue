<template>
  <v-card
    class=""
    color="grey lighten-4"
    width="300"
    height="100%"
    min-height="484"
    style="display: flex; flex-direction: column"
  >
    <v-hover v-slot:default="{ hover }" open-delay="200">
      <v-img
        :src="`${pos.guid_picture}`"
        contain
        style="flex-grow: 0"
        min-width="297"
      >
        <v-expand-transition>
          <div
            v-if="hover"
            class="d-flex flex-column transition-fast-in-fast-out blueMfBckg v-card--reveal subtitle-1 white--text"
            style="
              height: 100%;
              align-items: flex-start;
              justify-content: flex-start;
            "
          >
            <div class="pa-2">
              <p class="ma-0">розн. {{ pos.price1 }}</p>
              <p class="ma-0">мелк опт. {{ pos.price2 }}</p>
              <p class="ma-0">круп опт. {{ pos.price3 }}</p>
            </div>
          </div>
        </v-expand-transition>
      </v-img>
    </v-hover>
    <v-card-text class="pt-6" style="position: relative; flex-grow: 4">
      <v-btn
        absolute
        class="white--text blueMfBckg"
        fab
        large
        right
        top
        @click.prevent="showQuickShopDialog"
      >
        <v-icon>mdi-cart</v-icon>
      </v-btn>
      <div class="font-weight-light grey--text title mb-2">
        {{ pos ? pos.artikul : "" }}
      </div>
      <n-link
        :to="`${pos.parentguid}/${pos.synonym}`"
        style="text-decoration: none"
      >
        <h3 class="heading-4 font-weight-light blueMfText mb-2">
          {{ pos.name }}
        </h3>
      </n-link>
    </v-card-text>

    <v-card-actions v-if="pos.describe" style="flex-grow: 0">
      <v-btn class="blueMfText" text @click.prevent="show = !show">
        {{ show ? "Мне НЕ нужна информация" : "Мне нужна информация" }}
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click.prevent="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text v-html="pos.describe"> </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: ["pos"],
  data() {
    return {
      show: false,
    };
  },
  mounted() {},
  methods: {
    async showQuickShopDialog() {
      await this.$store.dispatch("shop/openQuickShopDialog", this.pos);
    },
  },
};
</script>

<style></style>
