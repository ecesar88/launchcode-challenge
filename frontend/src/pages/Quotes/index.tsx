import React, { useState } from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  CircularProgress,
  Flex,
  useToast,
  useToken,
  Text,
  Button,
  IconButton,
} from "@chakra-ui/react"
import { MdAttachMoney } from "react-icons/md"

import Card from "../../components/Card"
import CustomTable, { ITable, ITableHeader } from "../../components/Table"
import { formatISODateToCanadian } from "../../utils/functions"
import { useQuery } from "react-query"
import QuotesService from "../../services/quotes"
import IQuote from "../../models/quote"
import { SearchIcon } from "@chakra-ui/icons"
import { useNavigate } from "react-router-dom"
import ROUTES from "../../constants/routes"

const Quotes = () => {
  const [data, setData] = useState([])

  const [brand205] = useToken("colors", ["brand.205"])

  const toast = useToast()

  const { isLoading } = useQuery("quotes", QuotesService.getAll, {
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

  const navigate = useNavigate()

  const tableHeader: ITableHeader<IQuote>[] = [
    {
      keyName: "departureLocation",
      label: "Departure",
    },
    {
      keyName: "destinationLocation",
      label: "Destination",
    },
    {
      keyName: "departureDate",
      label: "Departure Date",
      format: formatISODateToCanadian,
    },
    {
      keyName: "returnDate",
      label: "Return Date",
      format: formatISODateToCanadian,
    },
    {
      keyName: "numberOfTravellers",
      label: "No. of Travellers",
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
      <Flex alignItems="center">
        <MdAttachMoney size="1.4rem" color={brand205} />

        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink href="#" fontWeight="bold" color={brand205}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink href="#" fontWeight="bold" color={brand205}>
              Quotes
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Flex>

      <Flex width="100%" height="100%">
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
                <Text fontSize="2rem">Something went wrong :(</Text>
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
