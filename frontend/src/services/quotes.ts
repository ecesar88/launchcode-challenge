import API from "../config/axios"
import ENDPOINTS from "../constants/endpoints"

class QuotesService {
  async getAll() {
    return API.get(ENDPOINTS.quotes.get())
  }

  async getOne(id: string) {
    return API.get(ENDPOINTS.quotes.getOne(id))
  }
}

export default new QuotesService()
