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
    async Pokemon() {
      await this.imgSrc();
      this.tetsuLinkOn();
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
      const thisPokemon = this.Pokemon;
      const pokeName = thisPokemon.name;
      const pokeForm = thisPokemon.form;
      const url = this.PokeApiIntro + `pokemon-species/${thisPokemon.no}`;
      const pokemon = await this.axios.get(url);
      if (!pokemon) console.log("図鑑番号からPokeAPI叩けてない");
      let formIUrl = "";
      const varieties = pokemon.data.varieties;
      for (let i = 0; i < varieties.length; i++) {
        if (
          pokeName.match("メガ") &&
          varieties[i].pokemon.name.match("-mega") &&
          !pokeName.match("メガニウム") &&
          !pokeName.match("メガヤンマ")
        ) {
          if (
            pokeName.indexOf("X") !== -1 &&
            varieties[i].pokemon.name.indexOf("-mega-x") !== -1
          ) {
            formIUrl = await varieties[i].pokemon.url;
            break;
          } else if (
            pokeName.match("Y") &&
            varieties[i].pokemon.name.match("-mega-y")
          ) {
            formIUrl = await varieties[i].pokemon.url;
            break;
          } else {
            formIUrl = await varieties[i].pokemon.url;
          }
        }
        switch (true) {
          case /アローラの/.test(pokeForm) &&
            /-alola/.test(varieties[i].pokemon.name):
            formIUrl = await varieties[i].pokemon.url;
            break;
          case /ガラルの/.test(pokeForm) &&
            /-galar/.test(varieties[i].pokemon.name):
            formIUrl = await varieties[i].pokemon.url;
            break;
          case !/れきせんのゆうしゃ/.test(pokeForm) &&
            pokeForm &&
            /-/.test(varieties[i].pokemon.name):
            formIUrl = await varieties[i].pokemon.url;
            break;
          case varieties[i].is_default === true &&
            (pokeForm === "" || /れきせんのゆうしゃ/.test(pokeForm)):
            formIUrl = await varieties[0].pokemon.url;
            break;
        }
      }
      const formI = await this.axios.get(formIUrl);
      if (formI) {
        this.imgJadge(formI.data);
      }
    },
    tetsuLinkOn() {
      this.tetsuLink = true;
      const thisPokemon = this.Pokemon;
      const num = thisPokemon.no;
      const pokeName = thisPokemon.name;
      const pokeForm = thisPokemon.form;
      if (
        pokeName.match("メガ") &&
        !pokeName.match("メガニウム") &&
        !pokeName.match("メガヤンマ")
      ) {
        this.tetsuLinkVal = this.tetstuLinkIntro + `${num}m`;
      } else if (pokeForm.match("アローラの")) {
        this.tetsuLinkVal = this.tetstuLinkIntro + `${num}a`;
      } else if (pokeForm.match("ガラルの")) {
        this.tetsuLinkVal = this.tetstuLinkIntro + `${num}g`;
      } else if (pokeForm && !pokeForm.match("れきせんのゆうしゃ")) {
        this.tetsuLinkVal = this.tetstuLinkIntro + `${num}f`;
      } else {
        this.tetsuLinkVal = this.tetstuLinkIntro + `${num}`;
      }
    },
    imgJadge(pokemon) {
      console.log("imgJadge発火してます");
      if (this.color === "rare") {
        this.image = pokemon.sprites.other.home.front_shiny;
      } else if (!this.color) {
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
