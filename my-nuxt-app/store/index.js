export const state = () => ({
  counter: 0
})

export const mutations = {
  increment (state) {
    state.counter++
  }
}


// import Vue from "vue";
// import Vuex from "vuex";
// import mutations from "./mutations";
// import actions from "./actions";
// import state from "./state";

// Vue.use(Vuex);

// const store = () =>
//   new Vuex.Store({
//     state,
//     mutations,
//     actions
//   });

// export default store;
