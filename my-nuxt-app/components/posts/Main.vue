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
  async asyncData() {
    // メモ本来はここでデータを取得したいが、名前解決の観点からローカルでテストできないため、一旦getPostsでデータを取得する。
    // try {
    //   var callApi = async function () {
    //     console.log('set Users!!')
    //     var response = await axios.get(process.env.postUrl + "/posts")
    //     console.log(response)
    //     this.posts = response.data
    //     // commit('set', response.data)
    //   }
    //   setInterval(callApi,10000)
    // } catch (error) {
    // }
  },
  methods: {
    getPostsByUserId(id, name) {
      this.$emit("getPostsByUserId", id, name)
    }
  }
}
</script>

<style></style>
