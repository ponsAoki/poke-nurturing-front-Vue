<template>
  <div>
    <Default
      view="Yours"
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
        <v-col
          v-for="post in posts"
          :key="post.id"
          width="full"
          cols="12"
          class="pa-3"
        >
          <v-card class="pa-1" :to="{ name: 'post', params: { id: post._id } }">
            <div>
              <v-card-title class="">
                {{ post.nn ? post.nn : post.title }}
              </v-card-title>
            </div>
            <v-divider></v-divider>
            <v-row no-gutters class="d-flex flex-wrap">
              <v-col>
                <div class="d-flex flex-column align-center">
                  <v-img
                    max-width="150"
                    max-height="150"
                    :src="post.image"
                  ></v-img>
                  <h3 style="white-space: no-wrap" class="font-weight-medium">
                    {{ post.pokemon[2] }}
                  </h3>
                </div>
              </v-col>
              <v-col class="pa-4">
                <div class="d-flex flex-column justify-center">
                  <p class="text-no-wrap">特性: {{ post.ability }}</p>
                  <p class="text-no-wrap">性格: {{ post.nature }}</p>
                  <p class="text-no-wrap">持ち物: {{ post.item }}</p>
                </div>
              </v-col>
              <v-col class="pa-4">
                <div class="d-flex flex-column justify-center">
                  <p class="text-no-wrap">
                    努力値: {{ post.en[0] }} - {{ post.en[1] }} -
                    {{ post.en[2] }} - {{ post.en[3] }} - {{ post.en[4] }} -
                    {{ post.en[5] }}
                  </p>
                  <p class="text-no-wrap">
                    個体値: {{ post.IN[0] }} - {{ post.IN[1] }} -
                    {{ post.IN[2] }} - {{ post.IN[3] }} - {{ post.IN[4] }} -
                    {{ post.IN[5] }}
                  </p>
                  <p class="text-no-wrap">
                    実数値: {{ post.rn[0] }} - {{ post.rn[1] }} -
                    {{ post.rn[2] }} - {{ post.rn[3] }} - {{ post.rn[4] }} -
                    {{ post.rn[5] }}
                  </p>
                </div>
              </v-col>
              <v-col class="pa-4">
                <div
                  class="d-flex flex-column justify-center align-xs-center"
                  :align-content="$vuetify.breakpoint.xs ? 'center' : 'start'"
                >
                  <div
                    v-for="move in post.moves"
                    :class="MoveStyle"
                    :key="move"
                  >
                    <v-chip class="ma-1">
                      <div class="text-center" style="width: 150px">
                        {{ move }}
                      </div>
                    </v-chip>
                  </div>
                </div>
              </v-col>
            </v-row>
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
                >
                  編集
                </v-btn>
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
import API from "../api";
import Default from "../components/Default";
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "yours",
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
    this.posts = await API.getYourPosts({
      name: this.$store.state.user.user.name,
    });
    this.postsCopy = this.posts;
  },
  methods: {
    async removePost(id) {
      const response = await API.deletePost(id);
      if (response) {
        this.$router.push({
          name: "yours",
          params: { message: response.message },
        });
        location.reload();
      }
    },
  },
  components: { Default },
};
</script>
