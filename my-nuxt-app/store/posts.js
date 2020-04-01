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
  addPosts(state, posts) {
    state.posts = state.posts.concat(posts)
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
  initPosts({ commit, state }) {
    commit("setPosts", [])
  },
  async getPosts({ commit, state }) {
    commit("setLastCallFunc", "getPosts")
    var response = await axios.get(process.env.postUrl + "/posts", {
      params: {
        offset: state.posts.length
      }
    })
    if (response.data !== null) {
      commit("addPosts", response.data)
      commit("setLastGetLen", response.data.length)
    } else {
      commit("setLastGetLen", 0)
    }
  },
  async getPostsByUserId({ commit, state }, id) {
    commit("setLastCallFunc", "getPostsByUserId")
    var response = await axios.get(process.env.postUrl + "/user/" + id, {
      params: {
        offset: state.posts.length
      }
    })
    if (response.data !== null) {
      commit("addPosts", response.data)
      commit("setLastGetLen", response.data.length)
    } else {
      commit("setLastGetLen", 0)
    }
  },
  async getPostsByHelperId({ commit, state }, id) {
    commit("setLastCallFunc", "getPostsByHelperId")
    var response = await axios.get(process.env.postUrl + "/helper/" + id, {
      params: {
        offset: state.posts.length
      }
    })
    if (response.data !== null) {
      commit("addPosts", response.data)
      commit("setLastGetLen", response.data.length)
    } else {
      commit("setLastGetLen", 0)
    }
  },
  async getPostsByTagId({ commit, state }, id) {
    commit("setLastCallFunc", "getPostsByTagId")
    var response = await axios.get(process.env.postUrl + "/tag/id/" + id, {
      params: {
        offset: state.posts.length
      }
    })
    if (response.data !== null) {
      commit("addPosts", response.data)
      commit("setLastGetLen", response.data.length)
    } else {
      commit("setLastGetLen", 0)
    }
  },
  async getTagsByBody({ commit }, body) {
    var response = await axios.get(process.env.postUrl + "/tag/like/" + body)
    commit("setTags", response.data)
  }
}
