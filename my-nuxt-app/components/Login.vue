<template>
  <div class="">
    <form @submit.prevent="login">
      <p class="error" v-if="error">{{ error }}</p>
      <p><input type="text" v-model="email" placeholder="email" name="email"/></p>
      <p><input type="text" v-model="password" placeholder="password" name="password"/></p>
      <div class="login-btn">
        <button type="submit">ログイン</button>
      </div>
    </form>
    <form @submit.prevent="signup">
      <p class="error" v-if="error">{{ error }}</p>
      <p><input type="text" v-model="name" placeholder="name" name="name"/></p>
      <p><input type="text" v-model="email" placeholder="email" name="email"/></p>
      <p><input type="text" v-model="password" placeholder="password" name="password"/></p>
      <div class="login-btn">
        <button type="submit">ログイン</button>
      </div>
    </form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        error: null,
        name: "",
        email: "",
        password: "",
      }
    },
    methods: {
      async signup() {
        console.log('北よ')
        try {
          await this.$store.dispatch("users/signup", {
            name: this.name,
            email: this.email,
            password: this.password
          })
          this.$router.push("/")
        } catch(e) {
          this.error = e.message
        }
      }
    }
  }
</script>
<style>
</style>
