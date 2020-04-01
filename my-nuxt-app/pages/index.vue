<template>
  <section class="container">
    <div id="app">
      <transition name="component-fade" mode="out-in">
        <el-menu
          v-if="auth"
          default-active="activeIndex"
          mode="horizontal"
          class="el-menu-demo"
        >
          <el-submenu index="help">
            <template slot="title">
              <i class="el-icon-s-operation" />
              <span>メニュー</span>
            </template>
            <el-menu-item index="user" @click="getPostsByUserId(loginId)">
              <i class="el-icon-user-solid" />
              ようこそ{{ userName }}さん
            </el-menu-item>
            <el-menu-item index="1-1" @click="getPosts">
              <i class="el-icon-document" />
              みんなの助けて！！
            </el-menu-item>
            <el-menu-item index="1-2" @click="getPostsByUserId(loginId)">
              <i class="el-icon-star-on" />
              あなたの助けて！！
            </el-menu-item>
            <el-menu-item index="1-3" @click="getTodoList">
              <i class="el-icon-check" />
              あなたが助ける！！
            </el-menu-item>

            <el-menu-item index="point" @click="getPoints">
              <i class="el-icon-ice-cream-round" />
              ポイント履歴
            </el-menu-item>
            <el-menu-item index="about" @click="nowMain = 'About'">
              <i class="el-icon-info" />
              どんなサービス？
            </el-menu-item>
            <el-menu-item index="logout" @click="logout">
              <i class="el-icon-back" />
              <span>ログアウト</span>
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="point_only" @click="getPoints">
            <i class="el-icon-ice-cream-round" />
            所持ポイント{{ userPoint }}
          </el-menu-item>
        </el-menu>

        <el-menu
          v-if="!auth"
          default-active="activeIndex"
          mode="horizontal"
          class="el-menu-demo help-menu"
        >
          <el-menu-item index="about" @click="nowMain = 'About'">
            <i class="el-icon-info" />
            どんなサービス？
          </el-menu-item>
          <el-menu-item key="login" index="login" @click="login">
            <i class="el-icon-right" />
            <span>ログイン</span>
          </el-menu-item>
        </el-menu>
      </transition>

      <transition name="component-fade" mode="out-in">
        <component :is="nowMain" />
      </transition>
    </div>
  </section>
</template>

<script>
import Login from "~/components/Login.vue"
import PostMain from "~/components/posts/Main.vue"
import PointMain from "~/components/points/Main.vue"
import About from "~/components/About.vue"
import axios from "axios"

export default {
  components: {
    Login,
    PostMain,
    PointMain,
    About
  },
  data() {
    return {
      mainData: null,
      nowMain: "About",
      isCollapse: true
    }
  },
  computed: {
    auth() {
      return this.$store.state.users.auth
    },
    loginId() {
      return this.$store.state.users.loginId
    },
    userName() {
      return this.$store.state.users.name
    },
    userPoint() {
      return this.$store.state.users.point
    }
  },
  watch: {
    async auth(val) {
      if (val) {
        this.nowMain = "About"
        await this.$store.dispatch(
          "users/updatePoint",
          this.$store.state.users.loginId
        )
        await this.$store.dispatch(
          "users/updateName",
          this.$store.state.users.loginId
        )
      }
    }
  },
  methods: {
    getPosts: async function(event) {
      await this.$store.dispatch("posts/getPosts")
      this.nowMain = "PostMain"
    },
    getPostsByUserId: async function(id) {
      await this.$store.dispatch(
        "posts/getPostsByUserId",
        this.$store.state.users.loginId
      )
      this.nowMain = "PostMain"
    },
    getTodoList: async function(event) {
      await this.$store.dispatch(
        "posts/getPostsByHelperId",
        this.$store.state.users.loginId
      )
      this.nowMain = "PostMain"
    },
    getPoints: async function(event) {
      await this.$store.dispatch(
        "points/getPointsByUserId",
        this.$store.state.users.loginId
      )
      this.nowMain = "PointMain"
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

.el-menu-vertical-demo {
  text-align: left;
}
</style>
