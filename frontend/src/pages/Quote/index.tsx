import React, { useState } from "react"
import Card from "../../components/Card"
import {
  Text,
  Flex,
  IconButton,
  useToast,
  useToken,
  Link,
} from "@chakra-ui/react"
import {
  useNavigate,
  useParams,
  Link as ReactRouterLink,
} from "react-router-dom"
import { useQuery } from "react-query"
import QuotesService from "../../services/quotes"
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

const Quote = () => {
  const [data, setData] = useState<IQuote>()

  const toast = useToast()
  const [brand200] = useToken("colors", ["brand.200"])

  const { quoteId } = useParams()
  const navigate = useNavigate()

  useQuery("fetchQuote", () => QuotesService.getOne(quoteId as string), {
    onSuccess: (data) => {
      setData(data.data)
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
                From {data?.departure?.airportName} ({data?.departure?.ICAOCode}) to{" "}
                {data?.destination?.airportName} ({data?.destination?.ICAOCode})
              </Text>
            </Flex>
          </Flex>

          <Flex gap="1rem" justifyContent="space-between">
            <Flex
              padding="1rem"
              direction="column"
              gap="1rem"
              borderRight="1px solid"
              borderRightColor="brand.700"
              maxWidth="30%"
            >
              <Flex direction="column" alignItems="center" marginBottom="3rem">
                <FaPlaneDeparture size="6rem" color={brand200} />
                <Text fontWeight="bold" fontSize="2.8rem">
                  {data?.departure?.ICAOCode}
                </Text>
                <Text fontWeight="bold" fontSize="0.8rem">
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
                <Text fontWeight="bold" fontSize="0.8rem">
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

            <Flex direction="column" gap="6rem" padding="1rem">
              <Flex gap="1rem" alignItems="center">
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

              <Flex gap="1rem" alignItems="center">
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
                      <Flex gap="1rem">
                        <Flex gap="1rem">
                          <Text fontWeight="bold">Phone</Text>
                          <Text>{contact?.phoneNumber}</Text>
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
        </Flex>
      </Card>
    </Flex>
  )
}

export default Quote
