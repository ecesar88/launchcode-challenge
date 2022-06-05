import React, { useEffect, useState } from "react"
import Card from "../../components/Card"
import { Text, Flex, IconButton, useToast, useToken } from "@chakra-ui/react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from "react-query"
import QuotesService from "../../services/quotes"
import {
  FaCalendarDay,
  FaChevronCircleLeft,
  FaPlaneArrival,
  FaPlaneDeparture,
  FaShuttleVan,
} from "react-icons/fa"
import IQuote from "../../models/quote"
import { formatISODateToCanadian } from "../../utils/functions"

const Quote = () => {
  const [data, setData] = useState<IQuote>()
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()
  const [brand200] = useToken("colors", ["brand.200"])

  const { quoteId } = useParams()
  const navigate = useNavigate()

  const { isLoading: _isLoadingReactQuery } = useQuery(
    "fetchQuote",
    () => QuotesService.getOne(quoteId as string),
    {
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
    }
  )

  // Simulte real request with a fake delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [_isLoadingReactQuery])

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
                From {data?.departureLocation} to {data?.destinationLocation}
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
            >
              <Flex direction="column" alignItems="center" marginBottom="3rem">
                <FaPlaneDeparture size="3rem" />
                <Text fontWeight="bold">{data?.departureLocation}</Text>
              </Flex>

              <Flex direction="column" alignItems="center">
                <FaPlaneArrival size="3rem" />
                <Text fontWeight="bold">{data?.destinationLocation}</Text>
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
                {data?.transportationType ? (
                  data?.transportationType?.map((transportation) => (
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
                <FaShuttleVan size="2rem" color={brand200} />
                <Text fontWeight="bold">Contact</Text>
              </Flex>

              <Flex>
                {data?.contact?.length ? (
                  data?.contact?.map((contact) => (
                    <Flex key={contact?.id} direction="column" gap="1rem">
                      <Flex gap="1rem">
                        <Flex gap="1rem">
                          <Text fontWeight="bold">Phone</Text>
                          <Text>{contact?.contactInformation}</Text>
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
