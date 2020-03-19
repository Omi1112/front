import Vue from 'vue'

Vue.filter('toLowercase', function (value) {
  return value.toLowerCase();
})
Vue.filter('addComma', function (value) {
  return value.toLocaleString();
})
