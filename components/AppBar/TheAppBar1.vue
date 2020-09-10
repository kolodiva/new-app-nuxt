<template>
  <div>
    <v-app-bar
      v-show="showSecondMenu"
      class="gMfBckg"
      height="50"
      fixed
      width="100%"
      dark
    >
      <v-toolbar-title>
        <img
          src="logo_small.png"
          style="height: 50; width: 90; padding-top: 5px"
        />
      </v-toolbar-title>
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
    <v-toolbar height="105" flat>
      <v-toolbar-title>
        <img src="logo_big.png" style="height: 80; width: 212" />
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items style="align-items: center" class="bMfBckg">
        <div v-for="(item, i) in menuPoints1" :key="i">
          <v-btn text max-height="40px" :ripple="{ class: 'red--text' }">
            {{ item }}
          </v-btn>
          <span v-if="i < 3" style=""> | </span>
        </div>
      </v-toolbar-items>

      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn text v-bind="attrs" class="gMfBckg2" v-on="on"> Войти </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items1"
            :key="index"
            @click="111"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-toolbar class="gMfBckg" height="50">
      <v-spacer />

      <v-menu offset-y>
        <template v-slot:activator="{ attrs, on }">
          <v-btn text v-bind="attrs" v-on="on"> ДОСТАВКА </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="item in items" :key="item" @click="111">
            <v-list-item-title v-text="item" />
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn text style=""> ДОП.УСЛОВИЯ </v-btn>
      <v-btn text style=""> ВОПРОС-ОТВЕТ </v-btn>
      <v-btn text style=""> СПЕЦУСЛОВИЯ </v-btn>
      <v-btn text style="" disabled />
      <v-btn text style=""> +7 (495) 925-26-27 (МНОГОКАН.) </v-btn>
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
      menuPoints1: ["О компании", "Новости", "Скачать", "Контакты"],
      items: [...Array(4)].map((_, i) => `Item ${i}`),
      items1: [
        { title: "Click 1" },
        { title: "Click 2" },
        { title: "Click 3" },
        { title: "Click 4" },
      ],
    };
  },
  computed: {
    ...mapGetters({
      showSecondMenu: "service/showSecondMenu",
    }),
  },
};
</script>

<style lang="scss" scoped>
.v-btn .v-input__slot::before {
  border-color: grey !important;
}
</style>
