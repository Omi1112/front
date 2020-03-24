<template>
  <div id="signup">
    <validation-observer v-slot="ObserverProps" ref="obs">
      <form @submit.prevent="signup">
        <p v-if="error" class="error">{{ error }}</p>

        <validation-provider
          v-slot="{ errors }"
          rules="required|max:100"
          name="お名前"
        >
          <p>
            <el-input
              v-model="name"
              type="text"
              placeholder="お名前"
              name="name"
              class="input-text"
            />
          </p>
          <valid-error :errors="errors" />
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required|email|email_unique"
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
          type="primary"
          native-type="submit"
        >
          登録
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
  data() {
    return {
      show: true,
      nameErr: "",
      error: null,
      name: "",
      email: "",
      password: ""
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
      } catch (e) {
        this.error =
          "既に使用されているメールアドレスです。他のメールアドレスを利用してください。"
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
