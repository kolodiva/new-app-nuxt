<template>
  <v-container class="" style="max-width: 800px">
    <v-row align="start" justify="center">
      <n-link
        v-for="(pos, id) in subNomenklator"
        :key="id"
        :to="`${pos.guid}`"
        style="text-decoration: none"
      >
        <v-card class="ma-4" tile flat>
          <v-hover v-slot:default="{ hover }">
            <v-img
              eager
              :src="`${pos.guid_picture_small}`"
              contain
              width="160"
              height="160"
              :class="`${hover ? 'grey lighten-3' : 'grey lighten-2'}`"
              style="border-radius: 10px; border: 20px solid #eaecec"
              aspect-ratio="1"
              :alt="`${pos.name}`"
            />
          </v-hover>

          <v-card-text class="text-center pt-2 pb-0" style="max-width: 160px">
            <span class="textMFGreyColor">{{ pos.name }}</span>
          </v-card-text>
        </v-card>
      </n-link>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      subNomenklator: "nomenklator/getSubNomenklator",
    }),
  },
};
</script>
