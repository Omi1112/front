import axios from "axios"

export const state = () => ({
  posts: []
})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
    console.log(state.posts)
  }
}

export const actions = {
  async getPosts ({ commit }) {
    var response = await axios.get(process.env.postUrl + "/posts")
    commit("setPosts", response.data)
  },
  async getPostsByUserId ({ commit }, id) {
    var response = await axios.get(process.env.postUrl + "/user/" + id)
    commit("setPosts", response.data)
  },
  async getPostsByHelperId ({ commit }, id) {
    var response = await axios.get(process.env.postUrl + "/helper/" + id)
    commit("setPosts", response.data)
  }
}
