<template>
  <v-container class="my-10" style="max-width: 800px">
    <v-row align="start" justify="space-around">
      <n-link
        v-for="(pos, id) in nomenklTopLevel"
        :key="id"
        :to="`catalog/${pos.file_name}`"
        style="text-decoration: none"
      >
        <v-card class="ma-1" tile flat>
          <v-img
            eager
            :src="`./index_pic/${pos.file_name}.png`"
            contain
            width="160"
            height="160"
            class="grey lighten-2"
            style="border-radius: 10px; border: 20px solid #eaecec"
            aspect-ratio="1"
            :alt="`${pos.name}`"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>

          <v-card-text class="text-center pt-2 pb-0" style="max-width: 160px">
            <span class="textMFGreyColor">{{ pos.name }}</span>
          </v-card-text>
        </v-card>
      </n-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["nomenkl-top-level"],
};
</script>
