<template>
  <v-container class="" style="height: 80vh">
    <v-card flat>
      <v-card-title> Ресурсы для Загрузки </v-card-title>
      <v-divider />
      <v-row>
        <v-card flat class="pa-3">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                class="mx-auto"
                max-width="72"
                src="/icon-pdf.png"
                style="cursor: pointer"
                v-bind="attrs"
                v-on="on"
                @click="
                  downloadResource(
                    'https://www.newfurnitura.ru/news/Catalog_MF_2019.pdf'
                  )
                "
              />
            </template>
            <span>Загрузить каталог МФ-Комплект 2020 год (~ 100 MB)</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 135px"
            ><span
              >Каталог 2020<br />МФ-Комплект<br />~ 100 MB</span
            ></v-card-subtitle
          >
        </v-card>
        <v-card flat class="pa-3">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <v-img
                class="mx-auto"
                max-width="72"
                src="/icon-excel.png"
                style="cursor: pointer"
                v-bind="attrs"
                v-on="on"
                @click="
                  downloadResource(
                    'https://www.newfurnitura.ru/news/PriceList.xls'
                  )
                "
              />
            </template>
            <span>Загрузить Прайс-лист МФ-Комплект (~ 1 MB)</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 135px"
            ><span
              >Прайс-лист<br />МФ-Комплект<br />~ 1 MB</span
            ></v-card-subtitle
          >
        </v-card>
        <v-card flat class="pa-3">
          <v-tooltip top>
            <template v-slot:activator="{ on, attrs }">
              <n-link to="/service/orderdownload">
                <v-img
                  class="mx-auto"
                  max-width="72"
                  src="/icon-orderdownload.png"
                  style="cursor: pointer"
                  v-bind="attrs"
                  v-on="on"
                />
              </n-link>
            </template>
            <span>Загрузить Ваш Заказ из Эксель</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 135px"
            ><span>Загрузить<br />из Excel<br />заказ</span></v-card-subtitle
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
