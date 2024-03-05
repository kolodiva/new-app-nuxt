<template>
  <div class="mt-3">
    <a href="https://t.me/mf_komplekt" target="_blank" title="Telegram Новости">
      <img class="socialIcon fab" src="/icons8-telegram-app-48.png"
    /></a>

    <a
      href="https://t.me/Mfkomplekt_bot"
      target="_blank"
      title="Telegram Вопрос"
    >
      <img class="socialIcon fab" src="/icons8-telegram-app-48.png"
    /></a>

    <a
      href="https://www.youtube.com/channel/UCjrle_KgTRDeY7lpHqlvkXA"
      target="_blank"
      title="Фильм, фильм, фильм..."
    >
      <img class="socialIcon fab" src="/icons8-youtube-48.png" />
    </a>

    <a
      href="https://wa.me/79169604255"
      target="_blank"
      title="Напишите нам в онлайн чат"
    >
      <img class="socialIcon fab" src="/icons8-whatsapp-48.png" />
    </a>
    <!-- <ShareNetwork
      network="Instagram"
      url=""
      title=""
      description=""
      style="text-decoration: none"
    >
      <div class="socialIcon fab">
        <v-icon light class="instagram">mdi-instagram</v-icon>
      </div>
    </ShareNetwork> -->
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
  line-height: 20px;
}

.socialIcon:hover {
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  text-decoration: none;
}

.socialIcon .fab {
  width: 100%;
  height: 100%;
  display: block;
  background: linear-gradient(0deg, #fff, #ddd);
  border-radius: 50%;
  font-size: 15px;
  color: #262626;
  transition: 0.5s;
}
.socialIcon .facebook:hover {
  color: blue;
}
.socialIcon .whatsapp:hover {
  color: green;
}
.socialIcon .instagram:hover {
  color: violet;
}
</style>
