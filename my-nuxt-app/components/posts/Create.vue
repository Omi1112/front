<template>
  <div id="post-list">
    <el-button @click="windowToggle">投稿</el-button>
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
          支払いポイント<br />
          （支払い可能ポイント：{{ maxPoint | addComma }}ポイント）
          <el-slider v-model="point" :max="maxPoint" :step="10" show-input />
          <el-input v-model="tag" type="text" />
          <el-button type="primary" @click="addTag(tag)">タグ追加</el-button>
          <span v-for="(tag, key) in suggestTagList" :key="key" :data-index="key">
            <el-button type="text" @click="addTag(tag.body)">{{tag.body}}</el-button>
          </span>
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
      point: 0,
      maxPoint: 0,
      body: "",
      tag: "",
      inputTagList: [],
      suggestTagList: [],
    }
  },
  computed: {
    loginId() {
      return this.$store.state.users.loginId
    }
  },
  watch: {
    async getTags(tag) {
      if (tag !== "") {
        try {
          var response = await axios.get(
            process.env.postUrl + "/tag/like/" + tag
          )
          this.suggestTagList = response.data
        } catch (e) {
          this.error = e.message
        }
      } else {
          this.suggestTagList = []
      }
    }
  },
  methods: {
    async send() {
      try {
        var response = await axios.post(process.env.postUrl + "/posts", {
          body: this.body,
          point: this.point,
          tags: this.inputTagList,
          token: this.$store.state.users.token
        })
        this.body = ""
        this.point = 0
        this.postWindowFlg = false
      } catch (e) {
        this.error = e.message
      }
    },
    async windowToggle() {
      try {
        var response = await axios.get(
          process.env.postUrl + "/amount/" + this.loginId
        )
        this.maxPoint = response.data.AmountPayment
        this.postWindowFlg = !this.postWindowFlg
      } catch (e) {
        this.error = e.message
      }
    },
    async addTag(body) {
      this.inputTagList.push({id: 0, body: body})
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
</style>
