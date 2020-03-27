<template>
  <section>
    <Create />
    <List :posts="posts" @getPostsByUserId="getPostsByUserId" />
  </section>
</template>

<script>
import List from "~/components/posts/List.vue"
import Create from "~/components/posts/Create.vue"
import axios from "axios"

export default {
  components: {
    List,
    Create
  },
  computed: {
    posts() {
      return this.$store.state.posts.posts
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isCollapse: true
    }
  },
  methods: {
    getPostsByUserId(id, name) {
      this.$emit("getPostsByUserId", id, name)
    }
  }
}
</script>

<style></style>
