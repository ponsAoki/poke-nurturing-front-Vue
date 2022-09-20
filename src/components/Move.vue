<template>
  <v-col cols="12" sm="6">
    <v-autocomplete
      v-model="Move"
      :items="Moves"
      :label="label"
      :rules="rule"
      @change="moveChange"
    >
    </v-autocomplete>
  </v-col>
</template>

<script>
import API from "../api";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Move",
  props: {
    move: {
      type: String,
    },
    index: {
      type: Number,
    },
    label: {
      type: String,
    },
    rule: {
      type: Array,
    },
  },

  data() {
    return {
      Moves: [],
      Move: "",
    };
  },

  watch: {
    move() {
      this.Move = this.move;
      this.moveChange();
    },
  },

  async created() {
    const movesData = await API.getMove();
    this.Moves = movesData.map((elm) => elm.jname);
  },

  methods: {
    moveChange() {
      this.$emit("movechange", this.Move, this.index);
    },
  },
};
</script>
