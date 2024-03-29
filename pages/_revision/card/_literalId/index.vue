<template>
  <div>
    <b-container v-if="card">
      <h1 class="mt-4 cardTitle">
        <span :class="cardNameJaClass">{{ card.name_ja }}</span
        ><CardIdBadge :card="card" />
      </h1>
      <div class="cardNameEn">
        {{ card.name_en }}
      </div>
      <!-- eslint-disable vue/no-v-html -->
      <dl>
        <dt>種類</dt>
        <dd>
          {{ card.type.name_ja }}
          <span v-if="card.min_players_number"
            >[{{ card.min_players_number }}+]</span
          >
        </dd>
        <dt v-if="card.imp_prereq">前提</dt>
        <dd v-if="card.imp_prereq" v-html="replacedCardImpPrereq"></dd>
        <dt v-if="card.imp_cost">コスト</dt>
        <dd v-if="card.imp_cost" v-html="replacedCardImpCost"></dd>
        <dt v-if="card.vps">カード点</dt>
        <dd v-if="card.vps">{{ card.vps }}点</dd>
        <dt>テキスト</dt>
        <dd class="description" v-html="replacedCardDescription"></dd>
        <dt v-if="hasAnyIcon">マーク・シンボル</dt>
        <dd v-if="hasAnyIcon">
          <ul>
            <li v-if="card.has_arrow"><b-icon-arrow-left />矢印マーク</li>
            <li v-if="card.has_bonus">
              <b-icon-stop-circle />ボーナスシンボル
            </li>
            <li v-if="card.has_neg_bonus">
              <b-icon-stop-circle-fill />マイナス点シンボル
            </li>
            <li v-if="card.has_pan_icon">
              <img src="/icons/pan.svg" alt="鍋マーク" class="panIcon" />
              鍋マーク
            </li>
            <li v-if="card.has_bread_icon">
              <img src="/icons/bread.svg" alt="パンマーク" class="breadIcon" />
              パンマーク
            </li>
            <li v-if="card.ag2_category_icon">
              カテゴリアイコン: {{ card.ag2_category_icon.name_ja }}
            </li>
          </ul>
        </dd>
      </dl>
      <!-- eslint-enable -->
      <h2 class="mt-4 text-secondary">メタ情報</h2>
      <table class="table table-striped" aria-describedby="メタ情報">
        <tbody>
          <tr>
            <th scope="row">デッキ</th>
            <td v-if="card.deck">
              <NuxtLink
                :to="`/AG${card.revision_id}/cards/search/result?page=1&deck_id=${card.deck.id}`"
                >{{ card.deck.name_ja }}</NuxtLink
              >
            </td>
            <td v-else>-</td>
          </tr>
          <tr>
            <th scope="row">収録製品</th>
            <td>
              <ul>
                <li v-for="product in card.products" :key="product.id">
                  <NuxtLink
                    :to="`/AG${card.revision_id}/cards/search/result?page=1&product_id=${product.id}`"
                    >{{ product.name_ja }}</NuxtLink
                  >
                </li>
              </ul>
            </td>
          </tr>
          <tr>
            <th scope="row">PlayAgricola</th>
            <td v-if="card.playagricola_card_id">
              <a
                :href="`http://playagricola.com/Agricola/Cards/index.php?id=${card.playagricola_card_id}`"
                target="_blank"
                rel="noopener"
                >{{ card.playagricola_card_id }}<b-icon-box-arrow-up-right
              /></a>
            </td>
            <td v-else>未掲載</td>
          </tr>
          <tr>
            <th scope="row">日本語訳</th>
            <td>
              {{ card.ja_is_official ? '公式' : '非公式' }}
            </td>
          </tr>
          <tr>
            <th scope="row">再録関係</th>
            <td>
              <span
                v-if="
                  card.origin_cards.length === 0 &&
                  card.republished_cards.length === 0
                "
                >-</span
              >
              <ul v-else>
                <li v-for="card in card.origin_cards" :key="card.id">
                  <NuxtLink
                    :to="`/AG${card.revision_id}/card/${card.literal_id}`"
                    >AG{{ card.revision_id }}: {{ card.name_ja }} [{{
                      card.printed_id
                    }}]</NuxtLink
                  >
                </li>
                <li v-for="card in card.republished_cards" :key="card.id">
                  <NuxtLink
                    :to="`/AG${card.revision_id}/card/${card.literal_id}`"
                    >AG{{ card.revision_id }}: {{ card.name_ja }} [{{
                      card.printed_id
                    }}]</NuxtLink
                  >
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </b-container>
  </div>
