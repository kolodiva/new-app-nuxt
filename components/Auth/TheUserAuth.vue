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
            @click="submitForm(userInfo, 1)"
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
              minLength('Пароль очень нужен', `${isLogin ? 3 : 6}`),
              eqPass('Указанный пароль', userInfo.password, userInfo.password1),
            ]"
            clearable
            @click:append="showPassword = !showPassword"
          />
          <v-text-field
            v-model="userInfo.name"
            clearable
            label="Обращение к Вам (не обязательное)"
          />
          <v-text-field
            v-model="userInfo.phone"
            clearable
            label="Телефон  (не обязательное)"
            messages="Ваш телефон будет использован исключительно для связи с Вами. Если номер не указан - связь с Вами будет производиться через электронную почту."
          />

          <v-btn
            class="mt-8"
            :disabled="!validReg"
            @click="submitForm(userInfo, 2)"
            >Регистрация</v-btn
          >
        </v-form>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat width="500" class="ml-5">
        <v-form v-model="validRecovery" transition="scale-transition">
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
            v-if="recoveryCode > 0"
            v-model="userInfo.recovCode"
            label="Код восстановления из почтового сообщения"
            clearable
            type="text"
            counter="true"
            :rules="[required('код восстановления')]"
          />

          <v-text-field
            v-if="recoveryCode > 0"
            v-model="userInfo.passwordnew"
            label="Введите новый Пароль"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            clearable
            counter="true"
            :rules="[
              required('пароль'),
              minLength('Пароль очень нужен', 6),
              maxLength('Длинноватс.', 30),
            ]"
            @click:append="showPassword = !showPassword"
          />

          <v-text-field
            v-if="recoveryCode > 0"
            v-model="userInfo.passwordnew1"
            label="Проверка пароля"
            :type="showPassword ? 'text' : 'password'"
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            counter="true"
            :rules="[
              required('Проверка пароля'),
              minLength('Пароль очень нужен', 6),
              eqPass(
                'Указанный пароль',
                userInfo.passwordnew,
                userInfo.passwordnew1
              ),
            ]"
            clearable
            @click:append="showPassword = !showPassword"
          />

          <v-btn
            class="mt-8"
            :disabled="!validRecovery"
            @click="submitForm(userInfo, 3)"
            >{{
              recoveryCode === 0
                ? "Отправить мне ссылку на email для восстановления пароля."
                : "Сменить мой пароль."
            }}</v-btn
          >
        </v-form>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
import validations from "@/utils/validations";
export default {
  props: ["submitForm", "isLogin", "chngtypetab", "recoveryCode"],
  data: () => ({
    validLog: false,
    validReg: false,
    validRecovery: false,
    showPassword: false,
    userInfo: {
      phone: "",
      email: "",
      password: "",
      password1: "",
      name: "",
      passwordnew: "",
      passwordnew1: "",
      recovCode: 0,
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
  mounted() {},
};
</script>

<style lang="scss" scoped>
.v-input {
  font-size: 1.2rem !important;
}
</style>
