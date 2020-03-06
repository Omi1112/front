import axios from "axios";

export const state = () => ({
  token: "",
  auth: false,
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setAuth(state, auth) {
    state.auth = auth
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
    console.log('userData')
    var response = await axios.post('http://localhost:8080/users', userData)
    commit('setAuth', true)
  },
  async login({ commit }, userData) {
    var response = await axios.post('http://localhost:8080/users/login', userData)

    commit('setToken', response.data.token)
    commit('setAuth', true)
  },
  async logout({ commit }) {
    commit('setToken', "")
    commit('setAuth', false)
  },
}
