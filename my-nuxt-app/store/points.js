import axios from "axios"

export const state = () => ({
  points: []
})

export const mutations = {
  setPoints(state, points) {
    state.points = points
  }
}

export const actions = {
  async getPointsByUserId({ commit }, id) {
    var response = await axios.get(process.env.pointUrl + "/points/" + id)
    commit("setPoints", response.data)
  }
}
