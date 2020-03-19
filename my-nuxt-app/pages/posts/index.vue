<template>
  <section class="container">
    <login v-if="!auth" />
    <div v-if="auth">
      <div id="app">
        <el-row class="main">
          <br />
          <el-col :span="4">
            <br />
            <br />
            <br />
            <br />
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-document" />
                  <span>助けて！！</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="getPosts">
                    みんなの助けて！！
                  </el-menu-item>
                  <el-menu-item index="1-2" @click="getPostsByUserID(loginId)">
                    あなたの助けて！！
                  </el-menu-item>
                  <el-menu-item index="1-3" @click="getTodoList">
                    あなたが助ける！！
                  </el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
          <el-col :span="20">
            <Create />
            <List :posts="posts" @getPostsByUserID="getPostsByUserID" />
          </el-col>
        </el-row>
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
      posts: [],
      isCollapse: true
    }
  },
  computed: {
    auth() {
      return this.$store.state.users.auth
    },
    loginId() {
      return this.$store.state.users.loginId
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
      var response = await axios.get(process.env.postUrl + "/posts")
      console.log(response)
      this.posts = response.data
    },
    getPostsByUserID: async function(id, name) {
      var response = await axios.get(process.env.postUrl + "/user/" + id)
      this.posts = response.data
    },
    getTodoList: async function(event) {
      var response = await axios.get(
        process.env.postUrl + "/helper/" + this.$store.state.users.loginId
      )
      console.log(response)
      this.posts = response.data
    }
  }
}
</script>

<style>
.container {
  text-align: center;
}
</style>
