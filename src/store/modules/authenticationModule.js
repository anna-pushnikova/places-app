import auth from '@/requests/auth'

export default {
  namespaced: true,

  state: {
    authentication: {
      authenticated: false,
      user: null,
      token: null
    }
  },

  mutations: {
    setAuthenticated(state, authenticated) {
      state.authenticated = authenticated
    },
    setUser(state, user) {
      state.user = user
    },
    setToken(state, token) {
      state.token = token
    }
  },
  
  actions: {
    async login ({ commit }, credentials) {
      const data = await auth.login(credentials)
      
      commit('setAuthenticated', true)
      commit('setUser', data.user)
      commit('setToken', data.access_token)
    },

    async register({commit}, credentials) {
      const data = await auth.register(credentials)

      commit('setAuthenticated', true)
      commit('setUser', data.user)
      commit('setToken', data.access_token)
    }
  }
}