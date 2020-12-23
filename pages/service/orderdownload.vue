<template>
  <v-container class="" style="height: 80vh">
    <h2>
      Загрузить Заказ из Эксель. Файл НЕ более 30кб и без заголовков. 1 колонка
      Наш артикул 2 колонка кол-во
    </h2>
    <v-file-input
      accept=".xls, .xlsx"
      autofocus
      show-size
      label="Укажите загружаемый файл."
      width="400"
      @change="getFile"
    ></v-file-input>

    <v-textarea
      counter
      background-color="amber lighten-4"
      color="orange orange-darken-4"
      label="Ваш Заказ. В окне пример размещения данных. Без заголовков."
      :value="yourOrder"
    ></v-textarea>
  </v-container>
</template>

<script>
// if (typeof require !== "undefined") XLSX = require("xlsx");
export default {
  data() {
    return {
      yourOrder: "4700 23",
    };
  },
  mounted() {
    // const workbook = window.XLSX.readFile("testExcel.xlsx");
    // console.log(workbook);
  },

  methods: {
    readFile(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        let txtArea = "";

        reader.onload = (res) => {
          const data = new Uint8Array(res.target.result);
          const workbook = window.XLSX.read(data, { type: "array" });

          if (workbook) {
            const firstSheetName = workbook.SheetNames[0];
            const firstWorksheet = workbook.Sheets[firstSheetName];

            const data = window.XLSX.utils.sheet_to_json(firstWorksheet, {
              header: 1,
            });

            data.forEach((el) => {
              const strTmp = el[0] + " " + el[1];

              try {
                btoa(strTmp);
              } catch (err) {}

              // console.log(strTmp);

              txtArea = txtArea + strTmp + "\n";
            });
          }

          resolve(txtArea);
        };

        reader.onerror = (err) => reject(err);

        reader.readAsArrayBuffer(file);
      });
    },

    async getFile(file) {
      if (!file || file.size > 30000) {
        console.log("Нельзя грузить большие файлы.");
        return;
      }

      this.yourOrder = await this.readFile(file);
    },
  },
  head: {
    script: [{ src: "/src/xlsx.mini.min.js" }],
  },
};
</script>

<style scoped></style>
