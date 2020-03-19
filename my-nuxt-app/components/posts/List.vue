<template>
  <div class="post-list">
    <transition-group tag="div" class="list" name="button-fade" mode="out-in">
      <div v-for="(post, key) in posts" :key="post.post.id" :data-index="key">
        <card key="key" v-on:getPostsByUserId="getPostsByUserId" :post="post" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Card from "~/components/posts/Card.vue"
export default {
  components: {
    Card
  },
  props: {
    posts: {
      type: Object,
      required: true
    }
  },
  methods: {
    getPostsByUserId(id, name) {
      this.$emit('getPostsByUserID', id, name)
    },
  }
}
</script>

<style></style>
