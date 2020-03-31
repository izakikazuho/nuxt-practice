# nuxt-practice

> My awesome Nuxt.js project

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# 学び

## そもそも SSR って

### 問題

SPA は、画面のレンダリングはクライアント側で行われる。そのため、JS を解釈しないクローラがサイトを訪ねた際に、適切なメタ情報を持った HTML が返されず、OGP が表示されない。

### 解決策

- SSR(Universal)
  - URL が叩かれたらサーバーサイドで JS を実行して、その結果を HTML として返す。

https://qiita.com/kyrieleison/items/4ac5bcc331aee6394440

> SPA + SSR を両立するために、クライアントとサーバで同じコードが実行できると良くて、それが Isomorphic JavaScript

- Generate

  - 静的ファイルとしてレンダリング結果を HTML として書き出しておき、サーバーに置いておく。

- Prerender
  - プロキシサーバにて、ヘッドレスブラウザでレンダリングした結果のスナップショットを保持。クローラからのリクエストにはそれを返却。

### 曖昧だった点

- サーバーサイドで実行する JS とクライアントで実行する JS は別物なの？

  - 同じものを実行する。一部、サーバーサイドで動かない（動かしたくない）処理の実行を避けるため、条件分岐させることがある。

- 画面遷移したらどうなるの？
  - 初回ロード時は、サーバーでレンダリングされた HTML（Generate の場合は静的に吐き出された HTML）を表示。
  - 画面遷移時は、JS で画面を書き換える。

## ライフサイクルフック

### とは？

Vue インスタンスの生成から破棄まで一連の流れの中で実行される関数。

### Vue.js のライフサイクルフック

- beforeCreate
  - これから Vue インスタンスを生成するよ
- created
  - Vue インスタンスが生成されたよ
- beforeMount
  - これから vm.\$el にインスタンスをマウントするよ。
- mounted
  - vm.\$el にインスタンスがマウントされたよ。
- beforeUpdate
  - リアクティブなデータが更新されたので、これから再描画するよ。
- updated
  - 再描画したよ。
- beforeDestroy
  - これから Vue インスタンスを破棄するよ
- destroyed
  - これから Vue インスタンスが破棄されたよ

### Nuxt.js のライフサイクルフック

- NuxtServerInit
  - SSR の時に初回だけ走るよ
- middleware
  - ミドルウェアを使用すると、ページがレンダリングされる前(SSR 処理などが行われる前)に設定された関数を実行することができる
  - https://qiita.com/ono-ta/items/22ae1fc6c75ba75f4029
- asyncData
  - コンポーネントの描画に必要なデータを取得する
- fetch
  - vuex ストアに置いておくデータを取得する
- validate
  - URL のパラメータを評価できる。false を返すと 404 に飛ばせる。

### created と mounted の違いは？

- created は vue インスタンスが生成された時。SSR でも走る。なんなら CSR で 2 度目が走る。
- mounted は vue インスタンスが DOM にマウントされた時。SSR では走らない。

### 算出プロパティ（computed）はどのタイミングで評価される？

Vue インスタンスが生成される時。つまり、created が実行された瞬間から使える。

## 注意する点

- Universal なコードを書くために、各フックがどのタイミングで実行されるのかを意識する。
- 意図した動きにならない時は、書いた関数が適切なタイミングで呼ばれているか、意図せぬ重複実行がされていないかを、ログを出して確認する。
- window や document など、プラットフォームに依存した API にアクセスすると、Node.js でエラーとなるため、実行タイミングを意識する。
  - https://ssr.vuejs.org/ja/guide/universal.html#%E3%82%B3%E3%83%B3%E3%83%9D%E3%83%BC%E3%83%8D%E3%83%B3%E3%83%88%E3%81%AE%E3%83%A9%E3%82%A4%E3%83%95%E3%82%B5%E3%82%A4%E3%82%AF%E3%83%AB%E3%83%95%E3%83%83%E3%82%AF

## Vue Router

### Guard ってなんなん

Navigation Guard - Vue Router の機能。ページ遷移の前後にフックされ、任意の処理を実行することができる。
素の Vue では、画面遷移のアニメーション演出をするために使ったり、認証の状態次第でページをリダイレクトさせるのに使える、ぽい。
Nuxt の場合は middleware に代替される、ぽい。

少し理解が薄い。。
https://medium.com/@seif.sayed/global-navigation-guards-in-nuxt-using-middlewares-43ae9dc131b4

## middleware

- 指定のページが描画される前に描画される前に任意の処理を実行することができる。
- 全ページのレンダリング前に噛ませたい時は、nuxt.config.js に書く。
  - サイト全体で使用するデータを Vuex ストアに格納したい時など
- 特定のページでのみ実行する場合は、ページの vm に middleware プロパティを持たせる。

## serverMiddleware

- ルーティングの middleware とは別物だよ。
  - https://ja.nuxtjs.org/api/configuration-servermiddleware/
    - > クライアントサイドや SSR の Vue で各ルートの前に呼び出されている ルーティングのミドルウェア と混同しないでください。 serverMiddleware は vue-server-renderer の 前に サーバー側で実行され、API リクエストの処理やアセットの処理などのサーバー固有のタスクとして使用できます。
  - つまりは、SSR が走るよりも手前に Node.js のなんらかの処理を割り込ませることができる。素敵だ。
  - /api にアクセスした時に処理を割り込ませたい場合は、nuxt.config.js に次のように追加 `serverMiddleware: [{ path: '/api', handler: '~/api/marvelousapi.js' }]`
