<template>
  <div>
    <TheVueSlickCarousel />
    <v-container
      v-if="estKontakt"
      id="section_1"
      class="my-5"
      style="max-width: 800px"
    >
      <ThePageHeader descr="რეკლამა არის პროგრესის ძრავა" />
      <v-toolbar dense flat
        ><v-spacer /><v-btn text @click="openNewCard(false)"
          >Добавить Новый блок</v-btn
        ></v-toolbar
      >
      <v-container fluid style="max-width: 70vw; min-height: 10vh">
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
            ref="filepdfupload0"
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
            ref="filepdfupload1"
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
            ref="filepdfupload2"
            v-model="path_to_file_pdf"
            clearable
            class="mt-3"
            accept=".pdf"
            autofocus
            show-size
            :label="
              newcard.path_pdf
                ? `Файл PDF для загрузки, был: ${newcard.path_pdf}`
                : 'Файл PDF для загрузки'
            "
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
          max-height: 100vh;
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
    <v-container v-else style="max-width: 800px" min-height="30vh">
      <h2 class="my-15">
        Приветствуем тебя усталый Путник. Далеко ты забрел, но пусто здесь ...
      </h2>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

import { mapGetters } from "vuex";
const pageSize = 24;

export default {
  data() {
    return {
      list: [],
      newcard: null,
      pic1: null,
      pic1new: null,
      pic2: null,
      pic2new: null,
      path_to_file_pdf: null,
      selectedFile1: "",
      selectedFile2: "",
      selectedFile3: "",
      selectCity: [],
    };
  },

  computed: {
    ...mapGetters({
      filials: "headerMenu/getCityNameClassicOrder",
    }),
    estKontakt() {
      const userInfo = this.$store.state.nomenklator.userInfo;

      return userInfo
        ? userInfo.email.toLowerCase() === "afmc@mail.ru" ||
            userInfo.email.toLowerCase() === "adv.mfc@gmail.com"
        : false;
    },
  },
  mounted() {},

  methods: {
    async openNewCard(item) {
      // debugger;
      if (item) {
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
        }
      } else {
        this.newcard = {};
        this.newcard.id = "";
        this.newcard.on_slider = true;
        this.pic1 = null;
        this.pic1new = null;
        this.pic2 = null;
        this.pic2new = null;
        this.path_to_file_pdf = null;
        this.selectedFile1 = "";
        this.selectedFile2 = "";
        this.selectedFile3 = "";
        this.selectCity = [];
        this.filials.forEach((pos, ind) => {
          this.selectCity.push(this.filials[ind]);
        });
      }
      this.goTo("#section_1");
    },
    async saveNewBlock() {
      const tmpSelectCity = [0, 0, 0, 0, 0, 0, 0];
      this.selectCity.forEach((item, i) => {
        tmpSelectCity[this.filials.indexOf(item)] = 1;
      });
      this.newcard.filials = tmpSelectCity;

      if (this.selectedFile1) {
        this.newcard.pic1 = this.erasePrefixImgBlob(this.pic1);
        this.newcard.pic1name = "new icon";
      }
      // файл слайд
      if (this.selectedFile2) {
        this.newcard.pic2name =
          "pic2_postfix_" +
          this.getRandomString(22) +
          "_" +
          this.selectedFile2.name;

        //
        const formData = new FormData();

        formData.append("file", this.selectedFile2, this.newcard.pic2name);

        try {
          await axios.post("/loadfile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "green",
            text: `Ваш Файл Слайд успешно загружен.`,
            timeout: 5000,
          });
        } catch (e) {
          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "red",
            text: `Ошибка при загрузке Файла. Попробуйте позже.`,
            timeout: 5000,
          });
        }
      }

      // файл PDF
      if (this.selectedFile3) {
        this.newcard.path_pdf_new =
          "pdf_postfix_" +
          this.getRandomString(22) +
          "_" +
          this.path_to_file_pdf.name;

        //
        const formData = new FormData();

        formData.append("file", this.selectedFile3, this.newcard.path_pdf_new);

        try {
          await axios.post("/loadfile", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });

          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "green",
            text: `Ваш Файл PDF успешно загружен.`,
            timeout: 5000,
          });
        } catch (e) {
          await this.$store.dispatch("nomenklator/setSnackbar", {
            color: "red",
            text: `Ошибка при загрузке Файла. Попробуйте позже.`,
            timeout: 5000,
          });
        }
      }

      try {
        this.newcard.id = await this.$api("saveNewCard", {
          params: this.newcard,
        });

        this.selectedFile1 = "";
        this.selectedFile2 = "";
        this.selectedFile3 = "";
        // console.log(res);

        try {
          this.list = [];
          await this.infiniteHandler();
        } catch (e) {}

        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "green",
          text: `Данные Новостного блока сохранены.`,
          timeout: 5000,
        });
      } catch (e) {
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: `Ошибка при Сохранении данных Новостного блока. Попробуйте позже.`,
          timeout: 5000,
        });
      }
    },
    async previewImagePic1(file) {
      if (!file) {
        return;
      }

      if (file && file.size > 20000) {
        this.$refs.filepdfupload0.reset();
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: `Размер файла ограничен 20КБ. Длиннее никак либо звоните Виктору.`,
          timeout: 5000,
        });
        return;
      }
      if (this.pic1new) {
        const { imgData } = await this.readImgAsData(this.pic1new);
        this.pic1 = imgData;
      }
      this.selectedFile1 = file;
    },
    async previewImagePic2(file) {
      if (!file) {
        return;
      }

      if (file && file.size > 150000) {
        this.$refs.filepdfupload1.reset();
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: `Размер файла ограничен 150КБ. Длиннее никак либо звоните Виктору.`,
          timeout: 5000,
        });
        return;
      }

      if (this.pic2new) {
        const { imgData } = await this.readImgAsData(this.pic2new);
        this.pic2 = imgData;
      }

      this.selectedFile2 = file;
    },
    async previewPathToFilePDF(file) {
      if (!file) {
        return;
      }

      if (file && file.size > 15000000) {
        this.$refs.filepdfupload2.reset();
        await this.$store.dispatch("nomenklator/setSnackbar", {
          color: "red",
          text: `Размер файла ограничен 15MБ. Длиннее никак либо звоните Виктору.`,
          timeout: 5000,
        });
        return;
      }

      // debugger;
      // if (this.path_to_file_pdf) {
      this.selectedFile3 = file;
      // }
    },
    getPathPdf(item) {
      // debugger;
      const res =
        item && item.path_pdf
          ? (item.path_pdf.includes("advs")
              ? "https://www.newfurnitura.ru/"
              : "https://www.newfurnitura.ru/news/") + item.path_pdf
          : "/";
      return res;
    },
    goTo(element) {
      this.$vuetify.goTo(window.$(element).position().top);
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
