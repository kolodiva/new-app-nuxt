<template>
  <v-container class="" style="height: 80vh">
    <v-card flat>
      <v-card-title> 3D Модели </v-card-title>
      <v-divider />
      <v-row>
        <v-card flat class="pa-3">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                class="mx-auto"
                max-width="72"
                src="/icon-zip.png"
                style="cursor: pointer"
                v-bind="attrs"
                v-on="on"
                @click="
                  downloadResource(
                    'https://www.newfurnitura.ru/news/napravl_sharik_MF_1.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 135px"
            ><span>MF Направляющие шариковые полного выдвижения H=35 мм BBS.35</span></v-card-subtitle
          >
        </v-card>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// if (typeof require !== "undefined") XLSX = require("xlsx");
export default {
  data() {
    return {};
  },
  mounted() {
    // const workbook = window.XLSX.readFile("testExcel.xlsx");
    // console.log(workbook);
  },

  methods: {
    downloadResource(path) {
      window.open(path);
    },
  },
  head: {},
};
</script>

<style scoped></style>
