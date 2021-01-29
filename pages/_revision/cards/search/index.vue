<template>
  <div>
    <b-container>
      <h1 class="mt-4 text-primary">
        カード検索 ({{ $route.params.revision }})
      </h1>
      <b-form v-if="isShown" @submit="onSubmit" @reset="onReset">
        <b-form-group label="収録製品">
          <b-form-select
            id="form_product_id"
            v-model.number="form.product_id"
            :options="productOptions"
          ></b-form-select>
        </b-form-group>
        <b-form-group label="デッキ">
          <b-form-select
            id="form_deck_id"
            v-model.number="form.deck_id"
            :options="deckOptions"
          ></b-form-select>
        </b-form-group>
        <b-form-group label="種類">
          <b-form-radio-group
            id="form_type_id"
            v-model.number="form.type_id"
            :options="typeOptions"
            name="type_id"
          ></b-form-radio-group>
        </b-form-group>
        <b-form-group
          label="カード名(日本語)"
          label-for="form_name_ja"
          description="部分一致"
        >
          <b-form-input
            id="form_name_ja"
            v-model="form.name_ja"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="カード名(英語)"
          label-for="form_name_en"
          description="部分一致"
        >
          <b-form-input
            id="form_name_en"
            v-model="form.name_en"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="テキスト"
          label-for="form_description_query"
          description="部分一致・スペース区切りでキーワードを複数指定"
        >
          <b-form-input
            id="form_description_query"
            v-model="form.description_query"
            type="text"
          ></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="info">検索</b-button>
        <b-button type="reset" variant="dark">リセット</b-button>
      </b-form>
    </b-container>
  </div>
</template>
<script>
const typeOptions = [
  {
    text: '職業',
    value: 1,
  },
  {
    text: '小さい進歩',
    value: 2,
  },
  {
    text: '大きい進歩',
    value: 3,
  },
  {
    text: 'その他',
    value: -1,
  },
]

export default {
  async asyncData({ params, $axios }) {
    const productsData = await $axios.$get(`/${params.revision}/products`)
    const decksData = await $axios.$get(`/${params.revision}/decks`)
    return {
      products: productsData.products,
      decks: decksData.decks,
    }
  },

  data() {
    return {
      form: {
        product_id: null,
        deck_id: null,
        type_id: null,
        name_ja: '',
        name_en: '',
        description_query: '',
      },
      isShown: true,
      typeOptions,
    }
  },

  computed: {
    productOptions() {
      const nullOption = {
        value: null,
        text: '[未選択]',
      }
      const options = this.products.map((product) => {
        return {
          value: product.id,
          text: product.name_ja,
        }
      })
      return [nullOption, ...options]
    },
    deckOptions() {
      const nullOption = {
        value: null,
        text: '[未選択]',
      }
      const options = this.decks.map((deck) => {
        return {
          value: deck.id,
          text: deck.name_ja,
        }
      })
      return [nullOption, ...options]
    },
  },

  methods: {
    onSubmit(event) {
      event.preventDefault()
      const query = {
        page: 1,
      }
      for (const [key, value] of Object.entries(this.form)) {
        if (value) query[key] = value
      }
      this.$router.push({
        path: `/${this.$route.params.revision}/cards/search/result`,
        query,
      })
    },
    onReset(event) {
      event.preventDefault()
      this.form.product_id = null
      this.form.deck_id = null
      this.form.type_id = null
      this.form.name_ja = ''
      this.form.name_en = ''
      this.form.description_query = ''
      this.isShown = false
      this.$nextTick(() => {
        this.isShown = true
      })
    },
  },
}
</script>
