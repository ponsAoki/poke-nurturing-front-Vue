<template>
  <div class="d-flex align-center justify-center" style="height: 100vh">
    <v-card width="400px" class="mx-auto px-5">
      <v-cad-title>
        <div class="d-flex justify-center py-5">
          <h1 class="display-1">新規登録</h1>
        </div>
      </v-cad-title>
      <v-card-text>
        <v-form @submit.prevent="register">
          <v-text-field
            v-model="name"
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
            label="パスワード (特に指定はありません)"
            :rules="rule1"
          />
          <v-card-actions class="d-flex justify-center">
            <v-btn type="submit" class="info">登録</v-btn>
          </v-card-actions>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import API from "../api";

export default {
  data: () => ({
    showPassword: false,
    name: "",
    password: "",
    rule1: [(v) => !!v || "入力必須です"],
    // rule2: [
    //   (v) =>
    //     (!!v && v != this.name) || "ユーザー名と異なるものを入力してください",
    // ],
  }),

  computed: {},

  methods: {
    async register() {
      const res = await API.register({
        name: this.name,
        password: this.password,
      });
      console.log(res);
    },
    // rule2(v) {
    //   return v != "" && v != this.name
    //     ? true
    //     : "ユーザー名と異なるものを入力してください";
    // },
  },
};
</script>
