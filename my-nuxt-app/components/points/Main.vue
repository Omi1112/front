<template>
  <section>
    <List :points="data" />
  </section>
</template>

<script>
import List from "~/components/points/List.vue"
import axios from "axios"

export default {
  components: {
    List
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      points: []
    }
  }
}
</script>

<style></style>
