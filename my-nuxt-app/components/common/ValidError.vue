<template>
  <transition name="component-fade" mode="out-in">
    <p v-if="errors.length" class="help is-danger">
      {{ errors[0] }}
    </p>
  </transition>
</template>

<script>
export default {
  props: {
    errors: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.component-fade-enter-active,
.component-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.component-fade-enter,
.component-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
