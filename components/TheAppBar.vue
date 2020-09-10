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

      <v-toolbar-items style="align-items: center">
        <template v-for="(item, i) in header1.items">
          <span v-if="item == '|'" :key="i" :class="header1.css_class"
            >{{ item }}
          </span>

          <v-menu v-else-if="item.submenu" :key="i" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                max-height="40px"
                v-bind="attrs"
                :class="[header1.css_class, { buttonMFMenu: item.submenu }]"
                v-on="on"
              >
                {{ item.name }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(subitem, index) in item.submenu"
                :key="index"
                @click="111"
              >
                <v-list-item-title :class="header1.css_class">{{
                  subitem.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            v-else
            :key="i"
            text
            max-height="40px"
            :class="[header1.css_class]"
          >
            {{ item.name }}
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer />

      <v-btn text class="buttonMFGreyColorBold"> Войти </v-btn>
    </v-toolbar>
    <v-toolbar class="greyMfBckg" height="50">
      <v-spacer />

      <v-toolbar-items style="align-items: center">
        <template v-for="(item1, i) in header2.items">
          <span v-if="item1 == '|'" :key="i" :class="header2.css_class"
            >{{ item1 }}
          </span>
          <v-menu v-else-if="item1.submenu" :key="i" offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                max-height="40px"
                v-bind="attrs"
                :class="[header2.css_class, { buttonMFMenu: item1.submenu }]"
                v-on="on"
              >
                {{ item1.name }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(subitem1, index) in item1.submenu"
                :key="index"
                @click="111"
              >
                <v-list-item-title :class="subitem1.css_class">{{
                  subitem1.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            v-else-if="item1.name == 'disabled'"
            :key="i"
            text
            max-height="40px"
            disabled
          >
          </v-btn>
          <v-menu
            v-else-if="item1.name == 'addresses' && addresses"
            :key="i"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                text
                max-height="40px"
                v-bind="attrs"
                :class="[header2.css_class, 'buttonMFMenu']"
                v-on="on"
              >
                {{ addresses[0].phone }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(subitem1, index) in addresses"
                :key="index"
                @click="111"
              >
                <v-list-item-content>
                  <v-list-item-title :class="buttonMFGreyColor">{{
                    subitem1.phone
                  }}</v-list-item-title>
                  <v-list-item-subtitle>{{
                    subitem1.city
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
          <v-btn
            v-else
            :key="i"
            text
            max-height="40px"
            :class="[header2.css_class]"
          >
            {{ item1.name }}
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer />
      <v-btn text :class="[header2.css_class]"> КОРЗИНА </v-btn>
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
      header1: "headerMenu/getHeader1",
      header2: "headerMenu/getHeader2",
      addresses: "headerMenu/getAllSortCity",
      showSecondMenu: "service/showSecondMenu",
    }),
  },
};
</script>

<style lang="scss" scoped></style>
