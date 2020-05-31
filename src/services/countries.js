import axios from '@/services/countriesAxios'

export default {
  async searchCountry(country) {
    country = country.toLowerCase().trim()
    try {
      const response = await axios.get(`${country}`)
      return response.data
    } catch(error) {
      if (error.response && error.response.status === 404) {
        return error.response.status
      }
    }
  }
}