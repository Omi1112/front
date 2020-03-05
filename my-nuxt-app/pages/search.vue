<template>
  <div>
    <el-container>
      <el-main v-loading.fullscreen.lock="isLoading">
        <!-- 検索フォーム -->
        <search-form />
        <!-- 検索結果一覧 -->
        <search-result />

      </el-main>
    </el-container>
  </div>
</template>

<script lang="babel">
import {mapState} from 'vuex'
import SearchResult from '~/components/SearchResult.vue'
import SearchForm from '~/components/SearchForm.vue'

export default {
  layout: 'navbar',
  components: {
    // 検索フォームを表示するコンポーネント
    SearchForm,
    // 検索結果一覧を表示するコンポーネント
    SearchResult
  },
  // store の state からデータを取得
  computed: mapState(['isLoading']),
  // store の action に用意した 'getItems' を呼ぶ
  // fetch ({ store }) {
  //   this.$store.commit('items/getItems')
  //   // state.dispatch('getItems', {
  //   //   keyword: 'nuxt.js'
  //   // })
  // }
}
</script>

<style>
.el-main {
  background-color: #fff;
}
</style>
