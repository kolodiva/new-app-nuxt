<template>
  <v-tabs vertical>
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
        <v-form v-model="valid" transition="scale-transition">
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
              minLength('Пароль очень нужен', `${hasName ? 6 : 3}`),
              maxLength('Длинноватс.', 30),
            ]"
            clear-icon="mdi-close-circle"
            @click:append="showPassword = !showPassword"
          />
          <v-btn
            class="mt-8"
            :disabled="!valid"
            @click="submitForm(userInfo)"
            >{{ buttonText }}</v-btn
          >
        </v-form>
      </v-card>
    </v-tab-item>
    <v-tab-item>
      <v-card flat>
        <v-card-text>
          <p>
            Morbi nec metus. Suspendisse faucibus, nunc et pellentesque egestas,
            lacus ante convallis tellus, vitae iaculis lacus elit id tortor. Sed
            mollis, eros et ultrices tempus, mauris ipsum aliquam libero, non
            adipiscing dolor urna a orci. Curabitur ligula sapien, tincidunt
            non, euismod vitae, posuere imperdiet, leo. Nunc sed turpis.
          </p>

          <p>
            Suspendisse feugiat. Suspendisse faucibus, nunc et pellentesque
            egestas, lacus ante convallis tellus, vitae iaculis lacus elit id
            tortor. Proin viverra, ligula sit amet ultrices semper, ligula arcu
            tristique sapien, a accumsan nisi mauris ac eros. In hac habitasse
            platea dictumst. Fusce ac felis sit amet ligula pharetra
            condimentum.
          </p>

          <p>
            Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,
            quis gravida magna mi a libero. Nam commodo suscipit quam. In
            consectetuer turpis ut velit. Sed cursus turpis vitae tortor.
            Aliquam eu nunc.
          </p>

          <p>
            Etiam ut purus mattis mauris sodales aliquam. Ut varius tincidunt
            libero. Aenean viverra rhoncus pede. Duis leo. Fusce fermentum odio
            nec arcu.
          </p>

          <p class="mb-0">
            Donec venenatis vulputate lorem. Aenean viverra rhoncus pede. In dui
            magna, posuere eget, vestibulum et, tempor auctor, justo. Fusce
            commodo aliquam arcu. Suspendisse enim turpis, dictum sed, iaculis
            a, condimentum nec, nisi.
          </p>
        </v-card-text>
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
  props: ["submitForm", "buttonText", "hasName"],
  data: () => ({
    valid: false,
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
  }),
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
