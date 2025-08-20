<template>
  <v-card 
    class="mx-auto mt-12"
    max-width="70vw"
  >
    <v-card-title>
      3D Модели
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Поиск"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    
    <v-data-table
      dense
      v-model="selected"
      :headers="headers"
      :items="models3d"
      :search="search"

      sort-by='name'

      :items-per-page="20"

      item-key="filename"

      :single-select="singleSelect"
      
      show-select
    >
      
  <template v-slot:[`item.dwnld`]="{ item }">

      {{item.dwnld ? '' : '' }}

    <v-tooltip top>
      
      <template v-slot:activator="{ on, attrs }">

        <v-icon
          class="ml-3"
          @click="downloadItem(item)"
          v-bind="attrs"
          v-on="on"
        >
        mdi-download
        </v-icon>

      </template>

      <span>Загрузить Архив</span>
    </v-tooltip>

  </template>

  </v-data-table>
  </v-card>
</template>

<script>
  export default {

    data () {
      return {
        search: '',
        singleSelect: false,
        selected: [],        
        headers: [
          {
            text: 'Наименование модели',
            align: 'start',
            filterable: true,
            value: 'name',
          },
          { text: 'Загрузить', filterable: false, sortable: false, value: 'dwnld' },
        ],
        models3d: [],
      }
    },
    async mounted() {
      
      if (this.models3d.length === 0) {
        this.refreshModels3D();
      }

    },
    methods: {
      downloadItem (item) {
        //let editedIndex = this.models3d.indexOf(item)
        //let editedItem = Object.assign({}, item)

        this.selected.push(item);

        let path = 'https://www.newfurnitura.ru/news/' + item.filename;
        
        console.log(path);
        
        window.open(path);
      },
      async refreshModels3D() {
      
        const rows = await this.$api("getModels3D");

        this.models3d = [];

        console.log(rows);

        this.$nextTick(() => {
          this.models3d.push(...rows);
        });
    },
    },
  }
</script>