<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <v-navigation-drawer v-model="drawer" app>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> ぽミュニティ </v-list-item-title>
          <v-list-item-subtitle> メニュー</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list dense>
        <v-list-item-group v-model="selectedItem" color="primary">
          <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title
        >ぽミュニティ ～ポケモン育成論シェアアプリ～</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-autocomplete
        v-if="view == 'Home' || view == 'Yours'"
        cols="6"
        v-model="pokemon"
        append-icon="mdi-magnify"
        label="ポケモン名で育成論を検索"
        :items="pokemons"
        hide-details
        no-data-text="一致するポケモン名の育成論がありません"
        @change="changePokemon"
      ></v-autocomplete>
    </v-app-bar>
  </div>
</template>

<script>
import "font-awesome/css/font-awesome.min.css";
export default {
  props: ["view", "posts"],

  data: () => ({
    drawer: null,
    items: [
      { title: "投稿一覧", icon: "fa-solid fa-house", link: "/" },
      { title: "あなたの投稿一覧", icon: "fa-solid fa-folder", link: "/yours" },
      {
        title: "育成論を投稿",
        icon: "fa-solid fa-plus",
        link: "/add-pokemon",
      },
      // {
      //   title: "流行を知る",
      //   icon: "fa-solid fa-arrow-trend-up",
      //   link: "/trend",
      // },
    ],

    pokemons: [],
    pokemon: "",
  }),

  watch: {
    posts() {
      this.inPokemons();
      console.log(this.posts);
    },
  },

  // created() {
  //   console.log(this.posts);
  // },

  methods: {
    inPokemons() {
      console.log(this.posts);
      this.pokemons = this.posts.map((elm) => elm.pokemon[2]);
    },
    changePokemon() {
      this.$emit("pokeChange", this.pokemon);
    },
  },
};
</script>
