type Contact = {
  id: string
  phoneNumber: string
  email: string
}

type Transportation = {
  id: string
  type: string
  availableOnSite: boolean
}

type Location = {
  id: string
  airportName: string
  cityName: string
  country: string
  ICAOCode: string
  IATACode: string
}

interface IQuote {
  id: string
  createdAt: string
  updatedAt: string

  departure: Location
  destination: Location

  departureDate: string
  returnDate: string

  numberOfTravellers: number

  contact: Contact[]
  transportation: Transportation[]
}

export default IQuote
