import axios, { AxiosInstance } from "axios"
import ENDPOINTS from "../constants/endpoints"

class CheckWXService {
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_CHECK_WX_API_BASE_URL,
      headers: {
        "X-API-Key": import.meta.env.VITE_CHECK_WX_API_KEY,
      },
    })
  }

  axiosInstance: AxiosInstance

  async getStation(station: string) {
    try {
      return await this.axiosInstance.get(ENDPOINTS.checkWxApi.station(station))
    } catch (error) {
      return error
    }
  }

  async getMetar(station: string) {
    try {
      return await this.axiosInstance.get(ENDPOINTS.checkWxApi.metar(station))
    } catch (error) {
      return error
    }
  }
  
  async getTaf(station: string) {
    try {
      return await this.axiosInstance.get(ENDPOINTS.checkWxApi.taf(station) + "/decoded")
    } catch (error) {
      return error
    }
  }
  
}

export default new CheckWXService()
