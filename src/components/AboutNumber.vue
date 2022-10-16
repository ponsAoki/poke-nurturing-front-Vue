<template>
  <div class="d-flex justify-center">
    <v-col cols="12" sm="12" class="justify-center">
      <v-simple-table>
        <thead>
          <tr>
            <th></th>
            <th class="th text-center" style="white-space: no-wrap">種族値</th>
            <th class="th text-center">個体値</th>
            <th class="th text-center">努力値</th>
            <th class="th text-center">実数値</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td width="10%">H</td>
            <td class="text-center">
              {{ bn[0] }}
            </td>
            <td class="hd text-center">
              <input type="text" class="ei" v-model.number="IN[0]" />
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="en[0]"
                @input="nhCal"
              />
            </td>
            <td class="hd text-center">
              <input type="text" class="hi" :value="rn[0]" />
            </td>
          </tr>
          <tr>
            <td>A</td>
            <td class="text-center">
              {{ bn[1] }}
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="IN[1]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="en[1]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input type="text" class="hi" :value="rn[1]" />
            </td>
          </tr>
          <tr>
            <td>B</td>
            <td class="text-center">
              {{ bn[2] }}
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="IN[2]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="en[2]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input type="text" class="hi" v-model.number="rn[2]" />
            </td>
          </tr>
          <tr>
            <td>C</td>
            <td class="text-center">
              {{ bn[3] }}
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="IN[3]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="en[3]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input type="text" class="hi" v-model.number="rn[3]" />
            </td>
          </tr>
          <tr>
            <td>D</td>
            <td class="text-center">
              {{ bn[4] }}
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="IN[4]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="en[4]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input type="text" class="hi" v-model.number="rn[4]" />
            </td>
          </tr>
          <tr>
            <td>S</td>
            <td class="text-center">
              {{ bn[5] }}
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="IN[5]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input
                type="text"
                class="ei"
                v-model.number="en[5]"
                @input="nOCal"
              />
            </td>
            <td class="hd text-center">
              <input type="text" class="hi" v-model.number="rn[5]" />
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-col>
  </div>
</template>

<script>
export default {
  props: {
    INPro: {
      type: Array,
      default: () => [31, 31, 31, 31, 31, 31],
    },
    enPro: {
      type: Array,
      default: () => [0, 0, 0, 0, 0, 0],
    },
    Pokemon: {
      type: Object,
      default: () => {},
    },
    Nature: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: "",
    },
    Level: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      // post: {
      bn: [100, 100, 100, 100, 100, 100],
      IN: [31, 31, 31, 31, 31, 31],
      en: [0, 0, 0, 0, 0, 0],
      rn: [],
      // },
    };
  },

  watch: {
    INPro() {
      this.IN = this.INPro;
    },
    enPro() {
      this.en = this.enPro;
    },
    async IN() {
      this.nhCal();
      this.nOCal();
    },
    async en() {
      this.nhCal();
      this.nOCal();
    },
    async Pokemon() {
      this.bnFulled(this.Pokemon);
      this.nhCal();
      this.nOCal();
    },
    Nature() {
      this.nOCal();
    },
    Level() {
      this.nhCal();
      this.nOCal();
    },
  },

  created() {
    this.nhCal();
    this.nOCal();
  },

  methods: {
    //種族値入力
    bnFulled(pokemon) {
      this.$set(this.bn, 0, pokemon.status.h);
      this.$set(this.bn, 1, pokemon.status.a);
      this.$set(this.bn, 2, pokemon.status.b);
      this.$set(this.bn, 3, pokemon.status.c);
      this.$set(this.bn, 4, pokemon.status.d);
      this.$set(this.bn, 5, pokemon.status.s);
    },

    //HP計算
    nhCal() {
      if (this.Pokemon.name !== "ヌケニン") {
        const Elm =
          Math.floor(
            ((this.bn[0] * 2 + this.IN[0] + Math.floor(this.en[0] / 4)) *
              this.Level) /
              100
          ) +
          this.Level +
          10;
        this.$set(this.rn, 0, Elm);
      } else {
        this.$set(this.rn, 0, 1);
      }
      this.numberChange();
    },

    //HP以外計算
    nOCal() {
      let i = 1;
      while (i < 6) {
        if (this.Nature == "") {
          const rnElm =
            Math.floor(
              ((this.bn[i] * 2 + this.IN[i] + Math.floor(this.en[i] / 4)) *
                this.Level) /
                100
            ) + 5;
          this.$set(this.rn, i, rnElm);
        } else if (this.Nature !== "" && this.Nature.n[i] !== "") {
          const rnElm = Math.floor(
            (Math.floor(
              ((this.bn[i] * 2 + this.IN[i] + Math.floor(this.en[i] / 4)) *
                this.Level) /
                100
            ) +
              5) *
              this.Nature.n[i]
          );
          this.$set(this.rn, i, rnElm);
        } else if (this.Nature !== "" && this.Nature.n[i] == "") {
          const rnElm =
            Math.floor(
              ((this.bn[i] * 2 + this.IN[i] + Math.floor(this.en[i] / 4)) *
                this.Level) /
                100
            ) + 5;
          this.$set(this.rn, i, rnElm);
        }
        i++;
      }
      this.numberChange();
    },

    //親コンポーネントに渡す処理
    numberChange() {
      this.$emit("numberchange", this.bn, this.IN, this.en, this.rn);
    },
  },
};
</script>

<style scoped>
.data-table {
  max-width: none;
}
.th {
  text-align: center;
  margin: -5px;
  white-space: no-wrap;
}
.ht {
  white-space: no-wrap;
  border-right: groove;
  width: 20%;
  text-align: center;
}
.hi {
  width: 23px;
  text-align: right;
  margin: -5px;
  pointer-events: none;
}
.ei {
  width: 28px;
  text-align: right;
  border-radius: 5px;
  border-style: outset;
  margin: -5px;
}
</style>
