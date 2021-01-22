<template>
  <div>
    <b-container>
      <h1 class="mt-4 cardTitle">
        <span :class="cardNameJaClass">{{ card.name_ja }}</span
        ><CardIdBadge :card="card" />
      </h1>
      <div class="cardNameEn">
        {{ card.name_en }}
      </div>
      <dl>
        <dt>種類</dt>
        <dd>
          {{ card.type.name_ja }}
          <span v-if="card.occ_category">[{{ card.occ_category }}+]</span>
        </dd>
        <dt v-if="card.imp_prereq">前提</dt>
        <dd v-if="card.imp_prereq">{{ card.imp_prereq }}</dd>
        <dt v-if="card.imp_cost">コスト</dt>
        <dd v-if="card.imp_cost">{{ card.imp_cost }}</dd>
        <dt v-if="card.vps">カード点</dt>
        <dd v-if="card.vps">{{ card.vps }}点</dd>
        <dt>テキスト</dt>
        <dd class="description">{{ card.description }}</dd>
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
            <li v-if="card.has_pan_icon"><b-icon-minecart />鍋マーク</li>
            <li v-if="card.has_bread_icon"><b-icon-cloud />パンマーク</li>
          </ul>
        </dd>
      </dl>
      <h2 class="mt-4 text-secondary">メタ情報</h2>
      <table class="table table-striped">
        <tbody>
          <tr>
            <th scope="row">デッキ</th>
            <td>{{ card.deck ? card.deck.name_ja : '-' }}</td>
          </tr>
          <tr>
            <th scope="row">収録製品</th>
            <td>{{ card.product.name_ja }}</td>
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
        </tbody>
      </table>
    </b-container>
  </div>
</template>
<script>
export default {
  async asyncData({ params, $axios }) {
    const data = await $axios.$get(
      `/${params.revision}/cards/${params.literalId}`
    )
    return {
      card: data.card,
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
      return ''
    },
    hasAnyIcon() {
      return (
        this.card.has_arrow ||
        this.card.has_bonus ||
        this.card.has_neg_bonus ||
        this.card.has_pan_icon ||
        this.card.had_bread_icon ||
        this.card.rev2_category_icon
      )
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

.cardNameEn {
  color: gray;
  text-align: right;
}

.description {
  white-space: pre-wrap;
  overflow-wrap: break-word;
}
</style>
