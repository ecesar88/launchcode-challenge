import React, { useMemo, useState } from "react"
import Card from "../../components/Card"
import {
  Text,
  Flex,
  IconButton,
  useToast,
  useToken,
  Link,
} from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import QuotesService from "../../services/QuotesService"
import {
  FaCalendarDay,
  FaChevronCircleLeft,
  FaExternalLinkAlt,
  FaPhoneAlt,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaShuttleVan,
} from "react-icons/fa"
import IQuote from "../../models/IQuote"
import { formatISODateToCanadian } from "../../utils/functions"
import { METAR_TAF_URL } from "../../constants"
import CheckWxService from "../../services/CheckWXService"
import IWeatherData from "../../models/IWeatherData"

const Quote = () => {
  const [data, setData] = useState<IQuote>()
  const [weatherData, setWeatherData] = useState<IWeatherData>()

  const toast = useToast()
  const [brand200] = useToken("colors", ["brand.200"])

  const { quoteId } = useParams()
  const navigate = useNavigate()

  useQuery("fetchQuote", () => QuotesService.getOne(quoteId as string), {
    onSuccess: (data) => {
      setData(data.data?.data)
      toast({
        title: "Success",
        description: "Request made successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      })
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "We could not fetch the data you are looking for",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-right",
      })
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  })

  useQuery(
    [data],
    () => CheckWxService.getTaf(`${data?.departure?.ICAOCode}`),
    {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onSuccess: (data: any) => {
        setWeatherData(data?.data)
      },
      onError: () => {
        toast({
          title: "Something went wrong",
          description: "We could not fetch the airport weather data",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-right",
        })
      },
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
    }
  )

  const departureWeatherData = useMemo(() => {
    return weatherData?.data?.find(
      (station) =>
        station.icao?.toLocaleLowerCase() ===
        data?.departure?.ICAOCode.toLowerCase()
    )
  }, [weatherData, data])

  const destinationWeatherData = useMemo(() => {
    return weatherData?.data?.find(
      (station) =>
        station.icao?.toLocaleLowerCase() ===
        data?.departure?.ICAOCode.toLowerCase()
    )
  }, [weatherData, data])

  return (
    <Flex direction="column" gap="1rem" width="100%">
      <Card width="100%">
        <Flex gap="1rem" direction="column">
          <Flex
            gap="1rem"
            alignItems="center"
            paddingBottom="1rem"
            borderBottom="1px solid"
            borderBottomColor="brand.700"
          >
            <Flex>
              <IconButton
                aria-label="go-back"
                size="sm"
                bg="brand.200"
                color="white"
                icon={<FaChevronCircleLeft />}
                onClick={() => {
                  navigate(-1)
                }}
              />
            </Flex>

            <Flex>
              <Text fontWeight="bold">
                From {data?.departure?.airportName} ({data?.departure?.ICAOCode}
                ) to {data?.destination?.airportName} (
                {data?.destination?.ICAOCode})
              </Text>
            </Flex>
          </Flex>

          <Flex gap="1rem">
            <Flex
              padding="1rem"
              direction="column"
              gap="1rem"
              borderRight="1px solid"
              borderRightColor="brand.700"
              minWidth="20%"
            >
              <Flex
                direction="column"
                alignItems="center"
                justifyContent="space-between"
              >
                <FaPlaneDeparture size="6rem" color={brand200} />
                <Text fontWeight="bold" fontSize="2.8rem">
                  {data?.departure?.ICAOCode}
                </Text>
                <Text fontWeight="bold" fontSize="0.8rem" textAlign="center">
                  {data?.departure?.airportName}
                </Text>

                <Flex gap="1rem" alignItems="center">
                  <Link
                    fontWeight="bold"
                    href={`${METAR_TAF_URL}/${data?.departure?.ICAOCode?.toUpperCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    METAR & TAF
                  </Link>
                  <FaExternalLinkAlt />
                </Flex>
              </Flex>

              <Flex direction="column" alignItems="center">
                <FaPlaneArrival size="6rem" color={brand200} />
                <Text fontWeight="bold" fontSize="2.8rem">
                  {data?.destination?.ICAOCode}
                </Text>
                <Text fontWeight="bold" fontSize="0.8rem" textAlign="center">
                  {data?.destination?.airportName}
                </Text>

                <Flex gap="1rem" alignItems="center">
                  <Link
                    fontWeight="bold"
                    href={`${METAR_TAF_URL}/${data?.destination?.ICAOCode?.toUpperCase()}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    METAR & TAF
                  </Link>
                  <FaExternalLinkAlt />
                </Flex>
              </Flex>
            </Flex>

            <Flex w="100%" direction="column" gap="1rem">
              <Flex
                justifyContent="space-between"
                alignItems="center"
                borderBottom="1px solid"
                borderBottomColor="brand.700"
                w="100%"
              >
                <Flex gap="1rem" p="1rem">
                  <Flex>
                    <FaCalendarDay size="2.8rem" color={brand200} />
                  </Flex>

                  <Flex direction="column">
                    <Text fontWeight="bold">Departure Date</Text>

                    <Text>
                      {formatISODateToCanadian(data?.departureDate as string)}
                    </Text>
                  </Flex>
                </Flex>

                <Flex gap="1rem" p="1rem">
                  <Flex>
                    <FaCalendarDay size="2.8rem" color={brand200} />
                  </Flex>

                  <Flex direction="column">
                    <Text fontWeight="bold">Return Date</Text>

                    <Text>
                      {formatISODateToCanadian(data?.returnDate as string)}
                    </Text>
                  </Flex>
                </Flex>

                <Flex direction="column" gap="1rem" padding="1rem">
                  <Flex gap="1rem" alignItems="center">
                    <FaShuttleVan size="2rem" color={brand200} />
                    <Text fontWeight="bold">Transportation</Text>
                  </Flex>

                  <Flex>
                    {data?.transportation?.length ? (
                      data?.transportation?.map((transportation) => (
                        <Flex
                          key={transportation?.id}
                          direction="column"
                          gap="1rem"
                        >
                          <Flex gap="1rem">
                            <Flex gap="1rem">
                              <Text fontWeight="bold">Type</Text>
                              <Text>{transportation?.type}</Text>
                            </Flex>
                          </Flex>

                          <Flex gap="1rem">
                            <Flex gap="1rem">
                              <Text fontWeight="bold">Available on site</Text>
                              <Text>
                                {transportation?.availableOnSite ? "yes" : "no"}
                              </Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      ))
                    ) : (
                      <Flex>
                        <Text>No transportation information available</Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>

                <Flex direction="column" gap="1rem" padding="1rem">
                  <Flex gap="1rem" alignItems="center">
                    <FaPhoneAlt size="2rem" color={brand200} />
                    <Text fontWeight="bold">Contact</Text>
                  </Flex>

                  <Flex>
                    {data?.contact?.length ? (
                      data?.contact?.map((contact) => (
                        <Flex key={contact?.id} direction="column" gap="1rem">
                          <Flex gap="1rem" direction="column">
                            <Flex gap="1rem">
                              <Text fontWeight="bold">Phone</Text>
                              <Text>{contact?.phoneNumber}</Text>
                            </Flex>

                            <Flex gap="1rem">
                              <Text fontWeight="bold">Email</Text>
                              <Text>{contact?.email}</Text>
                            </Flex>
                          </Flex>
                        </Flex>
                      ))
                    ) : (
                      <Flex>
                        <Text>No contact information available</Text>
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>

              <Flex gap="1rem" direction="column" w="100%">
                <Flex>
                  <Text fontWeight="bold" color="brand.200" fontSize="1.6rem">
                    Weather info
                  </Text>
                </Flex>

                <Flex gap="3rem" justifyContent="space-between" w="100%">
                  <Flex direction="column" gap="1rem" w="100%">
                    <Flex fontWeight="bold" fontSize="1.2rem">
                      {data?.departure?.airportName}
                    </Flex>

                    <Flex direction="column">
                      {weatherData?.data?.length ? (
                        <>
                          <Flex justifyContent="space-between">
                            <Flex>
                              <Text fontWeight="bold">Airport</Text>
                            </Flex>

                            <Flex>
                              <Text>
                                {departureWeatherData?.station.location}
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex justifyContent="space-between">
                            <Flex>
                              <Text fontWeight="bold">Visibility</Text>
                            </Flex>

                            <Flex>
                              <Text>
                                {
                                  departureWeatherData?.forecast[0]?.visibility
                                    ?.meters
                                }{" "}
                                meters
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex justifyContent="space-between">
                            <Flex>
                              <Text fontWeight="bold">Clouds</Text>
                            </Flex>

                            <Flex>
                              <Text>
                                {departureWeatherData?.forecast[0]?.clouds?.map(
                                  (cloud, cIdx) => (
                                    <Text key={cIdx} pr="0.5rem">
                                      {cloud.base_feet_agl}ft {cloud.text}
                                    </Text>
                                  )
                                )}
                              </Text>
                            </Flex>
                          </Flex>

                          <Flex justifyContent="space-between">
                            <Flex>
                              <Text fontWeight="bold">Ceiling</Text>
                            </Flex>

                            <Flex>
                              <Text>
                                {
                                  departureWeatherData?.forecast[0]?.ceiling
                                    ?.base_feet_agl
                                }{" "}
                                ft{" "}
                                {
                                  departureWeatherData?.forecast[0]?.ceiling
                                    ?.text
                                }
                              </Text>
                            </Flex>
                          </Flex>
                        </>
                      ) : (
                        <Flex>
                          Weather data is unavailable for{" "}
                          {data?.departure?.ICAOCode}
                        </Flex>
                      )}
                    </Flex>
                  </Flex>

                  <Flex direction="column" w="100%">
                    {weatherData?.data?.length ? (
                      <>
                        <Flex justifyContent="space-between">
                          <Flex>
                            <Text fontWeight="bold">Airport</Text>
                          </Flex>

                          <Flex>
                            <Text>
                              {destinationWeatherData?.station.location}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex justifyContent="space-between">
                          <Flex>
                            <Text fontWeight="bold">Visibility</Text>
                          </Flex>

                          <Flex>
                            <Text>
                              {
                                destinationWeatherData?.forecast[0]?.visibility
                                  ?.meters
                              }{" "}
                              meters
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex justifyContent="space-between">
                          <Flex>
                            <Text fontWeight="bold">Clouds</Text>
                          </Flex>

                          <Flex>
                            <Text>
                              {destinationWeatherData?.forecast[0]?.clouds?.map(
                                (cloud, cIdx) => (
                                  <Text key={cIdx} pr="0.5rem">
                                    {cloud.base_feet_agl}ft {cloud.text}
                                  </Text>
                                )
                              )}
                            </Text>
                          </Flex>
                        </Flex>

                        <Flex justifyContent="space-between">
                          <Flex>
                            <Text fontWeight="bold">Ceiling</Text>
                          </Flex>

                          <Flex>
                            <Text>
                              {
                                destinationWeatherData?.forecast[0]?.ceiling
                                  ?.base_feet_agl
                              }{" "}
                              ft{" "}
                              {
                                destinationWeatherData?.forecast[0]?.ceiling
                                  ?.text
                              }
                            </Text>
                          </Flex>
                        </Flex>
                      </>
                    ) : (
                      <Flex>
                        Weather data is unavailable for{" "}
                        {data?.departure?.ICAOCode}
                      </Flex>
                    )}
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  )
}

export default Quote
