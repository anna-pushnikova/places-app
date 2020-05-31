import auth from './auth'
import axios from 'axios'

let instance = axios.create()

instance.defaults.baseURL = process.env.VUE_APP_BASE_URL
instance.defaults.responseType = 'json'

if (auth.isAuthenticated()) {
  instance.defaults.headers['Authorization'] = `Bearer ${auth.getToken()}`
}

instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401 && auth.isAuthenticated()) {
      auth.logout()
      window.location.href = '/'
    }

    return Promise.reject(error)
  }
)


export default instance
