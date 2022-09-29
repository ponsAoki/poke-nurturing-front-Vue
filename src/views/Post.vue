<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Default />
    <v-container>
      <!-- <v-row> -->
      <v-col
        sm="10"
        class="pa-2 mx-auto d-flex flex-column align-center justify-center"
      >
        <v-card style="width: 500px" class="pa-10 ma-4" max-width="1400">
          <v-card-title class="">
            {{ post.nn ? post.nn : post.title }}
          </v-card-title>
          <v-divider></v-divider>
          <v-row class="d-flex align-center">
            <v-col class="d-flex flex-column justify-center align-center">
              <v-img width="150" :src="post.image"></v-img>
              <h3 style="white-space: no-wrap" class="font-weight-medium">
                {{ post.pokemon[2] }}
              </h3>
              <!-- <v-text small class="" color="info">
                nn: {{ post.nn ? `${post.nn}` : "なし" }}
                  </v-text> -->
            </v-col>
            <v-col class="d-flex flex-column justify-end">
              <!-- <div> -->
              <div>
                <v-chip class="ma-1" style="width: 150px">
                  <div class="text-center" style="width: 150px">
                    {{ post.moves[0] }}
                  </div>
                </v-chip>
              </div>
              <div>
                <v-chip class="ma-1" style="width: 150px">
                  <div class="text-center" style="width: 150px">
                    {{ post.moves[1] }}
                  </div>
                </v-chip>
              </div>
              <div>
                <v-chip class="ma-1" style="width: 150px">
                  <div class="text-center" style="width: 150px">
                    {{ post.moves[2] }}
                  </div>
                </v-chip>
              </div>
              <div>
                <v-chip class="ma-1" style="width: 150px">
                  <div class="text-center" style="width: 150px">
                    {{ post.moves[3] }}
                  </div>
                </v-chip>
              </div>
              <!-- </div> -->
            </v-col>
          </v-row>
          <br />
          <v-card-text class="py-0">
            <v-col class="d-flex">
              <div class="d-flex flex-column justify-end">
                <div class="py-4">
                  <v-text small class="" color="info">
                    ニックネーム: {{ post.nn ? `${post.nn}` : "なし" }}
                  </v-text>
                </div>
                <!-- <br /> -->
                <div class="d-flex flex-wrap pb-4">
                  <div class="mr-5" style="white-space: no-wrap">
                    特性: {{ post.ability }}
                  </div>
                  <div style="white-space: no-wrap">
                    性格: {{ post.nature }}
                  </div>
                </div>
                <!-- <br /> -->
                <div class="mb-4">
                  持ち物: {{ post.item ? `${post.item}` : "持ち物なし" }}
                </div>
                <div class="mb-4">
                  努力値: {{ post.en[0] }} - {{ post.en[1] }} -
                  {{ post.en[2] }} - {{ post.en[3] }} - {{ post.en[4] }} -
                  {{ post.en[5] }}
                </div>
                <div class="mb-4">
                  個体値: {{ post.IN[0] }} - {{ post.IN[1] }} -
                  {{ post.IN[2] }} - {{ post.IN[3] }} - {{ post.IN[4] }} -
                  {{ post.IN[5] }}
                </div>
                <div>
                  実数値: {{ post.rn[0] }} - {{ post.rn[1] }} -
                  {{ post.rn[2] }} - {{ post.rn[3] }} - {{ post.rn[4] }} -
                  {{ post.rn[5] }}
                </div>
              </div>
            </v-col>
            <v-col max-width="600" class="mt-10" cols="12">
              <v-textarea
                v-model="post.memo"
                label="投稿者のメモ"
                outlined
                type="text"
                readonly
                style="min-width: 280px; max-width: 600px"
              ></v-textarea>
            </v-col>

            <br />
            <!-- <p>あなた: {{ $store.state.user.user.name }}</p> -->
            <!-- <p>{{ post.sex }}</p>
            <p>{{ post.color }}</p>
            <p>{{ post.no }}</p> -->
            <!-- <div class="d-flex justify-space-between"> -->
            <div class="d-flex justify-space-between align-center mr-0">
              <div class="align-center">投稿者: {{ post.username }}</div>
              <div v-if="post.username == $store.state.user.user.name">
                <v-btn
                  color="success"
                  text
                  :to="{ name: 'edit-post', params: { id: post._id } }"
                  >編集</v-btn
                >
                <v-btn color="red" text @click="removePost(post._id)"
                  >削除</v-btn
                >
              </div>
            </div>
            <!-- </div> -->
          </v-card-text>
        </v-card>
        <v-col style="width: 500px">
          <a href="/">一覧ページに戻る</a>
        </v-col>
      </v-col>
      <!-- </v-row> -->
    </v-container>
  </div>
</template>

<script>
import API from "../api";
import Default from "../components/Default";
// import {removePost} from "./Home.vue"
export default {
  data() {
    return {
      post: {},
    };
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    console.log(response);
    this.post = response;
  },
  methods: {
    async removePost(id) {
      const response = await API.deletePost(id);
      this.$router.push({
        name: "home",
        params: { message: response.message },
      });
    },
  },
  components: { Default },
};
</script>
