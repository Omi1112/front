<template>
  <div id="post-list">
    <el-button @click="postWindowFlg = !postWindowFlg">投稿</el-button>
    <transition name="button-fade">
      <el-card v-if="postWindowFlg" class="box-card">
        <form @submit.prevent="send">
          <p v-if="error" class="error">{{ error }}</p>
          <el-input
            :autosize="{ minRows: 4 }"
            v-model="body"
            type="textarea"
            placeholder="何困っている？？"
          />
          <el-button type="primary" native-type="submit">送信</el-button>
        </form>
      </el-card>
    </transition>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      postWindowFlg: false,
      show: true,
      error: null,
      body: ""
    }
  },
  methods: {
    async send() {
      try {
        var response = await axios.post("http://localhost:8090/posts", {
          body: this.body,
          token: this.$store.state.users.token
        })
        this.postWindowFlg = false
      } catch (e) {
        this.error = e.message
      }
    }
  }
}
</script>
<style>
.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
