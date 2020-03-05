import Vue from "vue";
import dayjs from "dayjs";

// 表示日時のフォーマット
Vue.filter('formatDate', function (value) {
  if (value) {
    return dayjs().format('YYYY/MM/DD hh:mm')
  }
})

// 本文のトリミング
Vue.filter("description", function(value) {
  if (value) {
    return value.slice(0, 100) + "...";
  }
})
