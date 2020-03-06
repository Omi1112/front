<template>
  <div id="signup">
    <form @submit.prevent="signup">
      <p class="error" v-if="error">{{ error }}</p>
      <p><input type="text" v-model="name" placeholder="name" name="name"/></p>
      <p><input type="text" v-model="email" placeholder="email" name="email"/></p>
      <p><input type="text" v-model="password" placeholder="password" name="password"/></p>
      <el-button type="primary" native-type="submit">登録</el-button>
    </form>
  </div>
</template>
<script>
  export default {
    props:['signup_show'],
    data() {
      return {
        show: true,
        error: null,
        name: "",
        email: "",
        password: "",
      }
    },
    methods: {
      async signup() {
        try {
          await this.$store.dispatch("users/signup", {
            name: this.name,
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
