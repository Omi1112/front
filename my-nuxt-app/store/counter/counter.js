import axios from "axios";

export const state = () => ({
  count: 0,
  items: [],
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
  set(state, items) {
    console.log('set commit!!')
    state.items = items
  },
}

export const actions = {
  // 引数commitは謎ルールよくわからん
  async getItems({ commit }) {
    var callApi = async function() {
      var response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      commit('set', response)
    }
    setInterval(callApi,10000)
  },
}
