<template>
  <div>
    <v-app-bar v-show="showSecondMenu" dark height="50" fixed width="100%">
      <v-toolbar-title>
        <img
          src="logo_small.png"
          style="height: 50; width: 90; padding-top: 5px"
        />
      </v-toolbar-title>
      <v-btn text style=""> НА СТАРУЮ ВЕРСИЮ САЙТА </v-btn>
      <v-btn text style=""> О КОМПАНИИ </v-btn>
      <v-btn text style=""> НОВОСТИ </v-btn>
      <v-btn text style=""> СКАЧАТЬ </v-btn>
      <v-btn text style=""> КОНТАКТЫ </v-btn>
      <v-btn text style=""> ЗАГРУЗИТЬ ВАШ ЗАКАЗ </v-btn>
      <v-btn text style=""> СПЕЦ.УСЛОВИЯ </v-btn>
      <v-btn text style=""> КОРЗИНА </v-btn>
      <v-spacer />
      <v-btn text style=""> ГЕО.ИНФ. </v-btn>
    </v-app-bar>
    <v-toolbar height="105" color="primary" flat light>
      <v-toolbar-title>
        <img src="logo_big.png" style="height: 80; width: 212" />
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items>
        <v-btn text style="background-color: white"> О КОМПАНИИ </v-btn>
        <v-btn text style="background-color: white"> НОВОСТИ </v-btn>
        <v-btn text style="background-color: white"> СКАЧАТЬ </v-btn>
        <v-btn text style="background-color: white"> КОНТАКТЫ </v-btn>
      </v-toolbar-items>

      <v-spacer />

      <v-btn text style="background-color: white"> ВОЙТИ </v-btn>
    </v-toolbar>
    <v-toolbar dark height="50">
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn class="" v-bind="attrs" v-on="on"> ДОСТАВКА </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in items" :key="item">
            <v-list-item-title v-text="item" />
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text style=""> ДОП.УСЛОВИЯ </v-btn>
      <v-btn text style=""> ВОПРОС-ОТВЕТ </v-btn>
      <v-btn text style=""> СПЕЦУСЛОВИЯ </v-btn>
      <v-btn text style="" disabled />
      <v-btn text style=""> +7 (495) 149-00-02 (МНОГОКАН.) </v-btn>
      <v-spacer />
      <v-btn text style=""> КОРЗИНА </v-btn>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      items: [...Array(4)].map((_, i) => `Item ${i}`),
    };
  },
  computed: {
    ...mapGetters({
      showSecondMenu: "service/showSecondMenu",
    }),
  },
};
</script>
