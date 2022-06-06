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
import QuotesService from "../../services/QuotesService"
import IQuote from "../../models/IQuote"
import { SearchIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../constants/routes"
import { FaCalendarDay, FaPlaneArrival, FaPlaneDeparture } from "react-icons/fa"
import { BsFillPeopleFill } from "react-icons/bs"
import { MdLocationCity } from "react-icons/md"

const Quotes = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const toast = useToast()

  const { isLoading: _isLoadingReactQuery } = useQuery(
    "fetchQuotes",
    QuotesService.getAll,
    {
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
    }
  )

  // Simulate real request with a fake delay
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }, [_isLoadingReactQuery])

  const navigate = useNavigate()

  const tableHeader: ITableHeader<IQuote>[] = [
    {
      render: (row) =>
        row?.departure?.cityName ? (
          <>
            <b>
              {row.departure?.cityName} - {row?.departure.country}
            </b>
          </>
        ) : (
          <>
            <b>{row?.departure.country}</b>
          </>
        ),
      label: "Departure city",
      headerChildren: <MdLocationCity size="1rem" />,
    },
    {
      render: (row) => (
        <>
          <b>{row.departure?.ICAOCode}</b> - {row.departure.airportName}
        </>
      ),
      label: "Departure airport",
      headerChildren: <FaPlaneDeparture size="1rem" />,
    },
    {
      render: (row) =>
        row?.destination?.cityName ? (
          <>
            <b>
              {row.destination?.cityName} - {row?.destination.country}
            </b>
          </>
        ) : (
          <>
            No city info available - <b>{row?.destination.country}</b>
          </>
        ),
      label: "Destionation city",
      headerChildren: <MdLocationCity size="1rem" />,
    },
    {
      render: (row) => (
        <>
          <b>{row?.destination?.ICAOCode}</b> - {row?.destination?.airportName}
        </>
      ),
      label: "Destination airport",
      headerChildren: <FaPlaneArrival size="1rem" />,
    },
    {
      render: (row) => formatISODateToCanadian(row?.departureDate),
      label: "Departure Date",
      headerChildren: <FaCalendarDay size="1rem" />,
    },
    {
      render: (row) => formatISODateToCanadian(row?.returnDate),
      label: "Return Date",
      headerChildren: <FaCalendarDay size="1rem" />,
    },
    {
      render: (row) => row?.numberOfTravellers.toString(),
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
            bg="brand.200"
            color="white"
            aria-label="go-to-quote"
            icon={<SearchIcon />}
            size="sm"
            onClick={() => {
              navigate(`${ROUTES.QUOTE}/${row?.id}`, {
                state: {
                  id: row?.id,
                },
              })
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
