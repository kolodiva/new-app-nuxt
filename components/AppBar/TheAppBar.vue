<template>
  <div>
    <v-app-bar
      v-show="showSecondMenu"
      class="greyMfBckg"
      height="50"
      fixed
      width="100vw"
      dark
    >
      <v-badge
        v-if="showLimitWidth"
        color="pink"
        dot
        overlap
        offset-x="20px"
        offset-y="20px"
      >
        <v-app-bar-nav-icon
          v-if="showLimitWidth"
          @click="drawerHeader3 = true"
        ></v-app-bar-nav-icon>
      </v-badge>

      <v-toolbar-title v-if="!showLimitWidth">
        <n-link to="/">
          <v-img
            class="pt-5"
            src="/logo_small.png"
            max-height="50"
            max-width="90"
            contain
          />
        </n-link>
      </v-toolbar-title>

      <v-menu v-if="showLimitWidth && filials" offset-y z-index="10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            max-height="40px"
            v-bind="attrs"
            :class="[header2.css_class, 'buttonMFMenu']"
            v-on="on"
          >
            {{ filials[0].phone }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(subitem1, index) in filials"
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

      <TheToolbarItems v-if="!showLimitWidth" :header="header3" />
      <v-spacer />
      <TheSearchField />
      <v-spacer />
      <v-badge
        :value="cartCount > 0"
        :content="cartCount"
        :class="[header2.css_class]"
        overlap
      >
        <v-img
          src="/korzina_belaya.png"
          width="30"
          contain
          class=""
          style="cursor: pointer"
          @click="$router.push('/cart')"
        />
      </v-badge>
      <v-btn id="yourCity" text :class="['buttonMFWhiteColor']"> </v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawerHeader3" app temporary dark width="350">
      <v-toolbar dense color="transparent" flat @click="drawerHeader3 = false">
        <v-spacer />
        <v-btn icon>
          <v-icon>mdi-undo-variant</v-icon>
        </v-btn>
      </v-toolbar>
      <v-divider />
      <v-list nav>
        <v-list-item-group v-model="groupHeader3" active-class="">
          <template v-for="(item, i) in header3.items">
            <v-list-group v-if="item.submenu" :key="i">
              <template v-slot:activator>
                <v-list-item-title>{{ item.name }}</v-list-item-title>
              </template>

              <v-list-item
                v-for="(item1, i1) in item.submenu"
                :key="i1 * 100 + 1"
              >
                <v-list-item-title class="ml-5">{{
                  item1.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <v-list-item v-else :key="i">
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>
      <v-divider />
      <v-list nav>
        <v-list-item-group v-model="groupHeader3" active-class="">
          <template v-for="(item2, i2) in header2.items">
            <v-list-group v-if="item2.submenu" :key="i2 * 100 + 1">
              <template v-slot:activator>
                <v-list-item-title>{{ item2.name }}</v-list-item-title>
              </template>

              <v-list-item
                v-for="(item3, i3) in item2.submenu"
                :key="i3 * 1000 + 1"
              >
                <v-list-item-title class="ml-5">{{
                  item3.name
                }}</v-list-item-title>
              </v-list-item>
            </v-list-group>

            <div
              v-else-if="item2.id === 3 || item2 === '|'"
              :key="i2 * 100 + 1"
              style="height: 0"
            ></div>

            <v-list-item v-else :key="i2 * 100 + 1">
              <v-list-item-title>{{ item2.name }}</v-list-item-title>
            </v-list-item>
          </template>
        </v-list-item-group>
      </v-list>

      <v-divider />

      <v-list-group>
        <template v-slot:activator>
          <v-list-item-title>Каталог</v-list-item-title>
        </template>

        <v-treeview
          v-model="tree"
          :items="strucCatalog"
          item-key="node_id"
          hoverable
          rounded
          activatable
          transition
          dense
          :open="open"
          :active="active"
          @update:active="fetchUsers"
        >
        </v-treeview>
      </v-list-group>
    </v-navigation-drawer>
    <v-toolbar height="105" width="100vw" flat>
      <v-toolbar-title>
        <n-link to="/">
          <v-img
            class=""
            src="/logo_big.png"
            max-height="80"
            max-width="212"
            contain
          />
        </n-link>
      </v-toolbar-title>
      <v-spacer />
      <TheToolbarItems :header="header1" />
      <v-spacer />
      <div v-if="userEmail">
        <v-menu open-on-hover bottom offset-y rounded>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text class="buttonMFGreyColorBold" v-bind="attrs" v-on="on">
              {{ userEmail }}
            </v-btn>
          </template>

          <v-list>
            <v-list-item link>
              <v-list-item-title
                style="cursor: pointer"
                @click="$emit('logout')"
                >Выйти из аккаунта</v-list-item-title
              >
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
      <div v-else>
        <v-btn text class="buttonMFGreyColorBold" nuxt to="/login">
          Войти
        </v-btn>
      </div>
    </v-toolbar>
    <v-toolbar class="greyMfBckg" height="50" width="100vw">
      <v-badge
        v-if="showLimitWidth"
        color="pink"
        dot
        overlap
        offset-x="20px"
        offset-y="20px"
      >
        <v-app-bar-nav-icon
          v-if="showLimitWidth"
          color="white"
          @click="drawerHeader3 = true"
        ></v-app-bar-nav-icon>
      </v-badge>

      <TheToolbarItems
        v-if="!showLimitWidth"
        :header="header2"
        :addresses="filials"
      />

      <v-menu v-if="showLimitWidth && filials" offset-y z-index="10">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            text
            max-height="40px"
            v-bind="attrs"
            :class="[header2.css_class, 'buttonMFMenu']"
            v-on="on"
          >
            {{ filials[0].phone }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(subitem1, index) in filials"
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

      <v-spacer />
      <TheSearchField />
      <v-spacer />

      <v-badge
        :value="cartCount > 0"
        :content="cartCount"
        :class="[header2.css_class, 'mr-2']"
        overlap
      >
        <v-img
          src="/korzina_belaya.png"
          width="30"
          contain
          class=""
          style="cursor: pointer"
          @click="$router.push('/cart')"
        />
      </v-badge>
    </v-toolbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: ["showSecondMenu", "userEmail"],
  data() {
    return {
      drawerHeader3: false,
      groupHeader3: null,

      widthLimit: 1000,

      tree: [],
      open: [],
      active: [],
    };
  },
  computed: {
    ...mapGetters({
      header1: "headerMenu/getHeader1",
      header2: "headerMenu/getHeader2",
      header3: "headerMenu/getHeader3",
      filials: "headerMenu/getAllSortCity",
      cartCount: "nomenklator/getCartCount",
      showLimitWidth: "service/getShowLimitWidth",
      strucCatalog: "nomenklator/strucCatalog",
    }),
  },
  mounted() {},
  methods: {
    fetchUsers(items) {
      // console.log(items[0]);
      if (items.length > 0) {
        this.drawerHeader3 = false;
        this.$router.push("/catalog/" + items[0]);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
