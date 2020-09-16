<template>
  <v-footer class="blueMfBckg" padless>
    <v-row
      align="end"
      justify="space-around"
      class=""
      style="min-height: 250px"
    >
      <v-card
        v-for="(link, id) in filials"
        :key="id"
        class="blueMfBckg ma-3 pa-2"
        outlined
        tile
        max-width="230"
        style="border-color: transparent"
      >
        <v-card-title
          class="py-0 pb-3 pl-2"
          style="letter-spacing: 0.03em; font-weight: bold"
          :style="{ color: id == 0 ? 'white' : 'transparent' }"
          >НАШИ ФИЛИАЛЫ</v-card-title
        >

        <v-list-item class="pa-0">
          <v-list-item-icon class="mr-1"
            ><v-img src="shema_proezda.png" width="40" contain />
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              ><span class="bigTextFooterWhiteColor">{{
                link.city
              }}</span></v-list-item-title
            >
            <v-list-item-subtitle
              ><span class="smallTextFooterWhiteColor"
                >о нашем офисе</span
              ></v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-card>
      <v-col class="white py-1" cols="12" justify="left">
        <span class="buttonMFGreyColorSmall ml-2"
          >&copy; MF KOMPLEKT 2003-{{ new Date().getFullYear() }}</span
        >
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  props: ["filials"],
};
</script>
