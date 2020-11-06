<template>
  <v-tabs v-model="activetab" vertical>
    <v-tab class="justify-start">
      <v-icon left> mdi-account-cowboy-hat </v-icon>
      Логин, пароль
    </v-tab>
    <v-tab class="justify-start">
      <v-icon left> mdi-account-plus </v-icon>
      Регистрация
    </v-tab>
    <v-tab class="justify-start">
      <v-icon left> mdi-lock-reset </v-icon>
      Я все забыл
    </v-tab>

    <v-tab-item>
      <v-card flat width="500" class="ml-5">
        <v-form v-model="validLog" transition="scale-transition">
          <v-text-field
            v-model="userInfo.email"
            label="Email"
            clearable
            type="email"
            counter="true"
            :rules="[
              required(userInfo.email),
              emailFormat(userInfo.email),
              maxLength('Длинноватс.', 30),
            ]"
          />
          <v-text-field
            v-model="userInfo.password"
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            clearable
            counter="true"
            :rules="[
              required('пароль'),
              minLength('Пароль очень нужен', `${isLogin ? 3 : 6}`),
              maxLength('Длинноватс.', 30),
            ]"
            @click:append="showPassword = !showPassword"
          />
          <v-btn
            class="mt-8"
            :disabled="!validLog"
            @click="submitForm(userInfo)"
            >Войти</v-btn
          >
        </v-form>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat width="500" class="ml-5">
        <v-form v-model="validReg" transition="scale-transition">
          <v-text-field
            v-model="userInfo.email"
            label="Email"
            clearable
            type="email"
            counter="true"
            :rules="[
              required(userInfo.email),
              emailFormat(userInfo.email),
              maxLength('Длинноватс.', 30),
            ]"
          />
          <v-text-field
            v-model="userInfo.password"
            label="Пароль"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            clearable
            counter="true"
            :rules="[
              required('пароль'),
              minLength('Пароль очень нужен', `${isLogin ? 3 : 6}`),
              maxLength('Длинноватс.', 30),
            ]"
            @click:append="showPassword = !showPassword"
          />

          <v-text-field
            v-model="userInfo.password1"
            label="Проверка пароля"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            counter="true"
            :rules="[
              required('Проверка пароля'),
              eqPass('Указанный пароль', userInfo.password, userInfo.password1),
            ]"
            clear-icon="mdi-close-circle"
            clearable
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="userInfo.name"
            clearable
            label="Обращение к Вам"
            :rules="[maxLength('Длинноватс.', 30)]"
          />
          <v-text-field
            v-model="userInfo.phone"
            clearable
            label="Телефон"
            messages="Ваш телефон будет использован исключительно для связи с Вами. Если телефон не указан - связь с Вами будет производиться через электронную почту."
            :rules="[maxLength('Длинноватс.', 30)]"
          />

          <v-btn
            class="mt-8"
            :disabled="!validReg"
            @click="submitForm(userInfo)"
            >Регистрация</v-btn
          >
        </v-form>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        <v-card-text>
          <p>
            Fusce a quam. Phasellus nec sem in justo pellentesque facilisis. Nam
            eget dui. Proin viverra, ligula sit amet ultrices semper, ligula
            arcu tristique sapien, a accumsan nisi mauris ac eros. In dui magna,
            posuere eget, vestibulum et, tempor auctor, justo.
          </p>

          <p class="mb-0">
            Cras sagittis. Phasellus nec sem in justo pellentesque facilisis.
            Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Donec quam
            felis, ultricies nec, pellentesque eu, pretium quis, sem. Nam at
            tortor in tellus interdum sagittis.
          </p>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import validations from "@/utils/validations";
export default {
  props: ["submitForm", "isLogin", "chngtypetab"],
  data: () => ({
    validLog: false,
    validReg: false,
    showPassword: false,
    showEmail: false,
    userInfo: {
      phone: "",
      email: "afmc@mail.ru",
      password: "Pp123456",
      password1: "",
      name: "",
    },
    ...validations,
    activetab: 0,
  }),
  computed: {},
  watch: {
    chngtypetab(newVal, oldVal) {
      this.activetab = this.isLogin === true ? 0 : 1;
    },
  },
  mounted() {
    this.showEmail = true;
  },
};
</script>

<style lang="scss" scoped>
.v-input {
  font-size: 1.2rem !important;
}
</style>
