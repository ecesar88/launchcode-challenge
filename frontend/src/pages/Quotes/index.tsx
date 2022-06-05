import React, { useEffect, useState } from "react"
import {
  Flex,
  useToast,
  Text,
  IconButton,
  CircularProgress,
} from "@chakra-ui/react"

import Card from "../../components/Card"
import CustomTable, { ITable, ITableHeader } from "../../components/Table"
import { formatISODateToCanadian } from "../../utils/functions"
import { useQuery } from "react-query"
import QuotesService from "../../services/quotes"
import IQuote from "../../models/quote"
import { SearchIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../constants/routes"
import { FaCalendarDay, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa"
import { BsFillPeopleFill } from "react-icons/bs"

const Quotes = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  const { isLoading: _isLoadingReactQuery } = useQuery(
    "quotes",
    QuotesService.getAll,
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

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [_isLoadingReactQuery])

  const navigate = useNavigate()

  const tableHeader: ITableHeader<IQuote>[] = [
    {
      keyName: "departureLocation",
      label: "Departure",
      headerChildren: <FaPlaneDeparture size="1rem" />,
    },
    {
      keyName: "destinationLocation",
      label: "Destination",
      headerChildren: <FaPlaneArrival size="1rem" />,
    },
    {
      keyName: "departureDate",
      label: "Departure Date",
      format: formatISODateToCanadian,
      headerChildren: <FaCalendarDay size="1rem" />,
    },
    {
      keyName: "returnDate",
      label: "Return Date",
      format: formatISODateToCanadian,
      headerChildren: <FaCalendarDay size="1rem" />,
    },
    {
      keyName: "numberOfTravellers",
      label: "No. of Travellers",
      headerChildren: <BsFillPeopleFill size="1rem" />,
      cellStyle: {
        display: "flex",
        justifyContent: "flex-end",
      },
    },
    {
      render: (row) => {
        return (
          <IconButton
            colorScheme="blue"
            aria-label="go-to-quote"
            icon={<SearchIcon />}
            size="sm"
            onClick={() => {
              navigate(`${ROUTES.QUOTE}/${row?.id}`)
            }}
          />
        )
      },
    },
  ]

  const tableData: ITable<IQuote> = {
    header: tableHeader,
    content: data,
  }

  return (
    <Flex direction="column" gap="1rem" width="100%">
      <Flex width="100%" height={isLoading ? "100%" : "auto"}>
        <Card width="100%" height="100%">
          {isLoading ? (
            <Flex justifyContent="center" alignItems="center" height="100%">
              <CircularProgress size="4rem" isIndeterminate color="brand.200" />
            </Flex>
          ) : data?.length ? (
            <CustomTable
              header={tableData.header}
              content={tableData.content}
            />
          ) : (
            <Flex
              direction="column"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <div>
                <Text fontSize="2rem">No data :(</Text>
              </div>

              <div>
                <Text>Try again later!</Text>
              </div>
            </Flex>
          )}
        </Card>
      </Flex>
    </Flex>
  )
}

export default Quotes
