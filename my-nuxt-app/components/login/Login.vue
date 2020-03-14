<template>
  <div id="login">
    <validation-observer v-slot="ObserverProps" ref="obs">
      <form @submit.prevent="login">
        <valid-error :errors="error" />
        <validation-provider
          v-slot="{ errors }"
          rules="required|email"
          name="メールアドレス"
        >
          <p>
            <el-input
              v-model="email"
              type="text"
              placeholder="メールアドレス"
              name="email"
              class="input-text"
            />
          </p>
          <valid-error :errors="errors" />
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required|alpha_num|min:8|max:100"
          name="パスワード"
        >
          <p>
            <el-input
              v-model="password"
              type="password"
              placeholder="パスワード"
              name="password"
              class="input-text"
            />
          </p>
          <valid-error :errors="errors" />
        </validation-provider>

        <el-button
          :disabled="ObserverProps.invalid"
          type=""
          native-type="submit"
        >
          ログイン
        </el-button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import ValidError from "~/components/common/ValidError.vue"

export default {
  components: {
    ValidError
  },
  props: {
    login_show: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      show: true,
      error: [],
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
        this.error.push(
          "ログインに失敗しました。メールアドレスとパスワードを確認してください。"
        )
      }
    }
  }
}
</script>

<style>
.input-text {
  width: 200px;
}
</style>
