import store from '@/store/index.js'
import axios from 'axios'

export default {
  /**
   * Login user using traditional email & password credentials.
   *
   * @param credentials
   * @returns Object
   */
  async login (credentials) {
    const response = await axios.post('auth/login', credentials)

    return response.data
  },

  /**
   * Register new user.
   *
   * @param credentials
   * @returns Object
   */
  async register (credentials) {
    const response = await axios.post('auth/register', credentials)
    return response.data
  },

  /**
   * Get current user.
   *
   * @returns Object
   */
  async me () {
    const response = await axios.get('auth/me')

    return response.data.data
  },


  /**
   * Logout.
   */
  logout () {
    store.commit('authentication/setAuthenticated', false)
    store.commit('authentication/setUser', null)
    store.commit('authentication/setToken', null)
  },

  /**
   * Check if user is authenticated.
   *
   * @returns {boolean}
   */
  isAuthenticated () {
    return store.state.authentication.authenticated
  },

  /**
   * Get JWT token.
   *
   * @returns {null|CancelToken}
   */
  getToken () {
    return store.state.authentication.token
  },

  /**
   * Get authenticated user.
   * @returns {Object | null}
   */
  getUser () {
    return store.state.authentication.user
  }
}
