<template>
  <div>
    <b-container>
      <h1 class="mt-4 text-primary">
        カード検索結果 ({{ $route.params.revision }})
      </h1>
      <client-only placeholder="Loading...">
        <p>{{ meta.total }}枚のカードがヒットしました。</p>
        <b-list-group class="mt-4">
          <b-list-group-item
            v-for="card in cards"
            :key="card.id"
            :to="`/AG${card.revision_id}/card/${card.literal_id}`"
            class="d-flex justify-content-between align-items-center"
          >
            {{ card.name_ja }}
            <CardIdBadge :card="card" />
          </b-list-group-item>
        </b-list-group>
        <div class="mt-3 mb-5">
          <b-pagination
            v-model="meta.current_page"
            :total-rows="meta.total"
            :per-page="meta.per_page"
            align="center"
            @input="solvePaginationLink"
          ></b-pagination>
        </div>
      </client-only>
      <div class="searchButtonBox">
        <b-button
          :to="`/${$route.params.revision}/cards/search`"
          variant="info"
          size="lg"
          ><b-icon-search
        /></b-button>
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

  fetchOnServer: false,

  async fetch() {
    const option = {
      params: this.$route.query || {},
    }

    const data = await this.$axios.$get(
      `/${this.$route.params.revision}/cards`,
      option
    )
    this.cards = data.cards
    this.meta = data.meta
  },

  head() {
    const title = `カード検索結果 (${this.$route.params.revision})`
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
      ],
    }
  },

  watch: {
    '$route.query': '$fetch',
  },

  methods: {
    solvePaginationLink(page) {
      if (!process.client || !page) return
      const query = JSON.parse(JSON.stringify(this.$route.query))
      query.page = page.toString()
      this.$router.push({ path: this.$route.path, query })
    },
  },
}
</script>
<style scoped>
.searchButtonBox {
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 10;
}
</style>
