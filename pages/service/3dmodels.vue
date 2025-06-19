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

          <v-card-subtitle style="max-width: 140px"
            ><span>Направляющие шариковые полного выдвижения H=35 мм BBS.35</span></v-card-subtitle
          >
        </v-card>

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
                    'https://www.newfurnitura.ru/news/frag_petel_91370_MF_1.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Фрагменты Петель МФ арт.91370</span></v-card-subtitle
          >
        </v-card>

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
                    'https://www.newfurnitura.ru/news/napravl_skryt_typa_clipon_polnogo_vidvigenia_s_dovodchikom_s_sinhr_3dregulirovkoi_CS.0003D.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>CS.000.3D Направляющие скрытого типа Clip-on полного выдв. с доводчиком с синх. 3D регулировкой</span></v-card-subtitle
          >
        </v-card>

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
                    'https://www.newfurnitura.ru/news/MF_napravl_sharikovie_skrytogo_typaDMI_803SHD.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Направляющие шариковые скрытого типа DMI-803SHD</span></v-card-subtitle
          >
        </v-card>


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
                    'https://www.newfurnitura.ru/news/MF_Fragmenty_petel_52_gramma_MF_201_45gr_90gr.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Фрагменты петель 52 грамма, MF-201, 45гр, 90гр</span></v-card-subtitle
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
 
  head() {
    return {
      title: "БАЗИС-Мебельщик, архивы продукции - САПР, архивы, создание трехмерных моделей, конструирование мебельных изделий, формирование пользовательских классов фурнитуры, создание моделей крепежной и декоративной фурнитуры",
      meta: [
        {
          name: "description",
          content:
            "Архивы фурнитуры для использования в системе автоматического проектирования мебели БАЗИС-Мебельщик.",
          hid: "description",
        },
        {
          name: "keywords",
          content:
            "БАЗИС-Мебельщик, САПР, архивы, создание трехмерных моделей, конструирование мебельных изделий, формирование пользовательских классов фурнитуры, создание моделей крепежной и декоративной фурнитуры",
          hid: "keywords",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
