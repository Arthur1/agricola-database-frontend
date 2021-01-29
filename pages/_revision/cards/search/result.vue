<template>
  <div>
    <b-container>
      <h1 class="mt-4 text-primary">
        カード検索結果 ({{ $route.params.revision }})
      </h1>
      <b-list-group class="mt-4">
        <b-list-group-item
          v-for="card in cards"
          :key="card.id"
          :to="`/AG${card.product.revision_id}/card/${card.literal_id}/`"
          class="d-flex justify-content-between align-items-center"
        >
          {{ card.name_ja }}
          <CardIdBadge :card="card" />
        </b-list-group-item>
      </b-list-group>
      <div class="mt-3">
        <b-pagination
          v-model="meta.current_page"
          :total-rows="meta.total"
          :per-page="meta.per_page"
          align="center"
          @input="solvePaginationLink"
        ></b-pagination>
      </div>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      cards: [],
      meta: {},
    }
  },

  head() {
    return {
      title: `カード検索結果 (${this.$route.params.revision})`,
    }
  },

  watchQuery: true,

  async created() {
    await this.fetchData()
  },

  methods: {
    async solvePaginationLink(page) {
      if (!process.client || !page) return
      const query = JSON.parse(JSON.stringify(this.$route.query))
      query.page = page.toString()
      this.$router.push({ path: this.$route.path, query })
      await this.fetchData()
    },

    async fetchData() {
      if (!process.client) return
      const page = this.$route.query.page || '1'
      const option = {
        params: {
          page,
        },
      }

      const queryKeys = [
        'product_id',
        'deck_id',
        'type_id',
        'name_ja',
        'name_en',
        'description_query',
      ]
      for (const key of queryKeys) {
        if (this.$route.query[key]) option.params[key] = this.$route.query[key]
      }

      const data = await this.$axios.$get(
        `/${this.$route.params.revision}/cards/`,
        option
      )
      this.cards = data.cards
      this.meta = data.meta
    },
  },
}
</script>
