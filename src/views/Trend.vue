<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <Default />
    <ul>
      <li v-for="poke in pokes" :key="poke.index">
        <img :src="poke.image" max-width="100" max-height="100" />
      </li>
    </ul>
    <img :src="pokes[0].image" max-width="100" max-height="100" />
  </div>
</template>

<script>
import Default from "@/components/Default.vue";
import API from "../api";
import axios from "axios";
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
      await this.pokes.forEach(async (poke) => {
        await this.getImage(poke);
      });
    },
    async getImage(poke) {
      const speciesRes = await axios.get(
        `${this.PokeApiIntro}/pokemon-species/${poke.id}`
      );
      console.log(speciesRes);
      const speciesData = speciesRes.data;
      const res = await axios.get(speciesData.varieties[poke.form].pokemon.url);
      const image = await res.data.sprites.other.home.front_default;
      // await this.imageArr.push(image);
      poke.image = image;
      console.log(this.pokes);
    },
  },

  components: {
    Default,
  },
};
</script>
