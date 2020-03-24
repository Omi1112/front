import axios from "axios"

export const state = () => ({
  token: "",
  loginId: 0,
  auth: false
})

export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setAuth(state, auth) {
    state.auth = auth
  },
  setLoginId(state, id) {
    state.loginId = id
  }
}

export const actions = {
  async getUsers({ commit }) {
    var callApi = async function() {
      console.log("set Users!!")
      var response = await axios.get(process.env.userUrl + "/users")
      commit("set", response.data)
    }
    setInterval(callApi, 10000)
  },
  async signup({ dispatch }, userData) {
    var response = await axios.post(process.env.userUrl + "/users", userData)
    await dispatch("login", userData)
  },
  async login({ commit }, userData) {
    console.log(userData)
    var response = await axios.post(process.env.userUrl + "/auth", userData)
    console.log(response.data)

    commit("setToken", response.data.token)
    commit("setLoginId", response.data.id)
    commit("setAuth", true)
  },
  async demo({ commit }) {
    var response = await axios.post(process.env.userUrl + "/demo")
    console.log(response.data)

    commit("setToken", response.data.token)
    commit("setLoginId", response.data.id)
    commit("setAuth", true)
  },
  async logout({ commit }) {
    commit("setToken", "")
    commit("setLoginId", 0)
    commit("setAuth", false)
  }
}
