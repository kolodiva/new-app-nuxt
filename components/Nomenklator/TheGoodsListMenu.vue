<template>
  <v-toolbar dense flat rounded bordered>
    <v-toolbar-title class="body-2">Сортировать по:</v-toolbar-title>

    <v-toolbar-title class="body-2 font-weight-medium ml-4"
      >по алфавиту</v-toolbar-title
    >
    <v-divider
      vertical
      class="mx-2 my-auto"
      inset
      style="height: 16px"
    ></v-divider>
    <v-toolbar-title class="body-2">популярности</v-toolbar-title>
    <v-divider
      vertical
      class="mx-2 my-auto"
      inset
      style="height: 16px"
    ></v-divider>
    <v-toolbar-title class="body-2">цене</v-toolbar-title>
    <v-divider
      vertical
      class="mx-2 my-auto"
      inset
      style="height: 16px"
    ></v-divider>
    <v-toolbar-title class="body-2">новизне</v-toolbar-title>
    <v-divider
      vertical
      class="mx-2 my-auto"
      inset
      style="height: 16px"
    ></v-divider>
    <v-toolbar-title class="body-2">скидке</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-title class="body-2">Показать по:</v-toolbar-title>

    <v-toolbar-title class="body-2 font-weight-medium ml-4">30</v-toolbar-title>
    <v-divider
      vertical
      class="mx-2 my-auto"
      inset
      style="height: 16px"
    ></v-divider>
    <v-toolbar-title class="body-2">60</v-toolbar-title>
    <v-divider
      vertical
      class="mx-2 my-auto"
      inset
      style="height: 16px"
    ></v-divider>
    <v-toolbar-title class="body-2">90</v-toolbar-title>
    <v-divider
      vertical
      class="mx-2 my-auto"
      inset
      style="height: 16px"
    ></v-divider>

    <v-spacer></v-spacer>

    <v-toolbar-title class="body-2">Вид каталога:</v-toolbar-title>

    <v-toolbar-title class="body-2 ml-4"
      ><v-icon color="black">mdi-apps </v-icon></v-toolbar-title
    >
    <v-toolbar-title class="body-2 ml-4"
      ><v-icon>mdi-format-list-checkbox </v-icon></v-toolbar-title
    >
    <v-toolbar-title class="body-2 ml-4"
      ><v-icon>mdi-view-headline</v-icon></v-toolbar-title
    >
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {},
  mounted() {},
};
</script>

<style></style>
