<template>
  <div id="login">
    <form @submit.prevent="login">
      <p v-if="error" class="error">{{ error }}</p>

      <validation-provider
        v-slot="{ errors }"
        rules="required|email"
        name="メールアドレス"
      >
        <p>
          <input
            v-model="email"
            type="text"
            placeholder="メールアドレス"
            name="email"
          />
        </p>
        <p v-show="errors.length" class="help is-danger">
          {{ errors[0] }}
        </p>
      </validation-provider>

      <validation-provider
        v-slot="{ errors }"
        rules="required|alpha_num|min:8|max:100"
        name="パスワード"
      >
        <p>
          <input
            v-model="password"
            type="password"
            placeholder="パスワード"
            name="password"
          />
        </p>
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
  login_show: {
    type: String,
    required: true
  },
  data() {
    return {
      show: true,
      error: null,
      email: "",
      password: ""
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
      } catch (e) {
        this.error = e.message
      }
    }
  }
}
</script>

<style></style>
