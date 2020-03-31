import axios from "axios"

export const state = () => ({
  posts: [],
  lastCallFunc: "",
  lastGetLen: 0,
  tags: []
})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  },
  setLastCallFunc(state, funcName) {
    state.lastCallFunc = funcName
  },
  setLastGetLen(state, len) {
    state.lastGetLen = len
  },
  setTags(state, tags) {
    state.tags = tags
  }
}

export const actions = {
  async getPosts({ commit, state }) {
    commit("setLastCallFunc", "getPosts")
    var response = await axios.get(process.env.postUrl + "/posts", {offset: state.posts.length})
    commit("setPosts", response.data)
    commit("setLastGetLen", response.data.length)
  },
  async getPostsByUserId({ commit, state }, id) {
    commit("setLastCallFunc", "getPostsByUserId")
    var response = await axios.get(process.env.postUrl + "/user/" + id, {offset: state.posts.length})
    commit("setPosts", response.data)
    commit("setLastGetLen", response.data.length)
  },
  async getPostsByHelperId({ commit, state }, id) {
    commit("setLastCallFunc", "getPostsByHelperId")
    var response = await axios.get(process.env.postUrl + "/helper/" + id, {offset: state.posts.length})
    commit("setPosts", response.data)
    commit("setLastGetLen", response.data.length)
  },
  async getPostsByTagId({ commit, state }, id) {
    commit("setLastCallFunc", "getPostsByTagId")
    var response = await axios.get(process.env.postUrl + "/tag/id/" + id, {offset: state.posts.length})
    commit("setPosts", response.data)
    commit("setLastGetLen", response.data.length)
  },
  async getTagsByBody({ commit }, body) {
    var response = await axios.get(process.env.postUrl + "/tag/like/" + body)
    commit("setTags", response.data)
  },
}
