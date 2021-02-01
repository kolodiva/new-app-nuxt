<template>
  <div>
    <TheVueSlickCarousel />
    <v-container class="my-5" style="max-width: 800px">
      <ThePageHeader descr="რეკლამა არის პროგრესის ძრავა" />
      <v-toolbar dense flat
        ><v-spacer /><v-btn text to="/">Добавить Новый блок</v-btn></v-toolbar
      >
      <v-container fluid style="max-width: 70vw; min-height: 70vh">
        <v-card v-if="newcard" class="pa-5">
          <v-toolbar dense flat>
            <v-spacer />
            <v-checkbox
              v-model="newcard.on_slider"
              label="Показать в слайдере"
              hide-details
            ></v-checkbox>
          </v-toolbar>

          <v-combobox
            v-model="selectCity"
            :items="filials"
            label="Города"
            multiple
            outlined
            dense
          ></v-combobox>
          <v-text-field
            v-model="newcard.name"
            label="Наименование"
            required
          ></v-text-field>

          <v-file-input
            v-model="pic1new"
            accept=".png, .jpg, .jpeg"
            autofocus
            show-size
            label="Новая картинка-иконка"
            @change="previewImagePic1"
          >
          </v-file-input>
          <img :src="pic1" style="width: 90px" class="" />
          <v-file-input
            v-model="pic2new"
            accept=".png, .jpg, .jpeg"
            autofocus
            show-size
            label="Новая Картинка для Слайдера"
            @change="previewImagePic2"
          >
          </v-file-input>
          <img :src="pic2" style="width: 400px" class="" />
          <v-file-input
            v-model="path_to_file_pdf"
            class="mt-3"
            accept=".pdf"
            autofocus
            show-size
            :label="`Файл PDF для загрузки, был: ${newcard.path_pdf}`"
            @change="previewPathToFilePDF"
          ></v-file-input>
          <v-toolbar dense flat
            ><v-spacer /><v-btn text @click="saveNewBlock"
              >Записать блок</v-btn
            ></v-toolbar
          >
        </v-card>
      </v-container>
      <v-container
        fluid
        style="
          max-width: 70vw;
          max-height: 70vh;
          min-height: 70vh;
          overflow-y: scroll;
          overflow-x: hidden;
        "
      >
        <v-row align="start" justify="space-around">
          <v-col v-for="(item, $index) in list" :key="$index" class="" cols="3">
            <!-- <v-card-subtitle> {{ item.id }} {{ item.header }} </v-card-subtitle> -->
            <v-hover v-slot:default="{ hover }">
              <v-card
                max-width="140"
                :class="`${
                  hover ? 'grey lighten-2' : 'grey lighten-3'
                } pt-4 mx-auto`"
                style="position: pointer"
                target="_blank"
                @click="openNewCard(item)"
              >
                <img
                  :src="item.icon"
                  class="d-block mx-auto"
                  style="width: 90px"
                />
                <v-divider class="my-3 mx-3" />
                <v-card-subtitle class="caption text-center pa-1 pt-0 pb-2">
                  {{ item.header }}
                </v-card-subtitle>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>

        <infinite-loading @infinite="infiniteHandler"></infinite-loading>
      </v-container>
    </v-container>
  </div>
</template>

<script>
// import axios from "axios";

import { mapGetters } from "vuex";
const pageSize = 12;

export default {
  layout: "",

  data() {
    return {
      list: [],
      newcard: null,
      pic1: null,
      pic1new: null,
      pic2: null,
      pic2new: null,
      path_to_file_pdf: null,
      data_file_pdf: null,
      selectCity: [],
      selectedFile: "",
    };
  },

  computed: {
    ...mapGetters({
      filials: "headerMenu/getCityNameClassicOrder",
    }),
  },
  mounted() {},

  methods: {
    getRandomString(length) {
      const randomChars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += randomChars.charAt(
          Math.floor(Math.random() * randomChars.length)
        );
      }
      return result;
    },
    erasePrefixImgBlob(blobData) {
      let res = blobData ? blobData.split(";base64,") : null;

      if (res[1]) {
        return res[1] ? res[1].trim() : null;
      }

      res = blobData ? blobData.split("; base64,") : null;

      return res[1] ? res[1].trim() : null;
    },
    async saveNewBlock() {
      const tmpSelectCity = [0, 0, 0, 0, 0, 0, 0];
      this.selectCity.forEach((item, i) => {
        tmpSelectCity[this.filials.indexOf(item)] = 1;
      });
      this.newcard.filials = tmpSelectCity;

      if (this.pic1new) {
        this.newcard.pic1 = this.erasePrefixImgBlob(this.pic1);
      }

      if (this.pic2new) {
        this.newcard.pic2 = this.erasePrefixImgBlob(this.pic2);
        this.newcard.pic2name =
          "pic2_postfix_" + this.getRandomString(22) + "_" + this.pic2new.name;
      }

      if (this.data_file_pdf) {
        this.newcard.data_file_pdf = this.erasePrefixImgBlob(
          this.data_file_pdf
        );
        this.newcard.path_pdf_new =
          "pdf_postfix_" +
          this.getRandomString(22) +
          "_" +
          this.path_to_file_pdf.name;

        //
        const formData = new FormData();

        formData.append(
          "pdf_doc",
          this.selectedFile,
          this.newcard.path_pdf_new
        );
        await fetch("https://www.newfurnitura.ru/news", {
          // await fetch("http://localhost:5000/test", {
          method: "POST",
          body: formData,
        });
      }

      // console.log(this.getRandomString(22));

      // await this.$api("saveNewCard", { params: this.newcard });

      // let photo = document.getElementById("image-file").files[0];
    },
    readImgAsData(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onloadend = (res) => {
          resolve({ imgData: res.target.result });
        };

        reader.readAsDataURL(file);
      });
    },
    async previewImagePic1() {
      // this.pic1 = await URL.createObjectURL(this.pic1new);
      if (this.pic1new) {
        const { imgData } = await this.readImgAsData(this.pic1new);
        this.pic1 = imgData;
      }
    },
    async previewImagePic2() {
      if (this.pic2new) {
        // this.pic2 = URL.createObjectURL(this.pic2new);
        const { imgData } = await this.readImgAsData(this.pic2new);
        this.pic2 = imgData;
      }
    },
    async previewPathToFilePDF(file) {
      // debugger;
      if (this.path_to_file_pdf) {
        // this.pic2 = URL.createObjectURL(this.pic2new);
        const { imgData } = await this.readImgAsData(this.path_to_file_pdf);
        this.data_file_pdf = imgData;

        this.selectedFile = file;
      }
    },
    async openNewCard(item) {
      // debugger;
      const rows = await this.$api("getNewCard", item);
      if (rows.length) {
        this.newcard = rows[0];
        this.pic1 = this.newcard.pic1;
        this.pic2 = "https://www.newfurnitura.ru/news/" + this.newcard.pic2;
        this.selectCity = [];
        this.newcard.filials.forEach((pos, ind) => {
          if (pos === 1) {
            this.selectCity.push(this.filials[ind]);
          }
        });
      } else {
        this.newcard = null;
      }
    },
    getPathPdf(item) {
      // debugger;
      const res =
        item && item.path_pdf
          ? (item.path_pdf.includes("advs")
              ? "https://newfurnitura.ru/"
              : "https://newfurnitura.ru/news/") + item.path_pdf
          : "/";
      return res;
    },
    async infiniteHandler($state) {
      const rows = await this.$api("getNewsArhive", {
        pageSize,
        currentLength: this.list.length,
      });

      if (rows.length) {
        this.list.push(...rows);
        $state.loaded();
      } else {
        $state.complete();
      }
    },
  },
};
</script>

<style scoped></style>
