<template>
  <div class="container">
    <div>
      <logo color="green" />
      <h1 class="title">
        {{ hoge }}
      </h1>
      <h2 class="subtitle">
        My awesome Nuxt.js project
      </h2>
      <div class="links">
        <nuxt-link to="./about">to About</nuxt-link>
      </div>
      <input type="text" v-model="hoge" />
    </div>
  </div>
</template>

<script>
import Logo from '~/components/Logo.vue'
export default {
  components: {
    Logo
  },
  data() {
    return {
      hoge: 'here is a index page'
    }
  },
  fetch() {
    // SSR / Only in Nuxt.js レンダリング前に外部のデータをStoreにセット
    if (process.server) {
      console.log(`SSR in fetch | `, this.hoge, this.computedHoge)
    } else {
      console.log(`CSR in fetch | `, this.hoge, this.computedHoge)
    }
  },
  asyncData() {
    // SSR / Only in Nuxt.js
    if (process.server) {
      console.log(`SSR in asyncData | this.hoge error`) // hogeはundefinedエラー
    } else {
      console.log(`CSR in asyncData | this.hoge error`) // hogeはundefinedエラー
    }
  },
  validate({ params, query, store }) {
    // SSR & CSR / Only in Nuxt.js 動的ルーティング
    // URLのパラメータを検証するし、falseを返せば404にroutingする
    if (process.server) {
      console.log(`SSR in validate | `, this.hoge, this.computedHoge)
    } else {
      console.log(`CSR in validate | `, this.hoge, this.computedHoge)
    }
    return true
  },
  computed: {
    computedHoge() {
      return `computed_${this.hoge}`
    }
  },
  beforeCreate() {
    // SSR & CSR
    if (process.server) {
      console.log(`SSR in beforeCreate | `, this.hoge, this.computedHoge)
    } else {
      console.log(`CSR in beforeCreate | `, this.hoge, this.computedHoge)
    }
  },
  created() {
    // SSR & CSR
    if (process.server) {
      console.log(`SSR in created | `, this.hoge, this.computedHoge)
    } else {
      console.log(`CSR in created | `, this.hoge, this.computedHoge)
    }
  },
  // ココカラ先はクライアントサイドでしか走らない絶対に。
  beforeMount() {
    // CSR
    // if (process.server) {
    //   console.log(`SSR in beforeMount | `, this.hoge, this.computedHoge)
    // } else {
    console.log(`CSR in beforeMount | `, this.hoge, this.computedHoge)
    // }
  },
  mounted() {
    // CSR
    // DOMツリーが構築された時
    // if (process.server) {
    //   console.log(`SSR in mounted | `, this.hoge, this.computedHoge)
    //   console.log(this.computedHoge())
    // } else {
    console.log(`CSR in mounted | `, this.hoge, this.computedHoge)
    // }
  },
  beforeUpdate() {
    // CSR
    // if (process.server) {
    //   console.log(`SSR in beforeUpdate | `, this.hoge, this.computedHoge)
    //   console.log(this.computedHoge())
    // } else {
    console.log(`CSR in beforeUpdate | `, this.hoge, this.computedHoge)
    // }
  },
  updated() {
    // CSR
    // リアクティブな値が更新された時
    // if (process.server) {
    //   console.log(`SSR in updated | `, this.hoge, this.computedHoge)
    //   console.log(this.computedHoge())
    // } else {
    console.log(`CSR in updated | `, this.hoge, this.computedHoge)
    // }
  },
  beforeDestroy() {
    // CSR
    // if (process.server) {
    //   console.log(`SSR in beforeDestroy | `, this.hoge, this.computedHoge)
    //   console.log(this.computedHoge())
    // } else {
    console.log(`CSR in beforeDestroy | `, this.hoge, this.computedHoge)
    // }
  },
  destroyed() {
    // CSR
    // Vueインスタンスを破棄
    // if (process.server) {
    //   console.log(`SSR in destroyed | `, this.hoge, this.computedHoge)
    //   console.log(this.computedHoge())
    // } else {
    console.log(`CSR in destroyed | `, this.hoge, this.computedHoge)
    // }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