</template>
<script>
import sanitizeHTML from 'sanitize-html'
sanitizeHTML.defaults.allowedTags.push('img')
sanitizeHTML.defaults.allowedAttributes.img = [
  'id',
  'class',
  'src',
  'alt',
  'width',
  'height',
]

export default {
  async asyncData({ payload, params, error, $axios }) {
    if (payload) {
      return {
        card: payload,
      }
    }
    if (params.revision !== 'AG1' && params.revision !== 'AG2') {
      error({ statusCode: 404, message: 'Page not found' })
      return false
    }
    const data = await $axios
      .$get(`/${params.revision}/cards/${params.literalId}`)
      .catch((_) => {
        error({ statusCode: 404, message: 'Page not found' })
        return false
      })
    return {
      card: data.card,
    }
  },

  head() {
    const title = `[${this.card.printed_id}] ${this.card.name_ja}`
    const description = this.description
    return {
      title,
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: description,
        },
        {
          hid: 'description',
          name: 'description',
          content: description,
        },
      ],
    }
  },

  computed: {
    cardNameJaClass() {
      if (this.card.type.name_en.includes('X-Deck')) return 'cardNameJa-XDeck'
      if (this.card.type.name_en.includes('Forest-Deck'))
        return 'cardNameJa-forestDeck'
      if (this.card.type.name_en.includes('WB-Deck')) return 'cardNameJa-WBDeck'
      if (this.card.type.name_en.includes('Occupation'))
        return 'cardNameJa-occupation'
      if (this.card.type.name_en.includes('Minor Improvement'))
        return 'cardNameJa-minorImprovement'
      if (this.card.type.name_en.includes('Major Improvement'))
        return 'cardNameJa-majorImprovement'
      if (this.card.type.name_en.includes('Parent (Mother) (Consul Dirigens)'))
        return 'cardNameJa-cdDeckMother'
      if (this.card.type.name_en.includes('Parent (Father) (Consul Dirigens)'))
        return 'cardNameJa-cdDeckFather'
      return ''
    },
    hasAnyIcon() {
      return (
        this.card.has_arrow ||
        this.card.has_bonus ||
        this.card.has_neg_bonus ||
        this.card.has_pan_icon ||
        this.card.has_bread_icon ||
        this.card.ag2_category_icon
      )
    },
    description() {
      return `[${this.card.printed_id}] ${this.card.name_ja} (${this.card.type.name_ja}) ${this.card.description}`
    },
    replacedCardImpPrereq() {
      if (!this.card.imp_prereq) return null
      return this.replaceIcon(this.card.imp_prereq)
    },
    replacedCardImpCost() {
      if (!this.card.imp_cost) return null
      return this.replaceIcon(this.card.imp_cost)
    },
    replacedCardDescription() {
      if (!this.card.description) return null
      return this.replaceIcon(this.card.description)
    },
  },

  methods: {
    replaceIcon(text) {
      const panIconHtml =
        '<img src="/icons/pan.svg" alt="鍋マーク" class="panIcon" />'
      const breadIconHtml =
        '<img src="/icons/bread.svg" alt="パンマーク" class="breadIcon" />'
      const replacedText = text
        .replace(':鍋:', panIconHtml)
        .replace(':パン:', breadIconHtml)
      return sanitizeHTML(replacedText)
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.cardTitle {
  display: inline-flex;
  align-items: center;
}
.cardNameJa-occupation {
  color: $occupation;
}
.cardNameJa-minorImprovement {
  color: $minor-improvement;
}
.cardNameJa-majorImprovement {
  color: $major-improvement;
}
.cardNameJa-XDeck {
  color: $x-deck;
}
.cardNameJa-forestDeck {
  color: $forest-deck;
}
.cardNameJa-WBDeck {
  color: $wb-deck;
}
.cardNameJa-cdDeckMother {
  color: $cd-deck-mother;
}
.cardNameEn-cdDeckFather {
  color: $cd-deck-father;
}

.cardNameEn {
  color: gray;
  text-align: right;
}

.description {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}

ul {
  margin-bottom: 0;
}
</style>
<style>
.panIcon {
  width: 1.2em;
  line-height: 1em;
}
.breadIcon {
  width: 1.2em;
  line-height: 1em;
}
</style>
