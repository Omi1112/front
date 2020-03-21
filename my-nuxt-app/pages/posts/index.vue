<template>
  <section class="container">
    <div id="app">
      {{ auth }}
      <el-row class="main">
        <br />
        <el-col :span="4">
          <br />
          <br />
          <br />
          <br />
          <el-menu default-active="2" class="el-menu-vertical-demo">
            <transition name="component-fade" mode="out-in">
              <div v-if="auth" key="login">
                <el-submenu index="help">
                  <template slot="title">
                    <i class="el-icon-document" />
                    <span>助けて！！</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1" @click="getPosts">
                      みんなの助けて！！
                    </el-menu-item>
                    <el-menu-item
                      index="1-2"
                      @click="getPostsByUserId(loginId)"
                    >
                      あなたの助けて！！
                    </el-menu-item>
                    <el-menu-item index="1-3" @click="getTodoList">
                      あなたが助ける！！
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="logout" @click="logout">
                  <i class="el-icon-back" />
                  <span>ログアウト</span>
                </el-menu-item>
              </div>
              <div v-else key="logout">
                <el-menu-item
                  v-if="!auth"
                  key="login"
                  index="login"
                  @click="login"
                >
                  <i class="el-icon-right" />
                  <span>ログイン</span>
                </el-menu-item>
              </div>
            </transition>
          </el-menu>
        </el-col>
        <el-col :span="20">
          <transition name="component-fade" mode="out-in">
            <component
              :is="nowMain"
              :data="mainData"
              @getPostsByUserId="getPostsByUserId"
            />
          </transition>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
import Login from "~/components/Login.vue"
import PostMain from "~/components/posts/Main.vue"
import axios from "axios"

export default {
  components: {
    Login,
    PostMain
  },
  data() {
    return {
      mainData: null,
      nowMain: "Login",
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
  watch: {
    auth(val) {
      if (val) {
        this.nowMain = "PostMain"
      }
    }
  },
  methods: {
    getPosts: async function(event) {
      var response = await axios.get(process.env.postUrl + "/posts")
      console.log(response)
      this.mainData = response.data
    },
    getPostsByUserId: async function(id, name) {
      var response = await axios.get(process.env.postUrl + "/user/" + id)
      this.mainData = response.data
    },
    getTodoList: async function(event) {
      var response = await axios.get(
        process.env.postUrl + "/helper/" + this.$store.state.users.loginId
      )
      console.log(response)
      this.mainData = response.data
    },
    login() {
      this.nowMain = "Login"
    },
    logout() {
      this.nowMain = "Login"
      this.$store.dispatch("users/logout")
    }
  }
}
</script>

<style>
.container {
  text-align: center;
}
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.component-fade-enter,
.component-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
.button-fade-enter-active,
.button-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.button-fade-enter,
.button-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
