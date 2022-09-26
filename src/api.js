import axios from 'axios';
import router from './router/index'
import { store } from './store/index'
// import { useStore } from 'vuex'
const postUrl = 'http://localhost:5001/api/post';
const searchUrl = 'http://localhost:5001/api/search';
const registerUrl = 'http://localhost:5001/api/register';
// const loginUrl = '/api/login';

// const store = useStore()

export default class API {
    // constructor()

    //ユーザー関連
    //ユーザー登録
    static async register(query) {
        const res = await axios.post(registerUrl, query)
        if (res) {
            store.dispatch('user/login', {
                username: query.name,
                password: query.password
            }).then(() => {
                router.push('/')
            }).catch((err) => {
                console.log(err.message)
            })
        } else {
            console.log('登録大失敗');
        }
        console.log(res);
        // router.push('/')
        // return res.data
    }

    //ログイン
    // static async login(query) {
    //     store.dispatch('user/login', query)
    //         .then(() => {
    //             router.push('/')
    //         })
    //         .catch((err) => {
    //             console.log("エラー", err);
    //         })
    // }


    //投稿関連
    //投稿を全件取得
    static async getAllPost() {
        const res = await axios.get(postUrl);
        return res.data;
    }

    //特定のユーザーの投稿を全件取得
    static async getYourPosts(user) {
        const res = await axios.post(`${postUrl}/yours`, user);
        console.log(res);
        return res.data;
    }

    //idに基づいて投稿１件だけ取得
    static async getPostByID(id) {
        const res = await axios.get(`${postUrl}/${id}`);
        return res.data;
    }

    //新しい投稿
    static async addPost(post) {
        const res = await axios.post(postUrl, post);
        return res.data;
    }

    //投稿を更新
    static async updatePost(id, post) {
        const res = await axios.patch(`${postUrl}/${id}`, post);
        return res.data;
    }

    //投稿削除
    static async deletePost(id) {
        const res = await axios.delete(`${postUrl}/${id}`);
        return res.data;
    }


    //ポケモンのデータ関連
    //ポケモンデータ全件取得
    static async getPoke() {
        const res = await axios.get(`${searchUrl}/poke`);
        return res.data;
    }

    //道具データ全件取得
    static async getItem() {
        const res = await axios.get(`${searchUrl}/item`);
        return res.data;
    }

    //技データ全件取得
    static async getMove() {
        const res = await axios.get(`${searchUrl}/move`);
        return res.data;
    }

    // 投稿IDから該当するポケモンのデータ取得
    static async getPokeById(id) {
        const res = await axios.get(`${searchUrl}/${id}`)
        return res.data
    }

    //図鑑番号から該当するポケモンのデータ取得
    static async getPokeByNum(post) {
        const res = await axios.post(`${searchUrl}/num`, post)
        return res.data
    }

    //使用率TOP10ポケモン取得
    static async getTopTenPoke() {
        const res = await axios.get(`${searchUrl}/toppoke`)
        return res.data
    }

}