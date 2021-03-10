<template>
  <div>
    <b-container>
      <b-jumbotron
        header="Agricola DB"
        lead="Agricola Database for Japanese"
        class="mt-4"
      >
      </b-jumbotron>
      <p>
        ボードゲーム「アグリコラ」に関する情報をまとめたWebサイトです。製品版の全てのカードを掲載する予定です。
      </p>
      <p>
        日本語版が発売されていないものについては、本サイト製作者のArthurが翻訳した内容を掲載しています。（※翻訳ルールについては、<NuxtLink
          to="translation-rule"
          >「翻訳ルール」ページ</NuxtLink
        >をご覧ください。）また、日本語版が発売されているものでも、エラッタを適用しているものがあります。
      </p>
      <h2 class="mt-4 text-primary">更新履歴</h2>
      <b-list-group class="mt-4">
        <b-list-group-item>
          <span class="history_date">2021.01.29</span><br />Agricola
          DBを公開しました
        </b-list-group-item>
      </b-list-group>
      <h2 class="mt-4 text-primary">PR</h2>
      <div class="text-center">
        <b-button
          size="lg"
          variant="info"
          href="https://ofuse.me/o?uid=32093"
          target="_blank"
          rel="noopener"
          >開発を応援する</b-button
        >
      </div>
    </b-container>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: 'Agricola DB',
      titleTemplate: '%s',
    }
  },
}
</script>

<style scoped>
.history_date {
  color: gray;
}
</style>
