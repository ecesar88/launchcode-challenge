const ENDPOINTS = {
  quotes: {
    get: () => "quotes",
    getOne: (id: string) => `/quotes/${id}`,
  },
  checkWxApi: {
    station: (stId: string) => `/station/${stId}`,
    metar: (stId: string) => `/metar/${stId}`,
    taf: (stId: string) => `/taf/${stId}`,
  },
}

export default ENDPOINTS
