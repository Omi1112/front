<template>
  <div class="post-list">
    <transition-group tag="div" class="list" name="button-fade" mode="out-in">
      <div v-for="(post, key) in posts" :key="post.post.id" :data-index="key">
        <card key="key" :post="post" />
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
  }
}
</script>

<style></style>
