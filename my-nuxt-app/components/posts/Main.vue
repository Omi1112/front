<template>
  <section>
    <Create />
    <List :posts="data" @getPostsByUserId="getPostsByUserId" />
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
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      posts: [],
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
