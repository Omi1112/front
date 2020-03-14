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
            <input
              v-model="name"
              type="text"
              placeholder="お名前"
              name="name"
            />
          </p>
          <p v-show="errors.length" class="help is-danger">
            {{ errors[0] }}
          </p>
        </validation-provider>

        <validation-provider
          v-slot="{ errors }"
          rules="required|email|email_unique"
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
export default {
  props: {
    signup_show: {
      type: String,
      required: true
    }
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
        this.error = e.message
      }
    }
  }
}
</script>

<style></style>
