<template>
  <section>
    <List :points="points" />
  </section>
</template>

<script>
import List from "~/components/points/List.vue"
import axios from "axios"

export default {
  components: {
    List
  },
  computed: {
    points() {
      return this.$store.state.points.points
    }
  }
}
</script>

<style></style>
