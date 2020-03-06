<template>
  <div id="login">
    <form @submit.prevent="login">
      <p class="error" v-if="error">{{ error }}</p>
      <p><input type="text" v-model="email" placeholder="email" name="email"/></p>
      <p><input type="text" v-model="password" placeholder="password" name="password"/></p>
      <el-button type="" native-type="submit">ログイン</el-button>
    </form>
  </div>
</template>

<script>
  export default {
    props:['login_show'],
    data() {
      return {
        show: true,
        error: null,
        email: "",
        password: "",
      }
    },
    methods: {
      async login() {
        try {
          await this.$store.dispatch("users/login", {
            email: this.email,
            password: this.password
          })
        } catch(e) {
          this.error = e.message
        }
      },
    }
  }
</script>

<style>
</style>
