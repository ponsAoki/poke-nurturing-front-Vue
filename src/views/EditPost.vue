<template>
  <div>
    <Default />
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto d-flex justify-center">
          <v-card class="pa-5" max-width="600">
            <v-card-title ref="edit" class="edit">育成論を編集</v-card-title>
            <v-divider></v-divider>
            <CardTemplate :role="role" :Post="post" :pokemon="Pokemon" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CardTemplate from "@/components/templates/CardTemplate.vue";
import API from "../api";
import Default from "../components/Default";

export default {
  data() {
    return {
      role: "edit",
      Pokemon: {},
      post: {},
    };
  },
  async created() {
    const res = await API.getPostByID(this.$route.params.id);
    this.post = res;
    this.Pokemon = await API.getPokeById(this.$route.params.id);
  },
  components: { Default, CardTemplate },
};
</script>
