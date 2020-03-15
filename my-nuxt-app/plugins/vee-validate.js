import Vue from "vue"
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend
} from "vee-validate"
import ja from "vee-validate/dist/locale/ja.json" // エラーメッセージを日本語化します
import {
  required,
  numeric,
  email,
  max,
  min,
  alpha_num
} from "vee-validate/dist/rules" // 使用するバリデーションルールを指定します。
import axios from "axios"

// VeeValidateが用意している各ルールを使用するよう指定
extend("required", required) // 必須項目のバリデーション
extend("numeric", numeric)
extend("email", email)
extend("max", max)
extend("min", min)
extend("alpha_num", alpha_num)

extend("email_unique", {
  validate: value => {
    try {
      var resp = axios.Get(process.env.postUrl + "/exist/email/" + value)
      return false
    } catch (error) {
      console.log(error)
      return true
    }
  },
  message: "既に登録されているメールアドレスです"
})

// 下記は固定で書く
Vue.component("ValidationProvider", ValidationProvider)
Vue.component("ValidationObserver", ValidationObserver)
localize("ja", ja)
