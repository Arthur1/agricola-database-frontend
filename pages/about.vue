<template>
  <div>
    <b-container>
      <h1 class="mt-4 text-primary">本サイトについて</h1>
      <h2 class="mt-4 text-secondary">推奨環境</h2>
      <p>
        Agricola
        DB（以下、本サイト）は以下のブラウザの最新版でご覧いただくことを推奨します。
      </p>
      <ul>
        <li>Microsoft Edge</li>
        <li>Mozilla Firefox</li>
        <li>Google Chrome</li>
        <li>Safari</li>
      </ul>
      <h2 class="mt-4 text-secondary">JavaScript・Cookieの利用</h2>
      <p>
        本サイトではJavaScriptを利用しています。これを無効にした場合、ページを正常に表示できない場合があります。
      </p>
      <p>
        また、本サイトではCookieを利用しています。これを無効にした場合、一部の機能が動作しない場合があります。
      </p>
      <h2 class="mt-4 text-secondary">Google Analyticsの利用</h2>
      <p>
        本サイトでは、アクセス分析ツールのGoogle
        Analyticsを使用しております。Googleに特定の情報（アクセス状況やIPアドレスなど）を自動的に送信しています。また、ブラウザ単位で閲覧者数を計測するために、本サイトではCookieを利用しています。
      </p>
      <p>
        取得したデータの利用は、Arthurが提供するアグリコラ関連の各種サービス（本サイト含む）の改善を目的としてのみ利用します。
      </p>
      <p>
        <a
          href="https://tools.google.com/dlpage/gaoptout?hl=ja"
          target="_blank"
          rel="noopener"
          >Google アナリティクス オプトアウト アドオン</a
        >を利用することなどでデータ収集を拒否できます。
      </p>
      <p>
        また、Googleのアクセス情報の収集・利用方法は、<a
          href="https://www.google.com/analytics/terms/jp.html"
          target="_blank"
          rel="noopener"
          >Google アナリティクス利用規約</a
        >および<a
          href="https://policies.google.com/privacy?hl=ja&gl=jp"
          target="_blank"
          rel="noopener"
          >Google ポリシーと規約</a
        >によって定められています。
      </p>
      <h2 class="mt-4 text-secondary">ソースコード</h2>
      <p>
        本サイトはオープンソースで開発しています。ソースコードはGitHubにて公開しています。カードデータの訳を各自のものに置き換えたり、裁定を盛り込んで運用したりしたい場合には、以下のリポジトリをforkしてください。
      </p>
      <ul>
        <li>
          <a
            href="https://github.com/Arthur1/agricola-database"
            target="_blank"
            rel="noopener"
            >Arthur1/agricola-database （APIサーバ）</a
          >
        </li>
        <li>
          <a
            href="https://github.com/Arthur1/agricola-database-viewer"
            target="_blank"
            rel="noopener"
            >Arthur1/agricola-database-viewer （Webサイト）</a
          >
        </li>
      </ul>
      <h2 class="mt-4 text-secondary">お問い合わせ先</h2>
      <p>
        Twitter(<a
          href="https://twitter.com/Arthur1__"
          target="_blank"
          rel="noopener"
          >@Arthur1__</a
        >)へのDMでお問い合わせください。（フォロワー外にも開放しております。）
      </p>
    </b-container>
  </div>
</template>
<script>
export default {
  head() {
    const title = '本サイトについて'
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
}
</script>
