import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
    currentUser(state) {
      return state.user
    }
  },
  mutations: {
    loginUser(state, user) {
      state.user = user;

      localStorage.setItem('user', JSON.stringify(user))
    },
    logoutUser(state) {
      localStorage.removeItem('user')
      state.user = null;
    },
    initializeStore(state) {
      const userStorage = localStorage.getItem('user');

      if (userStorage) {
        state.user = JSON.parse(userStorage);
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
