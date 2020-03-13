<template>
  <div id="signup">
    <validation-observer ref="obs" v-slot="ObserverProps">
    <form @submit.prevent="signup">
      <p class="error" v-if="error">{{ error }}</p>

      <validation-provider v-slot={errors} rules="required|max:100" name="お名前">
        <p><input type="text" v-model="name" placeholder="お名前" name="name"/></p>
        <p v-show="errors.length" class="help is-danger">
          {{ errors[0] }}
        </p>
      </validation-provider>

      <validation-provider v-slot={errors} rules="required|email|email_unique" name="メールアドレス">
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

      <el-button :disabled="ObserverProps.invalid" type="primary" native-type="submit">登録</el-button>
    </form>
    </validation-observer>
  </div>
</template>
<script>
  export default {
    props:['signup_show'],
    data() {
      return {
        show: true,
        nameErr: "",
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
