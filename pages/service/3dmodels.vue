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
                    'https://www.newfurnitura.ru/news/MF_Napravljajushhie_CS000POSCL2D_polnogo_vydv_otkryvanie_nazh_s_dovod_s_sinhr_2D.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Направляющие CS.000.PO.SCL.2D полного выдв. открывание наж. с довод. с синхр, 2D</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/MF_Napravljajushhie_BBS45_sharikovye_polnogo_vydvizhenija_H45mm.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Направляющие BBS.45 шариковые полного выдвижения H=45 мм</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/MF_Napravlyayushchie_CSS_000_H_nepolnogo_vydvizheniya_s_dovodchikom.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Направляющие CSS.000.H неполного выдвижения с доводчиком</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/MF_Napravlyayushchie_CSS_000_P_nepolnogo_vydvizheniya_s_dovodchikom.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Направляющие CSS.000.P неполного выдвижения с доводчиком</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/Unihopper_Petli_Setton.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Петли Unihopper Setton</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/Unihopper_Napravlyayushchie_skrytye.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Направляющие Unihopper скрытые</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/Unihopper_YAshchiki_Magic_Box.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Ящики Unihopper Magic Box</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/Sushki_MF.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Сушки MF</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/MF_Petli_Prima_Top_45mm_MF_Prima_Top_52mm.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Петли Prima Top 45 мм, MF Prima Top 52 мм</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/YAshchiki_MF_Tango_Box.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Ящики MF Tango Box</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/YAshchiki_MF_Tango_Slim.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Ящики MF Tango Slim</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/Garderobnye_Sistemy_COKA.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Гардеробные системы COKA</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/YAshchiki_Unihopper_Mental_Box.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Ящики Unihopper Mental Box</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/Sushki_MF_1.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>Сушки MF-1</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/MF_Napravlyayushchie_BBS35_sharikovye_polnogo_vydvizheniya_H=35_mm.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Направляющие BBS.35 шариковые полного выдвижения H=35 мм</span></v-card-subtitle
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
                    'https://www.newfurnitura.ru/news/MF_Napravlyayushchie_BBS45_sharikovye_polnogo_vydvizheniya_H=45_mm_1.zip'
                  )
                "
              />
            </template>
            <span>Загрузить 3D модели</span>
          </v-tooltip>

          <v-card-subtitle style="max-width: 140px"
            ><span>MF Направляющие BBS.45 шариковые полного выдвижения H=45 мм (1)</span></v-card-subtitle
          >
        </v-card>


      </v-row>
    </v-card>
  </v-container>
</template>

<script>
// if (typeof require !== "undefined") XLSX = require("xlsx");
export default {

  async fetch() {
    
    const rows = await this.$api("getModels3D");

    this.models3d = { ...rows };
  },

  data() {
    return {
      models3d: [],
    };
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
      title: "БАЗИС-Мебельщик, архивы продукции - САПР, архивы, создание трехмерных моделей, конструирование мебельных изделий, формирование пользовательских классов фурнитуры, создание моделей крепежной и декоративной фурнитуры на базе элементов компании МФ-Комплект",
      meta: [
        {
          name: "description",
          content:
            "Архивы фурнитуры для использования в системе автоматического проектирования мебели БАЗИС-Мебельщик на базе фурнитуры компании МФ-Комплект.",
          hid: "description",
        },
        {
          name: "keywords",
          content:
            "БАЗИС-Мебельщик, САПР, архивы, создание трехмерных моделей, конструирование мебельных изделий, формирование пользовательских классов фурнитуры, создание моделей крепежной и декоративной фурнитуры, компания МФ-Комплект",
          hid: "keywords",
        },
      ],
    };
  },
};
</script>

<style scoped></style>
