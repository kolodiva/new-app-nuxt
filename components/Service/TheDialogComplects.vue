<template>
  <v-dialog
    v-model="openDialog"
    max-width="800"
    @click:outside.stop="$emit('closeWin')"
    @keydown.esc.stop="$emit('closeWin')"
  >
    <v-card class="" flat>
      <v-toolbar dark color="primary" flat>
        <v-card-title>Комлектующая</v-card-title>
        <v-spacer></v-spacer>
        <v-btn icon dark class="" @click="$emit('closeWin')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-title class="fontSize1rem"
        >{{ infoComplectPos.artikul }}, {{ infoComplectPos.name }}<br />
        {{ fromCart ? "всего по комплекту: " : "в единице комплекта: " }}
        {{ infoComplectPos.qty }} x
        {{ infoComplectPos.unit_name }}
      </v-card-title>

      <v-img
        :src="infoComplectPos.pic_path"
        contain
        max-width="400px"
        class="mx-auto"
      />
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["closeWin", "infoComplectPos", "openDialog", "fromCart"],

  computed: {},
  methods: {},
};
</script>
