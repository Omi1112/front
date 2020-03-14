<template>
  <transition>
    <div id="login">
      <transition name="button-fade" mode="out-in">
        <el-button
          v-if="view === 'Login'"
          key="signup"
          type="primary"
          @click="toggle"
        >
          初めてですか？
        </el-button>

        <el-button v-else key="login" type="" @click="toggle">
          アカウントを既にお持ちですか？
        </el-button>
      </transition>
      <transition name="component-fade" mode="out-in">
        <component :is="view" />
      </transition>
      <el-button @click="logout">ログアウト</el-button>
    </div>
  </transition>
</template>

<script>
import Login from "./login/Login.vue"
import Signup from "./login/Signup.vue"

export default {
  components: {
    Login,
    Signup
  },
  data() {
    return {
      error: null,
      button_type: "primary",
      view: "Login"
    }
  },
  methods: {
    toggle() {
      if (this.view === "Signup") {
        this.view = "Login"
      } else {
        this.view = "Signup"
      }
    },
    logout() {
      this.$store.dispatch("users/logout")
    }
  }
}
</script>

<style>
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
