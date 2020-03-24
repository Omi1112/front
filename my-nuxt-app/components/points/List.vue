<template>
  <div class="point-list">
    <transition-group tag="div" class="list" name="button-fade" mode="out-in">
      <div v-for="(point, key) in points" :key="point.id" :data-index="key">
        <card key="key" :point="point" />
      </div>
    </transition-group>
  </div>
</template>

<script>
import Card from "~/components/points/Card.vue"
export default {
  components: {
    Card
  },
  props: {
    points: {
      type: Object,
      required: true
    }
  }
}
</script>

<style></style>
