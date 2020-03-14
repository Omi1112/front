<template>
  <section class="container">
    <login />
    <div>
      {{ auth }}
    </div>
  </section>
</template>

<script>
import Login from "~/components/Login.vue"

export default {
  components: {
    Login
  },
  data() {
    return {}
  },
  computed: {
    auth() {
      return this.$store.state.users.auth
    }
  },
  watch: {
    // auth(val,old) {
    //     console.log('auth:' + val)
    //     if (val) {
    //       this.$router.push("/")
    //     }
    // },
  }
}
</script>

<style>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
