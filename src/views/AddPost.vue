<template>
  <div>
    <Default />
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto d-flex justify-center">
          <v-card class="pa-5" max-width="600">
            <v-card-title ref="new" class="new">新しい育成論</v-card-title>
            <v-divider></v-divider>
            <CardTemplate :role="role" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Default from "@/components/Default.vue";
import CardTemplate from "@/components/templates/CardTemplate.vue";

export default {
  data() {
    return {
      role: "new",
    };
  },

  components: {
    CardTemplate,
    Default,
  },
};
</script>
