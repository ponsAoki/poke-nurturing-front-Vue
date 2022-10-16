import axios from "axios";
import jwt_decode from "jwt-decode";
import Vue from "vue";
import VueAxios from "vue-axios";

import { TiptapVuetifyPlugin } from "tiptap-vuetify";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import { store } from "./store";
// don't forget to import CSS styles
import "tiptap-vuetify/dist/main.css";
// Vuetify's CSS styles
import "vuetify/dist/vuetify.min.css";

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

Vue.use(TiptapVuetifyPlugin, {
  // the next line is important! You need to provide the Vuetify Object to this place.
  vuetify, // same as "vuetify: vuetify"
  // optional, default to 'md' (default vuetify icons before v2.0.0)
  iconsGroup: "mdi",
});

//アプリケーションを立ち上げる際に、localStorageにあるトークンを受け取る
const token = localStorage.getItem("accessToken");

if (token) {
  console.log(token);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  //トークンをデコード
  const user = jwt_decode(token);
  if (!user) {
    console.log("decodeできていない");
  }
  store.dispatch("user/setUser", user);
}

new Vue({
  router,
  vuetify,
  store,
  render: (h) => h(App),
}).$mount("#app");
