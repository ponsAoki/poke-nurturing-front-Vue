<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <div>
      <v-card width="400px" class="mx-auto px-5">
        <v-cad-title>
          <div class="d-flex justify-center py-5">
            <h1 class="display-1">ログイン</h1>
          </div>
        </v-cad-title>
        <v-card-text>
          <v-form @submit.prevent="login">
            <v-text-field
              v-model="userName"
              prepend-icon="mdi-account-circle"
              label="ユーザ名"
              :rules="rule1"
            />
            <v-text-field
              v-model="password"
              prepend-icon="mdi-lock"
              append-icon="mdi-eye-off"
              v-bind:type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
              label="パスワード"
              :rules="rule1"
            />
            <v-card-actions class="d-flex justify-center">
              <v-btn type="submit" class="info">ログイン</v-btn>
            </v-card-actions>
          </v-form>
        </v-card-text>
      </v-card>

      <v-container class="d-flex justify-center mt-5">
        <div class="hajimete">
          <a @click="jump">> はじめての方</a>
        </div>
      </v-container>
    </div>
  </div>
</template>

<script>
import { store } from "../store/index";
import router from "../router/index";

export default {
  data: () => ({
    showPassword: false,
    userName: "",
    password: "",
    rule1: [(v) => !!v || "入力必須です"],
  }),

  methods: {
    login() {
      store
        .dispatch("user/login", {
          username: this.userName,
          password: this.password,
        })
        .then(() => {
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
    },
    jump() {
      router.push("signup");
    },
  },
};
</script>

<style scoped>
.hajimete :hover {
  color: #0099ff;
}
</style>
