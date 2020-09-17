<template>
  <v-breadcrumbs
    :items="breadCrumb"
    class="mt-10"
    style="justify-content: center"
  >
    <template v-slot:divider>
      <v-icon>mdi-chevron-right</v-icon>
    </template>
  </v-breadcrumbs>
</template>
<script>
export default {
  props: ["breadCrumb"],
};
</script>
