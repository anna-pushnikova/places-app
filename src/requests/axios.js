import auth from './auth'
import axios from 'axios'

const init = () => {
  axios.defaults.baseURL = process.env.VUE_APP_BASE_URL
  axios.defaults.responseType = 'json'

  setResponseSettings()

  if (auth.isAuthenticated()) {
    axios.defaults.headers['Authorization'] = `Bearer ${auth.getToken()}`
  }
}

const setResponseSettings = () => {
  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401 && auth.isAuthenticated()) {
        auth.logout()
        window.location.href = '/'
      }

      return Promise.reject(error)
    }
  )
}

export default init
