<template>
  <div>
    <Default />
    <v-container>
      <v-row no-gutters>
        <v-col sm="10" class="mx-auto d-flex justify-center">
          <v-card :class="paddingAll" max-width="100%">
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

  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    paddingAll() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "pa-4";
        case "sm":
          return "pa-12";
        case "md":
          return "pa-12";
        case "lg":
          return "pa-12";
        case "xl":
          return "pa-12";
      }
    },
  },

  components: {
    CardTemplate,
    Default,
  },
};
</script>
