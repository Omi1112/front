<template>
  <section class="container">
    <login v-if="!auth" />
    <div v-if="auth">
      <div id="app">
        <Create />
        <el-button @click="getPosts">データゲット！</el-button>
        <el-button @click="getTodoList">TODOゲット！</el-button>

        <List :posts="posts" />
      </div>
    </div>
  </section>
</template>

<script>
import Login from "~/components/Login.vue"
import List from "~/components/posts/List.vue"
import Create from "~/components/posts/Create.vue"
import axios from "axios"

export default {
  components: {
    Login,
    List,
    Create
  },
  data() {
    return {
      newItem: "",
      todos: [],
      posts: []
    }
  },
  computed: {
    auth() {
      return this.$store.state.users.auth
    }
  },
  async asyncData() {
    // メモ本来はここでデータを取得したいが、名前解決の観点からローカルでテストできないため、一旦getPostsでデータを取得する。
    // try {
    //   var callApi = async function () {
    //     console.log('set Users!!')
    //     var response = await axios.get('http://localhost:8090/posts')
    //     console.log(response)
    //     this.posts = response.data
    //     // commit('set', response.data)
    //   }
    //   setInterval(callApi,10000)
    // } catch (error) {
    // }
  },
  methods: {
    getPosts: async function(event) {
      var response = await axios.get("http://localhost:8090/posts")
      console.log(response)
      this.posts = response.data
    },
    getTodoList: async function(event) {
      // console.log('set Users!!')
      var response = await axios.get(
        "http://localhost:8090/helper/" + this.$store.state.users.loginId
      )
      console.log(response)
      this.posts = response.data
      // commit('set', response.data)
    }
  }
}
</script>

<style>
.container {
  text-align: center;
}
</style>
