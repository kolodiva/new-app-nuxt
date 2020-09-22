<template>
  <v-footer padless class="blueMfBckg" dark>
    <v-row class="" style="min-height: 250px">
      <v-col> </v-col>
      <v-divider vertical class=""></v-divider>
      <v-col> </v-col>
      <v-divider vertical class=""></v-divider>
      <v-col>
        <v-list subheader class="blueMfBckg">
          <v-subheader>Наши офисы</v-subheader>
          <template v-for="(link, id) in filials">
            <v-list-item :key="(id + 1) * 10" @click="111">
              <v-list-item-content>
                <v-list-item-title v-html="link.city"></v-list-item-title>
                <v-list-item-subtitle
                  v-html="link.phone"
                ></v-list-item-subtitle>
                <v-list-item-subtitle
                  v-html="link.email"
                ></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-img src="/shema_proezda.png" width="30" contain />
              </v-list-item-icon>
            </v-list-item>

            <v-divider :key="(id + 1) * 100"></v-divider>
          </template>
        </v-list>
      </v-col>
    </v-row>
    <v-col class="white pa-1" cols="12" justify="left">
      <span class="textMFGreyColor"
        >&copy; MF KOMPLEKT 2003-{{ new Date().getFullYear() }}</span
      >
    </v-col>
  </v-footer>
</template>

<script>
export default {
  props: ["filials"],
};
</script>
