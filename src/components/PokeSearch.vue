<!-- ポケモン検索のコンポーネント -->
<template>
  <v-autocomplete
    class="font-medium shadow relative"
    v-model="Pokemon"
    :items="Pokemons"
    :item-text="(item) => item.name + ' ' + item.form"
    return-object
    @change="onInput"
    label="ポケモン"
    :rules="[Rules]"
  >
  </v-autocomplete>
</template>

<script>
import API from "../api";

export default {
  name: "PokeSearch",

  props: {
    pokemon: {
      type: Array,
    },
  },

  data() {
    return {
      rule1: [(v) => !!v || "入力必須です"],
      Pokemons: [],
      Pokemon: [],
    };
  },

  watch: {
    pokemon() {
      this.Pokemon = this.pokemon;
    },
  },

  async created() {
    this.Pokemons = await API.getPoke();
  },

  methods: {
    Rules(value) {
      if (value.length === 0) {
        return "入力必須です";
      } else {
        return true;
      }
    },
    onInput: function () {
      this.$emit("pokechange", this.Pokemon);
      console.log("ここまで実行されてるよ");
    },
  },
};
</script>
