<template>
  <div>
    <ShareNetwork
      network="facebook"
      :url="params.url"
      :title="params.title"
      :description="params.description"
      style="text-decoration: none"
    >
      <div class="socialIcon fab">
        <v-icon light class="facebook">mdi-facebook</v-icon>
      </div>
    </ShareNetwork>

    <ShareNetwork
      network="twitter"
      :url="params.url"
      :title="params.title"
      :description="params.description"
      style="text-decoration: none"
    >
      <div class="socialIcon fab">
        <v-icon light class="twitter">mdi-twitter</v-icon>
      </div>
    </ShareNetwork>
    <ShareNetwork
      network="telegram"
      :url="params.url"
      :title="params.title"
      :description="params.description"
      style="text-decoration: none"
    >
      <div class="socialIcon fab">
        <v-icon light class="telegram">mdi-telegram</v-icon>
      </div>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  props: {
    params: Object,
  },
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
};
</script>

<style lang="scss" scoped>
.socialIcon {
  position: relative;
  width: 35px;
  height: 35px;
  display: inline-block;
  text-align: center;
  margin: 0px 2px;
  border-radius: 50%;
  padding: 6px;
  box-sizing: border-box;
  text-decoration: none;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
  background: linear-gradient(0deg, #ddd, #fff);
  transition: 0.5s;
}

.socialIcon:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  text-decoration: none;
}

.socialIcon .fab {
  widht: 100%;
  height: 100%;
  display: block;
  background: linear-gradient(0deg, #fff, #ddd);
  border-radius: 50%;
  line-height: calc(35px - 12px);
  font-size: 15px;
  color: #262626;
  transition: 0.5s;
}
.socialIcon .facebook:hover {
  color: blue;
}
.socialIcon .twitter:hover {
  color: green;
}
</style>
