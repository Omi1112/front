import axios from "axios";

export const state = () => ({
  count: 0,
  users: [],
})

export const mutations = {
  add(state) {
    console.log('add')
    state.count += 1
  },
  take (state) {
    state.count -= 1
  },
  reset(state) {
    state.count = 0
  },
  set(state, users) {
    // console.log('set Users!!')
    state.users = users
  },
}

export const actions = {
  // 引数commitは謎ルールよくわからん
  async getUsers({ commit }) {
    var callApi = async function () {
      console.log('set Users!!')
      var response = await axios.get('http://localhost:8080/users')
      commit('set', response.data)
    }
    setInterval(callApi,10000)
  },
  async signup({ commit }, userData) {
    console.log(userData)
    var response = await axios.post('http://localhost:8080/users')
    console.log(response)
  },
}
