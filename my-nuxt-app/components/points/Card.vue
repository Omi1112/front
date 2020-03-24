<template>
  <transition name="conter-fade" mode="out-in">
    <el-card shadow="hover" class="box-card">
      <div slot="header" class="clearfix">{{ point.number }}ポイント</div>
      <div class="text item">
        {{ point.comment }}
      </div>
    </el-card>
  </transition>
</template>

<script>
import axios from "axios"

export default {
  props: {
    point: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.button-fade-enter-active,
.button-fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}
.button-fade-enter,
.button-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
