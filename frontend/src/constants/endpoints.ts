const ENDPOINTS = {
  quotes: {
    get: () => "/quotes",
    getOne: (id: string) => `/quotes/${id}`,
  },
}

export default ENDPOINTS
