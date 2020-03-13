<template>
<div id="app">
  <validation-observer ref="obs" v-slot="ObserverProps">
    <label>名前</label>
    <validation-provider name="名前" rules="required">
      <div slot-scope="ProviderProps">
        <input v-model="name">
        <p class="error">{{ ProviderProps.errors[0] }}</p>
      </div>
    </validation-provider>
    <label>メールアドレス</label>
    <validation-provider name="メールアドレス" rules="required|email">
      <div slot-scope="ProviderProps">
        <input v-model="email">
        <p class="error">{{ ProviderProps.errors[0] }}</p>
      </div>
    </validation-provider>
    <button type="button" @click="submit" :disabled="ObserverProps.invalid || !ObserverProps.validated">送信</button>
  </validation-observer>
</div>
</template>

<style scoped>

.container {
  text-align: center;
}

.is-danger {
  color: red;
}
</style>

<script>

export default {
  data () {
    return {
      id: '',
      password: ''
    }
  }
}
</script>
