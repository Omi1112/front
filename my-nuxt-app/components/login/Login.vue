<template>
  <div id="login">
    <form @submit.prevent="login">
      <p class="error" v-if="error">{{ error }}</p>

      <validation-provider v-slot={errors} rules="required|email" name="メールアドレス">
        <p><input type="text" v-model="email" placeholder="メールアドレス" name="email"/></p>
        <p v-show="errors.length" class="help is-danger">
          {{ errors[0] }}
        </p>
      </validation-provider>

      <validation-provider v-slot={errors} rules="required|alpha_num|min:8|max:100" name="パスワード">
        <p><input type="password" v-model="password" placeholder="パスワード" name="password"/></p>
        <p v-show="errors.length" class="help is-danger">
          {{ errors[0] }}
        </p>
      </validation-provider>

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
          console.log(this.$store.state.users)
        } catch(e) {
          this.error = e.message
        }
      },
    }
  }
</script>

<style>
</style>
