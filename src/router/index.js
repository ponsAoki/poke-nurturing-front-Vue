import Vue from 'vue'
import VueRouter from 'vue-router'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Home from '../views/Home.vue'
import Yours from '../views/Yours.vue'
import AddPost from '../views/AddPost.vue'
import Trend from '../views/Trend.vue'
import Post from '../views/Post.vue'
import EditPost from '../views/EditPost.vue'
import axios from 'axios'
const userUrl = 'http://localhost:5001/api/user'

import { store } from '../store'

Vue.use(VueRouter)

const routes = [{
        path: '/signup',
        name: 'signup',
        component: SignUp
    },
    {
        path: '/login',
        name: 'login',
        component: LogIn
    },
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true }
    },
    {
        path: '/yours',
        name: 'yours',
        component: Yours,
        meta: { requiresAuth: true }
    },
    {
        path: '/add-pokemon',
        name: 'add-pokemon',
        component: AddPost,
        meta: { requiresAuth: true }
    },
    {
        path: '/trend',
        name: 'trend',
        component: Trend,
        meta: { requiresAuth: true }
    },
    {
        path: '/post/:id',
        name: 'post',
        component: Post,
        meta: { requiresAuth: true }
    },
    {
        path: '/edit-post/:id',
        name: 'edit-post',
        component: EditPost,
        meta: { requiresAuth: true }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach(async(to, from, next) => {
    if (to.meta.requiresAuth) {
        console.log(store.state.user.user);
        // const storeUser = store.state.user
        const token = localStorage.getItem('accessToken')

        if (token) {
            // console.log("ここまで来てるよ");
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
                // console.log("ここまで来てるよ");
            let res = await axios.get(userUrl)
                .catch(err => {
                    console.log(err);
                    axios.defaults.headers.common['Authorization'] = null
                    next('login')
                })
                // console.log(res ? "resあるよ" : "res空だよ");
                // console.log("ここまで来てるよ");
            console.log(res);
            next()
        } else {
            console.log("tokenないよ");
            router.push('login')
        }
    } else {
        console.log(to.meta.requiresAuth);
        console.log("router/indexの最後のelseだよ");
        next()
    }
})

export default router