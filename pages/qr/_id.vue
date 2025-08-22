<template>
  <v-card class="mx-auto mt-12" max-width="600px" >
    <v-toolbar
      flat
      color="primary"
      dark
    >
      <v-toolbar-title style="font-size: 0.875rem; font-weight: 400; height: 55px; letter-spacing: 0.00714286em;">20200, HG1112.C0.B.45<br/>3D петля UNIHOPPER с доводчиком, накладная, 45мм, с декор. накладкой</v-toolbar-title>
    </v-toolbar>
    <v-tabs vertical grow style="min-height: 400px;">
      <v-tab>
        <img  src="https://www.newfurnitura.ru/upload/9968870c-64ab-4b95-8552-62cb7bc7_250x250.jpg " alt="3D петля UNIHOPPER с доводчиком, накладная, 45мм, с декор. накладкой " style="max-width: 100px; object-fit: contain;">
      </v-tab>
      <v-tab>
        <img  src="https://www.newfurnitura.ru/upload/9968870c-64ab-4b95-8552-62cb7bc7_250x250_1.jpg" alt="3D петля UNIHOPPER с доводчиком, накладная, 45мм, с декор. накладкой " style="max-width: 100px; object-fit: contain;">
      </v-tab>
      <v-tab>
        <img  src="https://www.newfurnitura.ru/upload/9968870c-64ab-4b95-8552-62cb7bc7_250x250_2.jpg" alt="3D петля UNIHOPPER с доводчиком, накладная, 45мм, с декор. накладкой " style="max-width: 100px; object-fit: contain;">
      </v-tab>

      <v-tab-item>
        <v-card flat>
            <img  src="https://www.newfurnitura.ru/upload/9968870c-64ab-4b95-8552-62cb7bc7.jpg " alt="3D петля UNIHOPPER с доводчиком, накладная, 45мм, с декор. накладкой " class="d-block mx-auto" style="min-height: 400px; max-width: 400px; cursor: pointer;">        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <img  src="https://www.newfurnitura.ru/upload/9968870c-64ab-4b95-8552-62cb7bc7_1.jpg" alt="3D петля UNIHOPPER с доводчиком, накладная, 45мм, с декор. накладкой " class="d-block mx-auto" style="min-height: 400px; max-width: 400px; cursor: pointer;">
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <img  src="https://www.newfurnitura.ru/upload/9968870c-64ab-4b95-8552-62cb7bc7_2.jpg" alt="3D петля UNIHOPPER с доводчиком, накладная, 45мм, с декор. накладкой " class="d-block mx-auto" style="min-height: 400px; max-width: 400px; cursor: pointer;">
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>

export default {
  async fetch({ app, params, query, store, router, redirect, error }) {
    if (params && params) {
       console.log(params);
      //const res = await store.dispatch("nomenklator/loadGoodCard", params);

      if (!res) {
        error({ statusCode: 404, message: "Товарная позиция НЕ найдена" });
      }
    }
  },
};
</script>
