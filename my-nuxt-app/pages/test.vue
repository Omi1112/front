<template>
  <section class="container">
    <div>
      <p>time:{{ users }}</p>

      <!-- <p>time:{{ data.time.updated }}</p>
    <p>chartName:{{ data.chartName }}</p>
    <p>USD:{{ data.bpi.USD.rate }}</p> -->
      <!-- <p>USD:{{ state }}</p> -->
    </div>
    <div>
      <h1>usersのindexページです。</h1>
      <NuxtLink to="/">
        About page
      </NuxtLink>
      <p>count={{ count }}</p>
      <p>test={{ test }}</p>
      <button @click="addCount">カウントアップ</button><br />
      <el-button type="primary" @click="addCount">カウントアップ</el-button>
      <el-button type="danger" @click="takeCount">カウントダウン</el-button>
      <!-- <button @click="takeCount">カウントダウン</button><br> -->
      <button @click="resetCount">リセット</button>

      <!-- $store.dispatchでストア内のメソッドを呼び出せる。 -->
      <!-- dispatch内の引数は、フォルダ構成/ファイル名/アクション名 -->
      <button @click="$store.dispatch('users/getUsers')">ゲットアイテム</button>
      <!-- <el-rate v-model="data" :colors="['#2F3D4D', '#64B486', '#000']"></el-rate> -->
    </div>
    <div>
      <nuxt-link to="/test">new cout page</nuxt-link><br />
      <nuxt-link to="/">home page</nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      value: null
    }
  },

  // ゲッター ここに記述されている値は常に更新される。
  // {{count}} が常に更新されていることが例。
  computed: {
    count() {
      return this.$store.state.counter.counter.count
    },
    state() {
      return this.$store.state.counter.items
    },
    users() {
      return this.$store.state.users.users
    },
    test() {
      return 100
    }
  },
  // async asyncData({ $axios }) {
  //   // const response = await $axios.$get('https://api.coindesk.com/v1/bpi/currentprice.json')
  //   // return {
  //   //   data: response
  //   // }

  // },
  async featch({ store, params }) {
    await store.dispatch("users/getUsers")
  },
  methods: {
    addCount(e) {
      this.$store.commit("counter/counter/add")
    },
    takeCount(e) {
      this.$store.commit("counter/counter/take")
    },
    resetCount(e) {
      this.$store.commit("counter/reset")
    },
    getItems(e) {
      console.log("test")
      this.$store.commit("users/getUsers")
    }
  }
}
</script>
