<template>
  <v-container class="my-5" style="max-width: 800px">
    <ThePageHeader descr="Разделы каталога" />
    <v-row align="start" justify="space-around">
      <n-link
        v-for="(pos, id) in nomenklTopLevel"
        :key="id"
        :to="`catalog/${pos.file_name}`"
        style="text-decoration: none"
      >
        <v-card class="ma-1" tile flat>
          <v-hover v-slot:default="{ hover }">
            <v-img
              eager
              :src="`./index_pic/${pos.file_name}.png`"
              contain
              width="160"
              height="160"
              :class="`${hover ? 'grey lighten-3' : 'grey lighten-2'}`"
              style="border-radius: 10px; border: 20px solid #eaecec"
              aspect-ratio="1"
              :alt="`${pos.name}`"
            />
          </v-hover>

          <v-card-text class="text-center pt-2 pb-0" style="max-width: 160px">
            <span class="textMFGreyColor">{{ pos.name }}</span>
          </v-card-text>
        </v-card>
      </n-link>
    </v-row>
    <TheTextInfo class="mt-10" is-main="true" />
  </v-container>
</template>

<script>
// import $ from "jquery";
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters({
      nomenklTopLevel: "service/getNomenklTopLevel",
    }),
  },
  mounted() {
    // window.$("article").moreContent({
    //   height: 200,
    //   shadow: true,
    // });
    // $("article").readmore({
    //   speed: 5000,
    //   collapsedHeight: 170,
    //   moreLink:
    //     '<a href="#" style="display: block; text-align: right; margin-top: 0px;">Показать всю статью...</a>',
    //   lessLink:
    //     '<a href="#" style="display: block; text-align: right; margin-top: 0px;">Свернуть</a>',
    //   heightMargin: 16,
    //   afterToggle(trigger, element, expanded) {
    //     if (!expanded) {
    //       // The "Close" link was clicked
    //       $("html, body").animate(
    //         { scrollTop: element.offset().top },
    //         { duration: 100 }
    //       );
    //     }
    //   },
    // });
  },
};
</script>
