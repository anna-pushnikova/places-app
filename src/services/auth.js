export default {
  getToken() {
    return localStorage.getItem('access_token')
  },

  setToken(token) {
    localStorage.setItem('access_token', token)
  },

  isAuthenticated() {
    return this.getToken() === null ? false : true
  },

  logout() {
    localStorage.removeItem('access_token')
  }
}
