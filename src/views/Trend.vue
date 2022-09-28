<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Default />
    <v-row class="flex-column">
      <v-container v-for="poke in pokes" :key="poke.index">
        <v-row class="flex-row align-center">
          <!-- {{poke.index}} -->
          <v-col>
            <v-row no-gutters>
              <div class="mr-10">{{ poke.index + 1 }}位</div>
              <div>{{ poke.name }}</div>
            </v-row>
          </v-col>
          <v-img :src="imageArr[poke.index]" max-width="150"></v-img>
        </v-row>
      </v-container>
    </v-row>
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
    // console.log(this.pokes);

    // console.log(this.pokes);
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
      console.log(this.pokes);
    },
  },

  components: {
    Default,
  },
};
</script>
