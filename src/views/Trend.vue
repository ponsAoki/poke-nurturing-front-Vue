<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Default />
    <v-container>
      <h2 class="font-weight-medium my-4">シングルバトル使用率Top10</h2>
      <v-divider class="mb-4"></v-divider>
      <v-row class="flex-column">
        <v-col class="my-4" v-for="poke in pokes" :key="poke.index">
          <v-card class="px-8">
            <v-row class="flex-row align-center">
              <!-- {{poke.index}} -->
              <v-col>
                <v-row no-gutters class="d-flex align-center">
                  <v-card-title class="mr-10" border="right"
                    >{{ poke.index + 1 }}位</v-card-title
                  >
                  <v-card-title>{{ poke.name }}</v-card-title>
                </v-row>
              </v-col>
              <v-img
                :src="imageArr[poke.index]"
                max-width="120"
                max-height="120"
                class="mr-8"
              ></v-img>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Default from "@/components/Default.vue";
import axios from "axios";
import API from "../api";
export default {
  data() {
    return {
      pokes: [],
      PokeApiIntro: `https://pokeapi.co/api/v2`,
      imageArr: [],
    };
  },
  async created() {
    this.pokes = await API.getTopTenPoke().catch((err) =>
      console.log("エラー: ", err)
    );
    await this.forEachFun();
  },

  methods: {
    async forEachFun() {
      this.pokes.forEach(async (poke) => {
        await this.getImage(poke);
      });
    },
    async getImage(poke) {
      const speciesRes = await axios.get(
        `${this.PokeApiIntro}/pokemon-species/${poke.id}`
      );
      const speciesData = speciesRes.data;
      const res = await axios.get(speciesData.varieties[poke.form].pokemon.url);
      const image = await res.data.sprites.other.home.front_default;
      this.imageArr[poke.index] = await image;
      this.pokes.sort((a, b) => a.index - b.index);
      poke.image = image;
    },
  },

  components: {
    Default,
  },
};
</script>
