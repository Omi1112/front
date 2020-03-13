<template>
  <transition name="conter-fade" mode="out-in">
  <el-card shadow="hover" class="box-card" >
    <div slot="header" class="clearfix">
      <el-row :gutter="20">
        <el-col :span="12"><span>{{loginId}}</span></el-col>
        <el-col :span="12"><span>{{post.user.name}}</span></el-col>
        <el-col :span="12"><span>{{post.post.helpserUserId}}</span></el-col>
        <el-col :span="12">
        <transition name="button-fade" mode="out-in">
          <el-button key="help" v-if="post.post.helpserUserId === 0" @click="set">助ける！</el-button>
          <el-button key="delete" v-else-if="post.post.helpserUserId === loginId" type="danger" @click="take">解除！</el-button>
          <el-button key="other" v-else type="success" disabled>他の人が助けるよ！</el-button>
        </transition>
        </el-col>
      </el-row>
    </div>
    <div class="item">
      {{ post.post.body }}
    </div>
  </el-card>
  </transition>
</template>

<script>
import axios from "axios";

export default {
  computed: {
    loginId() {return this.$store.state.users.loginId}
  },
  props:['post'],
  methods: {
    async set() {
      try {
        var response = await axios.post(
          'http://localhost:8090/helper',
          {id: this.post.post.id, token: this.$store.state.users.token}
        )
        console.log(this.post)
        this.post.post = response.data
      } catch(e) {
        this.error = e.message
      }
    },
    async take() {
      try {
        var response = await axios.delete(
          'http://localhost:8090/helper/' + this.post.post.id,
          {data:{token: this.$store.state.users.token}}
        )
        this.post.post = response.data
      } catch(e) {
        this.error = e.message
      }
    },
  }
}
</script>

<style>
/* .item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 480px;
  margin:  0 auto;
} */

.button-fade-enter-active, .button-fade-leave-active {
  transition: all .5s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.button-fade-enter, .button-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
