import Vuex from "vuex"
import * as count from "@/store/points"
import { createLocalVue } from "@vue/test-utils"

const localVue = createLocalVue()
localVue.use(Vuex)

let action
const testedAction = (context = {}, payload = {}) => {
  return count.actions[action](context, payload)
}

describe("store/points.js", () => {
  const OLD_ENV = process.env
  let store

  beforeEach(() => {
    jest.resetModules() // this is important - it clears the cache
    process.env = { ...OLD_ENV }
    delete process.env.NODE_ENV
    store = new Vuex.Store(count)
  })

  afterEach(() => {
    process.env = OLD_ENV
  })

  describe("actions", () => {
    process.env.pointUrl = "http://post:8090"

    let commit
    let state
    beforeEach(() => {
      commit = store.commit
      state = store.state
    })
    test("getPosts", async done => {
      action = "getUsers"
      expect(store.state.posts.length).toBe(0)
      await testedAction({ commit, state })
      expect(store.state.posts.length).not.toBe(0)
      done()
    })
    test("getPostsByUserId", async done => {
      action = "getPostsByUserId"
      expect(store.state.posts.length).toBe(0)
      await testedAction({ commit, state }, 1)
      expect(store.state.posts.length).not.toBe(0)
      done()
    })
    test("getPostsByTagId", async done => {
      action = "getPostsByTagId"
      expect(store.state.posts.length).toBe(0)
      await testedAction({ commit, state }, 1)
      expect(store.state.posts.length).not.toBe(0)
      done()
    })
    test("getTagsByBody", async done => {
      action = "getTagsByBody"
      expect(store.state.posts.length).toBe(0)
      await testedAction({ commit, state }, "テス")
      expect(store.state.posts.length).not.toBe(0)
      done()
    })
  })
})
