interface Cloud {
  base_feet_agl: number
  base_meters_agl: number
  code: string
  feet: number
  meters: number
  text: string
}

interface Timestamp {
  from: string
  to: string
}

interface Visibility {
  meters: string
  meters_float: number
  miles: string
  miles_float: number
}

interface Wind {
  degrees: number
  speed_kph: number
  speed_kts: number
  speed_mph: number
  speed_mps: number
}

interface Indicator {
  code: string
  desc: string
  text: string
}

interface Change {
  indicator: Indicator
}

interface Ceiling {
  base_feet_agl: number
  base_meters_agl: number
  code: string
  feet: number
  meters: number
  text: string
}

interface Forecast {
  clouds: Cloud[]
  timestamp: Timestamp
  visibility: Visibility
  wind: Wind
  change: Change
  ceiling: Ceiling
}

interface Geometry {
  coordinates: number[]
  type: string
}

interface Station {
  geometry: Geometry
  icao: string
  location: string
  name: string
  type: string
}

interface Timestamp2 {
  bulletin: string
  from: string
  issued: string
  to: string
}

interface Datum {
  forecast: Forecast[]
  icao: string
  raw_text: string
  station: Station
  timestamp: Timestamp2
}

interface IWeatherData {
  results: number
  data: Datum[]
}

export default IWeatherData
