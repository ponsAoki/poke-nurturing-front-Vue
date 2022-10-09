<template>
  <v-form
    ref="form"
    @submit.prevent="submitForm"
    class="pa-5"
    enctype="multipart/form-data"
  >
    <v-row>
      <v-col cols="12">
        <v-text-field
          label="育成論タイトル or 型名"
          v-model="post.title"
          :rules="rule1"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <PokeSearch :pokemon="Pokemon" @pokechange="pokeChange" />
      </v-col>
      <v-col cols="3">
        <v-select label="Lv." :items="lvs" v-model.number="level"></v-select>
      </v-col>
    </v-row>
    <ImageLink
      :Pokemon="Pokemon"
      :color="post.color"
      @imagechange="ImageChange"
    />

    <v-row>
      <v-col cols="6" sm="6" class="pt-7">
        <v-btn-toggle v-model="post.sex">
          <v-btn small>
            <v-icon small>なし</v-icon>
          </v-btn>

          <v-btn small>
            <v-icon small color="blue">♂</v-icon>
          </v-btn>

          <v-btn small>
            <v-icon small color="red">♀</v-icon>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="1"></v-col>
      <v-col class="">
        <v-switch
          v-model="post.color"
          label="色違い"
          color="success"
          value="rare"
          hide-details
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <v-select
          label="特性"
          v-model="post.Ability"
          :items="post.abilities"
          :item-value="post.Ability"
        ></v-select>
      </v-col>
      <v-col>
        <Item :item="post.item" @itemchange="ItemChange" />
      </v-col>
    </v-row>
    <Nature :nature="post.nature" :rule="rule2" @naturechange="NatureChange" />
    <br />
    <AboutNumber
      :INPro="post.INPro"
      :enPro="post.enPro"
      :Pokemon="Pokemon"
      :Nature="nature"
      :Level="level"
      @numberchange="NumberChange"
    />
    <br />
    <v-row>
      <Move
        :move="post.moves[0]"
        :index="moveIndexes[0]"
        :label="moveLabeles[0]"
        :rule="rule1"
        @movechange="MoveChange"
      />
      <Move
        :move="post.moves[1]"
        :index="moveIndexes[1]"
        :label="moveLabeles[1]"
        @movechange="MoveChange"
      />
    </v-row>
    <v-row>
      <Move
        :move="post.moves[2]"
        :index="moveIndexes[2]"
        :label="moveLabeles[2]"
        @movechange="MoveChange"
      />
      <Move
        :move="post.moves[3]"
        :index="moveIndexes[3]"
        :label="moveLabeles[3]"
        @movechange="MoveChange"
      />
    </v-row>
    <br />
    <br />
    <v-col>
      <v-textarea
        v-model="post.memo"
        label="調整意図や役割などメモ"
        outlined
      ></v-textarea>
    </v-col>

    <v-conainer class="d-flex align-center">
      <v-btn type="submit" color="primary">投稿</v-btn>
      <v-text class="ml-auto">投稿者: {{ $store.state.user.user.name }}</v-text>
    </v-conainer>
  </v-form>
</template>

<script>
import API from "../../api";
import { store } from "../../store";
import AboutNumber from "../AboutNumber.vue";
import ImageLink from "../Image-Link.vue";
import Item from "../Item.vue";
import Move from "../Move.vue";
import Nature from "../Nature.vue";
import PokeSearch from "../PokeSearch.vue";

