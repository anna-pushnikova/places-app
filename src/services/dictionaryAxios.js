import axios from 'axios'

let instance = axios.create()

instance.defaults.baseURL = process.env.VUE_APP_DICTIONARY_URL
instance.defaults.responseType = 'json'

const token = process.env.VUE_APP_DICTIONARY_TOKEN
instance.defaults.headers['Authorization'] = `Token ${token}`

instance.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

export default instance
