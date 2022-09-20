import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { store } from './store'
import jwt_decode from 'jwt-decode'
import axios from 'axios'

Vue.config.productionTip = false

//アプリケーションを立ち上げる際に、localStorageにあるトークンを受け取る
// console.log("ここまではいってます");
const token = localStorage.getItem('accessToken')
    // console.log("ここまで来てます");

if (token) {
    console.log(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        //トークンをデコード
    const user = jwt_decode(token)
        // console.log("ここまで来てます");
    console.log(user);
    if (!user) {
        console.log("decodeできていない");
    }
    store.dispatch('user/setUser', user)
} else {
    console.log("elseです");
    // router.push('/login')
}

new Vue({
    router,
    vuetify,
    store,
    render: h => h(App)
}).$mount('#app')