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
        <v-card width="100%" :class="paddingAll" max-width="1400">
          <v-card-title class="">
            {{ post.nn ? post.nn : post.title }}
          </v-card-title>
          <v-divider></v-divider>
          <v-col class="d-flex align-center flex-wrap">
            <v-col class="d-flex flex-column justify-center">
              <div :class="ImgStyle">
                <v-img max-width="200" :src="post.image"></v-img>
              </div>
              <h3 style="white-space: no-wrap" :class="pokeNameStyle">
                {{ post.pokemon[2] }}
              </h3>
            </v-col>
            <v-col class="d-flex flex-column justify-end">
              <div v-for="move in post.moves" :class="MoveStyle" :key="move">
                <v-chip class="ma-1">
                  <div class="text-center" style="width: 180px">
                    {{ move }}
                  </div>
                </v-chip>
              </div>
            </v-col>
          </v-col>
          <v-card-text class="py-0">
            <v-col class="d-flex">
              <div class="d-flex flex-column justify-end">
                <div class="py-4">
                  <v-text small class="" color="info">
                    ニックネーム: {{ post.nn ? `${post.nn}` : "なし" }}
                  </v-text>
                </div>
                <div class="d-flex flex-wrap pb-4">
                  <div class="mr-5" style="white-space: no-wrap">
                    特性: {{ post.ability }}
                  </div>
                  <div style="white-space: no-wrap">
                    性格: {{ post.nature }}
                  </div>
                </div>
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
            <v-divider></v-divider>
            <v-col max-width="600" class="mt-10" cols="12" readonly>
              <div v-html="post.memo"></div>
            </v-col>

            <br />
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
          </v-card-text>
        </v-card>
        <v-col style="width: 500px">
          <a href="/">一覧ページに戻る</a>
        </v-col>
      </v-col>
    </v-container>
  </div>
</template>

<script>
import {
  Blockquote,
  Bold,
  BulletList,
  Code,
  HardBreak,
  Heading,
  History,
  HorizontalRule,
  Italic,
  Link,
  ListItem,
  OrderedList,
  Paragraph,
  Strike,
  Underline,
} from "tiptap-vuetify";
import API from "../api";
import Default from "../components/Default";
// import {removePost} from "./Home.vue"
export default {
  data() {
    return {
      post: {},
      extensions: [
        History,
        Blockquote,
        Link,
        Underline,
        Strike,
        Italic,
        ListItem,
        BulletList,
        OrderedList,
        [
          Heading,
          {
            options: {
              levels: [1, 2, 3],
            },
          },
        ],
        Bold,
        Code,
        HorizontalRule,
        Paragraph,
        HardBreak,
      ],
    };
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = await response;
  },

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    ImgStyle() {
      const breakpointName = this.$vuetify.breakpoint.name;
      if (breakpointName === "xs") {
        return "d-flex justify-center";
      } else {
        return "";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    pokeNameStyle() {
      const breakpointName = this.$vuetify.breakpoint.name;
      if (breakpointName === "xs") {
        return "font-weight-medium text-center";
      } else {
        return "font-weight-medium pl-12";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    MoveStyle() {
      const breakpointName = this.$vuetify.breakpoint.name;
      if (breakpointName === "xs") {
        return "text-center";
      } else {
        return "";
      }
    },
    // eslint-disable-next-line vue/return-in-computed-property
    paddingAll() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "pa-4";
        case "sm":
          return "pa-12";
        case "md":
          return "pa-12";
        case "lg":
          return "pa-12";
        case "xl":
          return "pa-12";
      }
    },
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
