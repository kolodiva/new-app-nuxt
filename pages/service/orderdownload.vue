<template>
  <v-container class="" style="height: 80vh">
    <h2>
      Загрузить Заказ из Эксель. Файл НЕ более 30кб и без заголовков. 1-я
      колонка Наш артикул 2-я колонка кол-во.
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
      rows="15"
    ></v-textarea>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      yourOrder: "4700 23",
    };
  },
  computed: {
    ...mapGetters({
      orderListFromExcel: "nomenklator/getOrderListFromExcel",
    }),
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
        const order = [];

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
              const el1 = el[0];
              const el2 = el[1];

              try {
                btoa(el1);
                btoa(el2);
              } catch (err) {}

              // console.log(strTmp);

              txtArea = txtArea + " " + el1 + " " + el2 + "\n";
              order.push([el1, el2]);
            });
          }

          resolve({ txtArea, order });
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

      const { order } = await this.readFile(file);

      await this.$store.dispatch("nomenklator/chngeCartFromExcelLoader", order);

      let totStr = "";

      this.orderListFromExcel.forEach((item, i) => {
        totStr =
          totStr +
          " " +
          (item.guid ? "ok " : "!!!!! ") +
          " стр. " +
          item.order1 +
          " " +
          item.art +
          (item.guid
            ? " " +
              item.name +
              " " +
              item.qty +
              " " +
              item.unit_name +
              " " +
              item.price1
            : " НЕ найден по артиклу, кол-во: " + item.qty) +
          "\n";
      });

      this.yourOrder = totStr;
    },
  },
  head: {
    script: [{ src: "/src/xlsx.mini.min.js" }],
  },
};
</script>

<style scoped></style>
