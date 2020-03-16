<template>
  <transition name="conter-fade" mode="out-in">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="20">
          <el-col :span="12">
            <span>{{ post.user.id }}</span>
          </el-col>

          <el-col :span="12">
            <span>{{ post.user.name }}</span>
          </el-col>
          <el-col :span="12">
            <span>{{ post.post.helpserUserId }}</span>
          </el-col>
          <el-col :span="12">
            <transition name="button-fade" mode="out-in">
              <span v-if="post.post.userId === loginId" key="me">
                <el-button
                  v-if="post.post.helpserUserId === 0"
                  key="accepting"
                  type="success"
                  disabled
                >
                  受付中
                </el-button>

                <el-button
                  v-else-if="
                    post.post.helpserUserId != 0 && post.post.status === 0
                  "
                  key="payment"
                  type="success"
                  @click="donePayment"
                >
                  お助けありがとう！
                </el-button>

                <el-button
                  v-else
                  key="payment_completion"
                  type="success"
                  disabled
                >
                  支払い完了！
                </el-button>
              </span>

              <span v-else-if="post.post.helpserUserId === 0" key="none">
                <el-button key="help" @click="setHelperId">
                  助ける！
                </el-button>
              </span>

              <span
                v-else-if="post.post.helpserUserId === loginId"
                key="helper"
              >
                <el-button
                  v-if="post.post.status === 0"
                  key="delete"
                  type="danger"
                  @click="takeHelperId"
                >
                  解除！
                </el-button>

                <el-button
                  v-else-if="post.post.status === 1"
                  key="acceptance"
                  type="success"
                  @click="doneAcceptance"
                >
                  ポイント受取！
                </el-button>

                <el-button
                  v-else
                  key="acceptance_completion"
                  type="success"
                  disabled
                >
                  ポイント受取完了！
                </el-button>
              </span>

              <span v-else key="other">
                <el-button key="other" type="success" disabled>
                  他の人が助けるよ！
                </el-button>
              </span>
            </transition>
          </el-col>
        </el-row>
      </div>
      <div class="text item">
        {{ post.post.body }}
        {{ post.post.point }}
      </div>
    </el-card>
  </transition>
</template>

<script>
import axios from "axios"

export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    loginId() {
      return this.$store.state.users.loginId
    }
  },
  methods: {
    async setHelperId() {
      try {
        var response = await axios.post(process.env.postUrl + "/helper", {
          id: this.post.post.id,
          token: this.$store.state.users.token
        })
        console.log(this.post)
        this.post.post = response.data
      } catch (e) {
        this.error = e.message
      }
    },
    async takeHelperId() {
      try {
        var response = await axios.delete(
          process.env.postUrl + "/helper/" + this.post.post.id,
          { data: { token: this.$store.state.users.token } }
        )
        this.post.post = response.data
      } catch (e) {
        this.error = e.message
      }
    },
    async donePayment() {
      try {
        var response = await axios.post(process.env.postUrl + "/done", {
          id: this.post.post.id,
          token: this.$store.state.users.token
        })
        console.log(this.post)
        this.post.post = response.data
      } catch (e) {
        this.error = e.message
      }
    },
    async doneAcceptance() {
      try {
        var response = await axios.put(
          process.env.postUrl + "/done/" + this.post.post.id,
          {
            // id: this.post.post.id,
            token: this.$store.state.users.token
          }
        )
        console.log(this.post)
        this.post.post = response.data
      } catch (e) {
        this.error = e.message
      }
    }
  }
}
</script>

<style>
.button-fade-enter-active,
.button-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.button-fade-enter,
.button-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
