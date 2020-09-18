<template>
  <v-container fluid>
    <v-switch
      v-model="viewType"
      :label="viewType ? 'Список на всю ширину' : 'Лента'"
    ></v-switch>
    <v-row v-if="viewType" align="start" justify="center">
      <v-col cols="6">
        <n-link
          v-for="(pos, id) in subNomenkl"
          :key="id"
          :to="`${pos.parentguid}/${pos.synonym}`"
          style="text-decoration: none"
        >
          <v-card class="ma-4" tile flat>
            <div
              class="d-flex flex-no-wrap"
              style="justify-content: space-between"
            >
              <v-avatar class="ma-3" size="160" tile>
                <v-hover v-slot:default="{ hover }">
                  <v-img
                    eager
                    :src="`${pos.guid_picture_small}`"
                    contain
                    :class="`${hover ? 'grey lighten-3' : 'grey lighten-2'}`"
                    style="border-radius: 10px; border: 20px solid #eaecec"
                    :alt="`${pos.name}`"
                  />
                </v-hover>
              </v-avatar>
              <div>
                <v-card-title
                  class="textMFGreyColor"
                  v-text="pos.name"
                ></v-card-title>
              </div>
              <div>
                <v-card-title class="textMFGreyColor"
                  >Блок выбора кол-ва</v-card-title
                >
              </div>
            </div>
          </v-card>
        </n-link>
      </v-col>
    </v-row>
    <v-row v-else align="start" justify="center">
      <n-link
        v-for="(pos, id) in subNomenkl"
        :key="id"
        :to="`${pos.parentguid}/${pos.synonym}`"
        style="text-decoration: none"
      >
        <v-card class="ma-4" tile flat>
          <v-hover v-slot:default="{ hover }">
            <v-avatar class="ma-3" size="250" tile>
              <v-img
                eager
                :src="`${pos.guid_picture_small}`"
                contain
                :class="`${hover ? 'grey lighten-3' : 'grey lighten-2'}`"
                style="border-radius: 10px; border: 20px solid #eaecec"
                :alt="`${pos.name}`"
              />
            </v-avatar>
          </v-hover>

          <v-card-text class="text-center pt-2 pb-0" style="max-width: 250px">
            <span class="textMFGreyColor">{{ pos.name }}</span>
          </v-card-text>
        </v-card>
      </n-link>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: ["sub-nomenkl"],
  data() {
    return {
      viewType: false,
    };
  },
};
</script>
