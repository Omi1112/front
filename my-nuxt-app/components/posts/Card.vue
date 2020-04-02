<template>
  <transition name="conter-fade" mode="out-in">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="5">
          <el-col :span="15" class="card-header-col">
            <el-button type="text" @click="getByUserId(post.user.id)">
              {{ post.user.name }}さん
            </el-button>
            の投稿 <br />
            <div v-if="post.post.helperUserId === 0" class="helper-name">
              誰か助けてください！！
            </div>
            <div v-else class="helper-name">
              <span>
                <el-button
                  class="helper-name"
                  type="text"
                  @click="getByUserId(post.helperUser.id)"
                >
                  <span v-if="post.helperUser.id == loginId">
                    あなたが
                  </span>
                  <span v-else>{{ post.helperUser.name }}さんが</span>
                </el-button>
                <span v-if="post.post.status != 0">
                  助けました！
                </span>
                <span v-else>助けます！</span>
              </span>
            </div>
          </el-col>
          <el-col :span="8" class="card-header-btn">
            <i class="el-icon-ice-cream-round" />
            {{ post.post.point }}ポイント <br />
            <transition name="button-fade" mode="out-in">
              <span v-if="post.post.userId === loginId" key="me">
                <transition name="button-fade" mode="out-in">
                  <el-button
                    v-if="post.post.helperUserId === 0"
                    key="accepting"
                    type="success"
                    disabled
                  >
                    受付中
                  </el-button>

                  <el-button
                    v-else-if="
                      post.post.helperUserId != 0 && post.post.status === 0
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
                </transition>
              </span>

              <span v-else-if="post.post.helperUserId === 0" key="none">
                <el-button key="help" @click="setHelperId">
                  助ける！
                </el-button>
              </span>

              <span v-else-if="post.post.helperUserId === loginId" key="helper">
                <transition name="button-fade" mode="out-in">
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
                </transition>
              </span>

              <span v-else key="other">
                <el-button key="other" type="success" disabled>
                  他の人が助ける
                </el-button>
              </span>
            </transition>
          </el-col>
        </el-row>
      </div>
      <div class="text item">
        {{ post.post.body }}<br />
        関連タグ
        <span v-for="(tag, key) in post.tags" :key="key" :data-index="key">
          ：<el-button type="text" @click="getByTagId(tag.id)">
            {{ tag.body }}
          </el-button>
        </span>
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
    async getByUserId(id) {
      this.$store.dispatch("posts/initPosts")
      await this.$store.dispatch("posts/getPostsByUserId", id)
    },
    async getByTagId(id) {
      this.$store.dispatch("posts/initPosts")
      await this.$store.dispatch("posts/getPostsByTagId", id)
    },
    async setHelperId() {
      try {
        var response = await axios.post(process.env.postUrl + "/helper", {
          id: this.post.post.id,
          token: this.$store.state.users.token
        })
        this.post = response.data
        await this.$store.dispatch(
          "users/updatePoint",
          this.$store.state.users.loginId
        )
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
        this.post = response.data
        await this.$store.dispatch(
          "users/updatePoint",
          this.$store.state.users.loginId
        )
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
        this.post = response.data
        await this.$store.dispatch(
          "users/updatePoint",
          this.$store.state.users.loginId
        )
      } catch (e) {
        this.error = e.message
      }
    },
    async doneAcceptance() {
      try {
        var response = await axios.put(
          process.env.postUrl + "/done/" + this.post.post.id,
          {
            token: this.$store.state.users.token
          }
        )
        this.post = response.data
        await this.$store.dispatch(
          "users/updatePoint",
          this.$store.state.users.loginId
        )
      } catch (e) {
        this.error = e.message
      }
    }
  }
}
</script>

<style>
.helper-name {
  height: 0px;
  justify-content: center;
  display: flex;
  align-items: center;
}
.box-card {
  font-size: 14px;
  max-width: 480px;
  margin: 0 auto;
  margin-bottom: 20px;
}

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
