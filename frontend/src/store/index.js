import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null
  },
  getters: {
    currentUser(state) {
      return state.user;
    }
  },
  mutations: {
    loginUser(state, userInfo) {
      const user = {
        token: userInfo.token,
        username: userInfo.username
      };
      this.state.user = user;
      localStorage.setItem('state', JSON.stringify(state));
    },
    logoutUser(state) {
      state.user = null;
      localStorage.removeItem('state')
    },
    initializeUser(state) {
      const storedState = localStorage.getItem('state');
      if (storedState) {
        this.replaceState(
          Object.assign(state, JSON.parse(storedState))
        )
      }
    }
  },
  actions: {

  },
  modules: {
  }
})
