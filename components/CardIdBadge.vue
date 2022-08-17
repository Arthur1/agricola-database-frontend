<template>
  <span class="cardIdBadge" :class="badgeClass"
    ><b-icon-tree-fill
      v-if="card.deck && card.deck.name_en === 'Forest-Deck'"
    />{{ displayCardId }}</span
  >
</template>
<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  computed: {
    badgeClass() {
      if (this.card.special_color) {
        return `cardIdBadge-special${this.card.special_color.id}`
      } else {
        if (this.card.type.name_en.includes('Occupation'))
          return 'cardIdBadge-occupation'
        if (this.card.type.name_en.includes('Minor Improvement'))
          return 'cardIdBadge-minorImprovement'
        if (this.card.type.name_en.includes('Major Improvement'))
          return 'cardIdBadge-majorImprovement'
        if (this.card.type.name_en.includes('X-Deck'))
          return 'cardIdBadge-XDeck'
        if (this.card.type.name_en.includes('Forest-Deck'))
          return 'cardIdBadge-forestDeck'
        if (this.card.type.name_en.includes('WB-Deck'))
          return 'cardIdBadge-WBDeck'
        if (
          this.card.type.name_en.includes('Parent (Mother) (Consul Dirigens)')
        )
          return 'cardIdBadge-cdDeckMother'
        if (
          this.card.type.name_en.includes('Parent (Father) (Consul Dirigens)')
        )
          return 'cardIdBadge-cdDeckFather'
        return ''
      }
    },
    displayCardId() {
      if (this.card.deck && this.card.deck.name_en === 'Forest-Deck') {
        const printedIdArray = Array.from(this.card.printed_id)
        printedIdArray.shift()
        return printedIdArray.join('')
      } else {
        return this.card.printed_id
      }
    },
  },
}
</script>
<style scoped lang="scss">
@import '@/assets/scss/_variables.scss';

.cardIdBadge {
  display: inline-block;
  font-size: 0.8rem;
  color: white;
  border-radius: 2px;
  min-width: 3.5rem;
  padding: 0 6px;
  margin-left: 1rem;
  text-align: center;
  height: 22px;
  line-height: 22px;
}
.cardIdBadge-occupation {
  background: $occupation;
}
.cardIdBadge-minorImprovement {
  background: $minor-improvement;
}
.cardIdBadge-majorImprovement {
  background: $major-improvement;
}
.cardIdBadge-XDeck {
  background: $x-deck;
}
.cardIdBadge-forestDeck {
  background: $forest-deck;
}
.cardIdBadge-WBDeck {
  background: $wb-deck;
}
.cardIdBadge-cdDeckMother {
  background: $cd-deck-mother;
}
.cardIdBadge-cdDeckFather {
  background: $cd-deck-father;
}
.cardIdBadge-special1 {
  background: linear-gradient(0.25turn, $minor-improvement, $major-improvement);
}
.cardIdBadge-special2 {
  background: linear-gradient(
    0.25turn,
    $occupation,
    $minor-improvement 50%,
    $major-improvement
  );
}
</style>
