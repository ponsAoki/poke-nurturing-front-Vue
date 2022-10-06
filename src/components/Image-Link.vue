<template>
  <v-row class="d-flex justify-space-around align-center">
    <div v-if="tetsuLink" class="">
      <a
        v-bind:href="tetsuLinkVal"
        alt="ポケモン徹底攻略様の育成論を参照"
        target="_blank"
        rel="noopener noreferrer"
        >このポケモンの他の育成論</a
      >
      <p>参照元: 「ポケモン徹底攻略」様</p>
    </div>
    <img :src="image" width="150" />
  </v-row>
</template>

<script>
import axios from "axios";
import API from "../api";

export default {
  name: "Image-Link",
  props: {
    Pokemon: {
      type: Array,
      default: undefined,
    },
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tetsuLink: false,
      tetstuLinkIntro: "https://yakkun.com/swsh/theory/p",
      PokeApiIntro: `https://pokeapi.co/api/v2/`,
      tetsuLinkVal: "",
      image: "",
      post: {
        simPokesId: 0,
      },
    };
  },

  watch: {
    Pokemon() {
      console.log(this.Pokemon);
      this.imgSrc();
    },
    image() {
      this.imageChange();
    },
    color() {
      this.imgSrc();
    },
  },

  methods: {
    async imgSrc() {
      const Pokemon = this.Pokemon;
      console.log(Pokemon._id);
      const url = this.PokeApiIntro + `pokemon-species/${Pokemon.no}`;
      const pokemon = await axios.get(url);
      if (pokemon) {
        for (let i = 0; i < pokemon.data.names.length; i++) {
          const response = await this.simPokeByNum(Pokemon);
          if (response) {
            console.log(response[i]._id);
            if (response[i]._id == Pokemon._id) {
              this.tetsuLinkOn(i);
              this.simPokesId = i;
              const formI = await axios.get(
                pokemon.data.varieties[i].pokemon.url
              );
              if (formI) {
                this.imgJadge(formI.data);
                return this.simPokesId;
              }
            }
          }
        }
      }
    },
    tetsuLinkOn(i) {
      this.tetsuLink = true;
      const Pokemon = this.Pokemon;
      const num = Pokemon.no;
      const url = this.PokeApiIntro + `pokemon-species/${num}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then((result) => {
          const vari = result.varieties[i];
          const res = vari.pokemon;
          if (vari.is_default == true) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}`;
          } else if (res.name.match("-mega")) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}m`;
          } else if (res.name.match("-alola")) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}a`;
          } else if (res.name.match("-galar")) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}g`;
          } else if (res.name.match("-")) {
            this.tetsuLinkVal = this.tetstuLinkIntro + `${num}f`;
          }
        });
    },
    async simPokeByNum(p) {
      const res = await API.getPokeByNum(p);
      return await res;
    },
    imgJadge(pokemon) {
      console.log(pokemon);
      if (this.color === "rare") {
        this.image = pokemon.sprites.other.home.front_shiny;
      } else if (this.color === null || this.color === "") {
        this.image = pokemon.sprites.other.home.front_default;
      }
    },

    imageChange() {
      this.$emit("imagechange", this.image, this.simPokesId);
      this.$emit("cSwitchChange", this.image);
    },
  },
};
</script>