export default {
  name: "CardTemplate",
  props: {
    role: {
      type: String,
    },
    Post: {
      type: Object,
    },
    pokemon: {
      type: Array,
    },
  },
  data() {
    return {
      rule1: [(v) => !!v || "入力必須です"],
      rule2: [(v) => !!v || "選択必須です"],
      success: false,
      Pokemon: "",
      level: 50,
      nature: "",
      post: {
        pokemon: [],
        simPokesId: 0,
        title: "",
        sex: 0,
        color: "",
        image: "",
        abilities: [],
        Ability: "",
        item: "",
        nature: "",
        moves: ["", "", "", ""],
        bn: [],
        IN: [],
        INPro: [],
        en: [],
        enPro: [],
        rn: [],
        memo: "",
      },
      images: [],
      lvs: [50, 100],
      loading: false,

      Moves: [],
      moveIndexes: [0, 1, 2, 3],
      moveLabeles: ["技1", "技2", "技3", "技4"],
    };
  },

  watch: {
    Pokemon() {
      this.NumberChange();
    },
    Post() {
      // this.post = {};
      this.post = this.Post;
      this.post.INPro = this.post.IN;
      this.post.enPro = this.post.en;
    },
    pokemon() {
      this.pokeChange(this.pokemon);
    },
  },

  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
  methods: {
    async pokeChange(pokemon) {
      this.Pokemon = await pokemon;

      if (this.post.abilities == "") {
        for (let i = 0; i < 2; i++) {
          if (this.Pokemon.abilities[i] || this.Pokemon.hidden_abilities[i])
            this.post.abilities.push(this.Pokemon.abilities[i]);
        }
        this.post.abilities.push(this.Pokemon.hidden_abilities[0]);
      } else {
        for (let i = 0; i < 2; i++) {
          if (this.Pokemon.abilities[i] || this.Pokemon.hidden_abilities[i])
            this.post.abilities[i] = this.Pokemon.abilities[i];
        }
        console.log(this.post.abilities);
        this.post.abilities[this.Pokemon.abilities.length] =
          this.Pokemon.hidden_abilities[0];
      }

      this.post.Ability = this.post.abilities[0];
    },

    ItemChange(item) {
      this.post.item = item;
    },

    ImageChange(image, simId) {
      this.post.image = image;
      this.post.simPokesId = simId;
    },

    NatureChange(nature) {
      this.nature = nature;
    },

    NumberChange(bn, IN, en, rn) {
      console.log("NumberChange動いています");
      console.log(this.post.rn);
      console.log(bn);
      this.post.bn = bn;
      this.post.IN = IN;
      this.post.en = en;
      this.post.rn = rn;
    },

    MoveChange(move, index) {
      this.post.moves[index] = move;
    },

    async submitForm() {
      const formData = new FormData();
      for (var key in this.Pokemon) {
        formData.append("pokemon", this.Pokemon[key]);
      }
      formData.append("no", this.Pokemon.no);
      formData.append("lv", this.level);
      formData.append("title", this.post.title);
      formData.append("image", this.post.image);
      formData.append("sex", this.post.sex);
      formData.append("color", this.post.color);
      formData.append("ability", this.post.Ability);
      if (this.post.abilities.length > 0) {
        this.post.abilities.forEach((elm, index) => {
          formData.append("abilities[" + index + "]", elm);
        });
      } else {
        formData.append("abilities", []);
      }
      formData.append("nature", this.nature.name);
      if (this.post.item.length < 1) {
        formData.append("item", "");
      } else {
        formData.append("item", this.post.item);
      }
      if (this.post.bn.length > 0) {
        this.post.bn.forEach((elm, index) => {
          formData.append("bn[" + index + "]", elm);
        });
      } else {
        formData.append("bn", []);
      }
      if (this.post.IN.length > 0) {
        this.post.IN.forEach((elm, index) => {
          formData.append("IN[" + index + "]", elm);
        });
      } else {
        formData.append("IN", []);
      }
      if (this.post.en.length > 0) {
        this.post.en.forEach((elm, index) => {
          formData.append("en[" + index + "]", elm);
        });
      } else {
        formData.append("en", []);
      }
      if (this.post.rn.length > 0) {
        this.post.rn.forEach((elm, index) => {
          formData.append("rn[" + index + "]", elm);
        });
      } else {
        formData.append("rn", []);
      }
      if (this.post.moves.length > 0) {
        this.post.moves.forEach((elm, index) => {
          formData.append("moves[" + index + "]", elm);
        });
      } else {
        formData.append("moves", []);
      }
      formData.append("memo", this.post.memo);
      formData.append("username", store.state.user.user.name);
      if (this.$refs.form.validate()) {
        const response =
          this.role == "new"
            ? await API.addPost(formData)
            : await API.updatePost(this.$route.params.id, formData);
        console.log(response);
        this.$router.push({
          name: "home",
          params: { message: response.message },
        });
      }
    },
  },

  components: {
    PokeSearch,
    Item,
    ImageLink,
    Nature,
    AboutNumber,
    Move,
  },
};
</script>
