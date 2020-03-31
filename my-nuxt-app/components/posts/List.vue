<template>
  <div class="post-list">
    <transition-group tag="div" class="list" name="button-fade" mode="out-in">
      <div v-for="(post, key) in posts" :key="post.post.id" :data-index="key">
        <card key="key" :post="post" />
      </div>
    </transition-group>
    <i class="el-icon-bottom" v-if="lastGetLen != 0" @click="getPosts"></i>
  </div>
</template>

<script>
import Card from "~/components/posts/Card.vue"
export default {
  components: {
    Card
  },
  computed: {
    lastGetLen() {
      return this.$store.state.posts.lastGetLen
    }
  },
  props: {
    posts: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPosts: async function(event) {
      await this.$store.dispatch("posts/" + this.$store.state.posts.lastCallFunc)
    }
  }
}
</script>

<style></style>
