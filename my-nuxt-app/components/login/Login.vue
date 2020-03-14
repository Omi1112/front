<template>
  <div id="login">
    <validation-observer v-slot="ObserverProps" ref="obs">
      <form @submit.prevent="login">
        <p v-if="error" class="error">{{ error }}</p>

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
          <transition name="component-fade" mode="out-in">
            <p v-if="errors.length" class="help is-danger">
              {{ errors[0] }}
            </p>
          </transition>
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
          <transition name="component-fade" mode="out-in">
            <p v-if="errors.length" class="help is-danger">
              {{ errors[0] }}
            </p>
          </transition>
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
export default {
  props: {
    login_show: {
      type: String,
      required: true
    }
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

<style>
.input-text {
  width: 200px;
}
</style>
