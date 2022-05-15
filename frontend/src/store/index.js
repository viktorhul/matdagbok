import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      id: 5,
      username: 'viktor',
    }
  },
  getters: {
    currentUser(state) {
      return state.user;
    }
  },
  mutations: {
    logoutUser(state) {
      state.user = null;
    }
  },
  actions: {
  },
  modules: {
  }
})
