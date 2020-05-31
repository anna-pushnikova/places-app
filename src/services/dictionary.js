import axios from '@/services/dictionaryAxios'

export default {
  async searchWord(word) {
    word = word.toLowerCase().trim()
    try {
      const response = await axios.get(`${word}`)
      return response.data 
    } catch(error) {
      if (error.response && error.response.status === 404) {
        return error.response.status
      }
    }
  }
}