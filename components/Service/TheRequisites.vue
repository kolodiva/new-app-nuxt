<template>
  <v-card color="transparent" outlined>
    <v-card-title class="subtitle-1 justify-center">
      <h2>РЕКВИЗИТЫ</h2>
    </v-card-title>
    <v-card-text class="body-1 black--text text-left">
      {{ requisite.full_name }}<br />
      <b>ИНН</b>
      {{ requisite.inn }} / <b>КПП</b> {{ requisite.kpp }}<br />
      <b>ОГРН</b> {{ requisite.ogrn }}<br />
      <b>Юр.адрес</b>: {{ requisite.legal_address }}<br />
      <b>Факт.адрес</b>: {{ requisite.fact_address }}<br />
      <b>Тел</b> {{ requisite.contact_info }}<br />
      <b>р/сч</b> {{ requisite.payment_account }}<br />
      <b>к/сч </b>{{ requisite.correspondent_account }}<br />
      <b>БИК</b> {{ requisite.bic }}
    </v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      requisite: "headerMenu/getRequisites",
    }),
  },
};
</script>
