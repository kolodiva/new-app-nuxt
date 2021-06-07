<template>
  <v-container>
    <v-card-title>
      Ревизия по {{ filial }}
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Найти"
        single-line
        hide-details
        clearable
      ></v-text-field>
    </v-card-title>
    <v-data-table
      dense
      :headers="headers"
      :items="recs"
      item-key="id"
      :search="search"
    >
      <template v-slot:item.qty2="props">
        <v-edit-dialog
          :return-value.sync="props.item.qty2"
          persistent
          @save="save"
          @cancel="cancel"
          @open="open"
          @close="close"
        >
          <div>{{ props.item.qty2 }}</div>
          <template v-slot:input>
            <div class="mt-4 text-h6">Факт. кол-во</div>
            <v-text-field
              v-model="props.item.qty2"
              label="Edit"
              single-line
              counter
              autofocus
              clearable
            ></v-text-field>
          </template>
        </v-edit-dialog>
      </template>
    </v-data-table>

    <!-- <infinite-loading @infinite="infiniteHandlerAll"></infinite-loading> -->
  </v-container>
</template>

<script>
const pageSize = 40;

export default {
  layout: "test",
  async fetch() {
    this.filial = this.$route.params.id.toUpperCase();

    const rows = await this.$api("getStockTakings", {
      pageSize,
      currentLength: 0,
      curFilial: this.filial,
    });

    // console.log(params);

    if (rows.length) {
      this.recs.push(...rows);
    }
  },

  data() {
    return {
      recs: [],

      snack: false,
      snackColor: "",
      snackText: "",
      pagination: {},

      filial: "",

      search: "",

      headers: [
        {
          text: "Артикул",
          value: "artikul1",
        },
        {
          text: "Артикул нов.",
          value: "artikul2",
        },
        {
          text: "Наименование",
          value: "name1",
        },
        {
          text: "Ед.изм",
          value: "unit",
        },
        {
          text: "Кол-во в базе",
          value: "qty1",
        },
        {
          text: "Кол-во факт",
          value: "qty2",
        },
      ],
    };
  },
  computed: {},
  mounted() {},

  methods: {
    save() {
      this.snack = true;
      this.snackColor = "success";
      this.snackText = "Data saved";
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {
      console.log("Dialog closed");
    },

    async infiniteHandlerAll($state) {
      const rows = await this.$api("getStockTakings", {
        pageSize,
        currentLength: this.recs.length,
        curFilial: "SPB",
      });

      if (rows.length) {
        this.recs.push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>

<style scoped></style>
