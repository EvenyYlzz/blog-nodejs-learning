import { createStore } from 'vuex'

export default createStore({
  state: {
    username: '',
  },
  mutations: {
    changeUsername(state, username){
      state.username = username
    }
  },
  actions: {
  },
  modules: {
  }
})
