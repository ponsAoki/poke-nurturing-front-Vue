<template>
  <v-row>
    <v-col cols="12" sm="6" md="6">
      <v-select
        label="性格"
        :items="natures"
        v-model="post.Nature"
        item-text="name"
        single-line
        return-object
        @change="natureChange"
        :rules="rule"
        cols="12"
        md="6"
      ></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Nature",
  props: {
    rule: {
      type: Array,
    },
    nature: {
      type: String,
    },
  },

  watch: {
    nature() {
      this.natureOperation();
    },
  },

  data() {
    return {
      natures: [
        { name: "さみしがり" + "  " + "(A↑B↓)", n: ["", 1.1, 0.9, "", "", ""] },
        { name: "いじっぱり" + "  " + "(A↑C↓)", n: ["", 1.1, "", 0.9, "", ""] },
        { name: "やんちゃ" + "  " + "(A↑D↓)", n: ["", 1.1, "", "", 0.9, ""] },
        { name: "ゆうかん" + "  " + "(A↑S↓)", n: ["", 1.1, "", "", "", 0.9] },
        { name: "ずぶとい" + "  " + "(B↑A↓)", n: ["", 0.9, 1.1, "", "", ""] },
        { name: "わんぱく" + "  " + "(B↑C↓)", n: ["", "", 1.1, 0.9, "", ""] },
        { name: "のうてんき" + "  " + "(B↑D↓)", n: ["", "", 1.1, "", 0.9, ""] },
        { name: "のんき" + "  " + "(B↑S↓)", n: ["", "", 1.1, "", "", 0.9] },
        { name: "ひかえめ" + "  " + "(C↑A↓)", n: ["", 0.9, "", 1.1, "", ""] },
        { name: "おっとり" + "  " + "(C↑B↓)", n: ["", "", 0.9, 1.1, "", ""] },
        { name: "うっかりや" + "  " + "(C↑D↓)", n: ["", "", "", 1.1, 0.9, ""] },
        { name: "れいせい" + "  " + "(C↑S↓)", n: ["", "", "", 1.1, "", 0.9] },
        { name: "おだやか" + "  " + "(D↑A↓)", n: ["", 0.9, "", 1.1, "", ""] },
        { name: "おとなしい" + "  " + "(D↑B↓)", n: ["", "", 0.9, "", 1.1, ""] },
        { name: "しんちょう" + "  " + "(D↑C↓)", n: ["", "", "", 0.9, 1.1, ""] },
        { name: "なまいき" + "  " + "(D↑S↓)", n: ["", "", "", "", 1.1, 0.9] },
        { name: "おくびょう" + "  " + "(S↑A↓)", n: ["", 0.9, "", "", "", 1.1] },
        { name: "せっかち" + "  " + "(S↑B↓)", n: ["", "", 0.9, "", "", 1.1] },
        { name: "ようき" + "  " + "(S↑C↓)", n: ["", "", "", 0.9, "", 1.1] },
        { name: "むじゃき" + "  " + "(S↑D↓)", n: ["", "", "", "", 0.9, 1.1] },
        { name: "てれや" },
        { name: "がんばりや" },
        { name: "すなお" },
        { name: "きまぐれ" },
        { name: "まじめ" },
      ],
      post: {
        Nature: "",
      },
    };
  },

  methods: {
    natureOperation() {
      const result = this.natures.filter((obj) => {
        return obj.name === this.nature;
      });
      this.post.Nature = result[0] ? result[0] : "";
      this.natureChange();
    },

    natureChange() {
      this.$emit("naturechange", this.post.Nature);
    },
  },
};
</script>
