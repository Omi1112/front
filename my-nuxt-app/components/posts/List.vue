<template>
  <div id="post-list">
    <transition-group tag="div" class="list" name="button-fade">
      <div v-for="(post, key) in posts" :key="post" :data-index="key">
          <card :post="post" key="key" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Card from '~/components/posts/Card.vue'
export default {
  components: {
    Card,
  },
  props:['posts'],
}
</script>

<style>
</style>
