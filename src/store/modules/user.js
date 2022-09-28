import axios from "axios";
const loginUrl = "https://poke-nurturing-backend-js.up.railway.app/api/login";
const userUrl = "https://poke-nurturing-backend-js.up.railway.app/api/user";

export const user = {
  namespaced: true,
  state: {
    user: null,
  },
  //mutations: commitでstateを更新したり、ブラウザ上のデブツールでstateの変化を追うことが可能
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      console.log(state.user.user);
    },
    setToken(state, payload) {
      localStorage.setItem("accessToken", payload);
    },
    clearAuth(state) {
      axios.defaults.headers.common["Authorization"] = null;
      state.user = null;
      localStorage.removeItem("accessToken");
    },
  },
  //actions: 通常のVue.jsのmethodsに相当。非同期の処理を入れることが可能。
  actions: {
    login: async ({ commit }, user) => {
      try {
        let response = await axios.post(loginUrl, {
          username: user.username,
          password: user.password,
        });

        console.log(response);
        const token = response.data.token;
        console.log(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        response = await axios.get(userUrl);
        console.log(response.data.user);
        commit("setUser", response.data);
        //localStorageにトークンを保持している
        commit("setToken", token);
        return response;
      } catch (err) {
        throw new Error(err.res);
      }
    },
    setUser({ commit }, payload) {
      commit("setUser", payload);
    },
    logout({ commit }) {
      commit("clearAuth");
    },
  },
};
