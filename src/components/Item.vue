<template>
  <v-autocomplete
    class="font-medium shadow relative"
    v-model="post.Item"
    :items="Items"
    @change="itemChange"
    label="持ち物"
  >
  </v-autocomplete>
</template>

<script>
import API from "../api";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Item",

  props: {
    item: {
      type: String,
    },
  },

  data() {
    return {
      Items: [],
      post: {
        Item: "",
      },
    };
  },

  watch: {
    item() {
      this.post.Item = this.item;
      this.itemChange();
    },
  },

  async created() {
    const itemsData = await API.getItem();
    this.Items = itemsData.map((elm) => elm.name.japanese);
  },

  methods: {
    itemChange() {
      this.$emit("itemchange", this.post.Item);
    },
  },
};
</script>
