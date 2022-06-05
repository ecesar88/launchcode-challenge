import { ISODateRegex } from "../constants/regex"

export const formatISODateToCanadian = (dateString: string) =>
  new Date(dateString?.replace(ISODateRegex, "00:00:00")).toLocaleDateString(
    "en-CA"
  )
