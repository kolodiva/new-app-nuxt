<template>
  <div style="max-width: 830px" class="mx-auto px-5">
    <article style="overflow-y: hidden; color: #565656" v-html="seoText" />
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// const seoText =
//   this.props.isMain && this.props.isMain === true
//     ? "nomenklator/getSeoText"
//     : "nomenklator/getSeoText";

export default {
  props: ["isMain"],

  data() {
    return {
      textHide: `<section> \
       <h2 class='mb-5' align='center'>ПЕТЛИ ЧЕТЫРЕХШАРНИРНЫЕ</h2> \
       <p align='justify'> \
           Сегодня на рынке представлено большое разнообразие петель для распахивающихся фасадов. Давайте же разберемся в этом поподробнее. В зависимости от области применения четырехшарнирные петли бывают следующих видов: \
       </p> \
       <ul type='circle'> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_s_dovodchikom_scrt'>Петли с доводчиком</a></li> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_uglovie_45_135_gradusov_scrt'>Петли угловые 45-135 градусов</a></li> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_uglovie_30_120_gradusov_scrt'>Петли угловые 30-120 градусов</a></li> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_uglovie_90_180_gradusov_dlya_falshpaneli_scrt'>Петли угловые 90-180 градусов</a></li> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_uglovie_165_175_gradusov_scrt'>Петли угловые 165-175 градусов</a></li> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_gradusnie_i_karuselnie_scrt'>Градусные и карусельные петли</a></li> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_nakladnie_scrt'>Петли накладные</a></li> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_polunakladnie_scrt'>Петли полунакладные</a></li> \
           <li><a target='blank' href='https://www.newfurnitura.ru/catalog/petli_4_h_sharnirnie_vkladnie_scrt'>Петли вкладные</a></li> \
       </ul> \
       <p align='justify'> \
      В нашей линейке вы найдете механизмы для любой мебели. \
       </p> \
       <p align='justify'> \
      <a href='https://newfurnitura.ru/catalog/petli_52gramma' target='_blank' style=''>Для «эконом» класса - </a>недорогие, но качественные петли с доводчиком. Кроме того сможете заказать продукцию для мебели класса «комфорт» под нашим собственным брендом \
       <a href='https://newfurnitura.ru/catalog/petli_mf_s_dovodchikom' target='_blank' style=''>MF PRIMA</a>, \
       </p> \
       <p align='justify'> \
      В нашем каталоге присутствуют несколько линеек мебельных петель итальянского производителя FGV.  Например MS SLIDE ON с возможностью установки доводчика ALFA. Петли INTEGRA 2 WAY со встроенным доводчиком. \
      </p> \
      </section>`,
    };
  },
  computed: {
    seoText() {
      const pathStore =
        this.isMain === "true"
          ? "nomenklator/getSeoTextMain"
          : "nomenklator/getSeoText";

      return this.$store.getters[pathStore];
    },
    // ...mapGetters({
    //   seoText: "nomenklator/getSeoText",
    // }),
    // nomenklator() {
    //   return this.getSeoText({ isMain: true });
    // },
  },
};
</script>
