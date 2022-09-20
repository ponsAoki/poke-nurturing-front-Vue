<template>
  <div>
    <Default
      view="Home"
      :posts="postsCopy"
      @pokeChange="selectedPokemon = $event"
    />
    <v-container>
      <v-alert
        border="left"
        close-text="Close Alert"
        color="green accent-4"
        dark
        dismissible
        v-if="this.$route.params.message"
      >
        {{ this.$route.params.message }}
      </v-alert>
      <v-row no-gutters>
        <v-col sm="4" class="pa-3" v-for="post in posts" :key="post.id">
          <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
            <div>
              <v-card-title class="">
                {{ post.nn ? post.nn : post.title }}
              </v-card-title>
            </div>
            <v-divider></v-divider>
            <!-- <v-col class="d-flex justify-space-around flex-wrap"> -->
            <!-- <div class="justify-center">
                <v-card-title cols="12" sm="6">{{ post.title }}</v-card-title>
            </div> -->
            <!-- </v-col> -->
            <v-row no-gutters>
              <v-col class="d-flex flex-column justify-center align-center">
                <v-img width="150" :src="post.image"></v-img>
                <h3 style="white-space: no-wrap" class="font-weight-medium">
                  {{ post.pokemon[2] }}
                </h3>
                <!-- <div class="d-flex flex-column align-center">
                  <v-card-title>
                    {{ post.pokemon[2] }}
                  </v-card-title>
                  <v-text small class="text-center" color="info">
                    nn: {{ post.nn ? `${post.nn}` : "なし" }}
                  </v-text>
                </div> -->
              </v-col>
              <!-- <v-col class="d-flex flex-column align-center">
                <v-chip class="ma-1" style="width: 150px">
                  <div class="text-center" style="width: 150px">
                    {{ post.moves[0] }}
                  </div>
                </v-chip>
                <v-chip class="ma-1" style="width: 150px">
                  <div class="text-center" style="width: 150px">
                    {{ post.moves[1] }}
                  </div>
                </v-chip>
                <v-chip class="ma-1" style="width: 150px">
                  <div class="text-center" style="width: 150px">
                    {{ post.moves[2] }}
                  </div>
                </v-chip>
                <v-chip class="ma-1" style="width: 150px">
                  <div class="text-center" style="width: 150px">
                    {{ post.moves[3] }}
                  </div>
                </v-chip>
              </v-col> -->
            </v-row>
            <!-- <br /> -->
            <!-- <v-row no-gutters>
              <v-col>
                <div class="d-flex justify-center flex-wrap">
                  <v-text small color="info">
                    nn: {{ post.nn ? `${post.nn}` : "なし" }}
                  </v-text>
                </div>
              </v-col>
              <v-col></v-col>
            </v-row> -->
            <!-- <br /> -->
            <br />
            <!-- <br /> -->
            <!-- <div class="d-flex justify-space-around flex-wrap">
              <div style="min-width: 80px" class="pa-2">
                持ち物: {{ post.item ? `${post.item}` : "持ち物なし" }}
              </div>
              <div style="min-width: 80px" class="pa-2">
                性格: {{ post.nature }}
              </div>
            </div> -->
            <!-- <br /> -->
            <v-row no-gutters align="center">
              <v-col cols="6">
                <v-text-field
                  :value="post.username"
                  label="投稿者"
                  class="pa-2 align-center text-center no-wrap"
                >
                </v-text-field>
              </v-col>
              <v-col
                v-if="post.username == $store.state.user.user.name"
                justify="center"
                class="d-flex justify-center"
              >
                <v-btn
                  color="success"
                  text
                  :to="{ name: 'edit-post', params: { id: post._id } }"
                  >編集</v-btn
                >
                <v-btn color="red" text @click="removePost(post._id)"
                  >削除</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Default from "../components/Default";
import API from "../api";
// import axios from "axios";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Home",
  data() {
    return {
      posts: [],
      postsCopy: [],
      selectedPokemon: "",
    };
  },

  watch: {
    selectedPokemon() {
      if (!this.selectedPokemon == "") {
        this.posts = this.postsCopy.filter(
          (elm) => elm.pokemon[2] == this.selectedPokemon
        );
      }
    },
  },

  async created() {
    this.posts = await API.getAllPost();
    this.postsCopy = this.posts;
    // const res = await axios.get(
    //   `https://resource.pokemon-home.com/battledata/ranking/10072/0/1591187515/pdetail-5`
    // );
    // console.log(res);

    // const res2 = await axios.get(
    //   ` https://resource.pokemon-home.com/battledata/js/bundle.js`
    // );
    // console.log(res2.data);
  },

  methods: {
    async removePost(id) {
      const response = await API.deletePost(id);
      if (response) {
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
        location.reload();
      }
    },
  },
  components: { Default },
};
</script>
