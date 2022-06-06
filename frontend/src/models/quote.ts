type Contact = {
  id: string
  contactInformation: string
  quoteId: string
}

type Transportation = {
  id: string
  type: string
  availableOnSite: boolean
}

interface IQuote {
  id: string
  createdAt: string
  updatedAt: string
  departureAirportName: string
  departureLocation: string
  destinationLocation: string
  destinationAirportName: string
  departureDate: string
  returnDate: string
  numberOfTravellers: number
  contact: Contact[]
  transportationType: Transportation[]
}

export default IQuote
