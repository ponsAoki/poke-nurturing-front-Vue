import axios from "axios";
import Vue from "vue";
import VueRouter from "vue-router";
import AddPost from "../views/AddPost.vue";
import EditPost from "../views/EditPost.vue";
import Home from "../views/Home.vue";
import LogIn from "../views/LogIn.vue";
import Post from "../views/Post.vue";
import SignUp from "../views/SignUp.vue";
import Trend from "../views/Trend.vue";
import Yours from "../views/Yours.vue";
const userUrl = "https://poke-nurturing-backend-js.up.railway.app/api/user";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/login",
    name: "login",
    component: LogIn,
  },
  {
    path: "/",
    name: "home",
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: "/yours",
    name: "yours",
    component: Yours,
    meta: { requiresAuth: true },
  },
  {
    path: "/add-pokemon",
    name: "add-pokemon",
    component: AddPost,
    meta: { requiresAuth: true },
  },
  {
    path: "/trend",
    name: "trend",
    component: Trend,
    meta: { requiresAuth: true },
  },
  {
    path: "/post/:id",
    name: "post",
    component: Post,
    meta: { requiresAuth: true },
  },
  {
    path: "/edit-post/:id",
    name: "edit-post",
    component: EditPost,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(async (to, from, next) => {
  if (to.meta.requiresAuth) {
    // const storeUser = store.state.user
    const token = localStorage.getItem("accessToken");

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      let res = await axios.get(userUrl).catch((err) => {
        console.log(err);
        axios.defaults.headers.common["Authorization"] = null;
        next("login");
      });
      console.log(res);
      next();
    } else {
      console.log("tokenないよ");
      router.push("login");
    }
  } else {
    console.log(to.meta.requiresAuth);
    console.log("router/indexの最後のelseだよ");
    next();
  }
});

export default router;
