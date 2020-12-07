<template>
  <v-toolbar-items style="align-items: center">
    <template v-for="(item, i) in header.items">
      <span v-if="item == '|'" :key="i" :class="header.css_class"
        >{{ item }}
      </span>
      <v-menu v-else-if="item.submenu" :key="i" offset-y z-index="10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            max-height="40px"
            v-bind="attrs"
            :class="[header.css_class, { buttonMFMenu: item.submenu }]"
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
            <v-list-item-title :class="subitem.css_class">{{
              subitem.name
            }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        v-else-if="item.name == 'disabled'"
        :key="i"
        text
        max-height="40px"
        disabled
      >
      </v-btn>
      <v-menu
        v-else-if="item.name == 'addresses' && addresses"
        :key="i"
        offset-y
        z-index="10"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            max-height="40px"
            v-bind="attrs"
            :class="[header.css_class, 'buttonMFMenu']"
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
              <v-list-item-title class="buttonMFGreyColor">{{
                subitem1.phone
              }}</v-list-item-title>
              <v-list-item-subtitle>{{ subitem1.city }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn
        v-else
        :key="i"
        text
        max-height="40px"
        :class="[header.css_class]"
        :to="item.ref"
      >
        {{ item.name }}
      </v-btn>
    </template>
  </v-toolbar-items>
</template>

<script>
export default {
  props: ["header", "addresses"],
  data() {
    return {};
  },
  computed: {},
};
</script>

<style lang="scss" scoped></style>
