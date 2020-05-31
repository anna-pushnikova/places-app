import axios from 'axios'

let instance = axios.create()

instance.defaults.baseURL = process.env.VUE_APP_COUNTRIES_URL
instance.defaults.responseType = 'json'

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default instance