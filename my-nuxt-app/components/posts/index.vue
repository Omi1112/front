<template>
  <section class="container">
    <login v-if="!auth" />
    <div v-if="auth">
      <div id="app">
        <Create />

        {{ postWindowFlg }}
        {{ posts }}
        <el-button @click="getPosts">データゲット！</el-button>
        <List :posts="posts" />

        <li v-for="(post, key) in posts" :key="key">
          {{ post.body }}
        </li>
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
    //     var response = await axios.get(process.env.postUrl + "/posts")
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
      console.log("set Users!!")
      var response = await axios.get(process.env.postUrl + "/posts")
      console.log(response)
      this.posts = response.data
    }
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
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
