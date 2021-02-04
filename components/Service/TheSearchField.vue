<template>
  <v-autocomplete
    v-model="select"
    dark
    dense
    rounded
    clearable
    prepend-inner-icon="mdi-magnify"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    class=""
    hide-no-data
    hide-details
    placeholder="Введите часть Артикула или Наименования..."
    style=""
    solo-inverted
    no-data-text="Не найдено запрошенных данных..."
    no-filter
    @change="onClick"
  ></v-autocomplete>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      items: [],
      search: null,
      select: null,
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    onClick(e) {
      if (e) {
        let path = "";

        if (e.itgroup) {
          path = `/catalog/${e.parentguid}`;
        } else {
          path = `/catalog/${e.parentguid}/${e.synonym}`;
        }

        this.$router.push(path);
      }

      // console.log(e);
    },

    async querySelections(v) {
      if (this.loading || v.length < 3 || v.length > 100) {
        return;
      }

      this.loading = true;
      // Simulated ajax query
      // console.log("v", v);
      try {
        const states = await this.$api("searchCatalog", { v });

        // console.log("states", states);

        this.items = states.map((e) => {
          return (
            {
              text: e.descr,
              value: {
                synonym: e.synonym,
                parentguid: e.parentguid,
                itgroup: e.itgroup,
              },
            } || {}
          );
        });

        // console.log("this.items", this.items);

        // this.items = items0.filter((e) => {
        //   return (e || "").toLowerCase().includes((v || "").toLowerCase());
        // });
        // this.states = states;
        // console.log(this.items);
      } catch (e) {
        console.log(e);
      } finally {
        this.loading = false;
      }
      // setTimeout(() => {
      //   this.items = this.states.filter((e) => {
      //     return (e || "").toLowerCase().includes((v || "").toLowerCase());
      //   });
      //   this.loading = false;
      // }, 500);
    },
  },
};
</script>
