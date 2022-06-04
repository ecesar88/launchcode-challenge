/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"
import { v4 as uuidv4 } from "uuid"

const CustomTable = () => {
  const content = [
    {
      departureLocation: "KFOM",
      destinationLocation: "9WN2",
      departureDate: "2022-06-04T15:52:10.890Z",
      returnDate: "2023-02-18T00:49:54.777Z",
      numberOfTravellers: 20,
    },
    {
      departureLocation: "YBGY",
      destinationLocation: "8TS5",
      departureDate: "2022-06-04T06:45:42.982Z",
      returnDate: "2023-05-18T14:26:08.848Z",
      numberOfTravellers: 105,
    },
    {
      departureLocation: "FNCC",
      destinationLocation: "NY91",
      departureDate: "2022-06-04T12:11:28.200Z",
      returnDate: "2023-03-04T02:36:08.647Z",
      numberOfTravellers: 79,
    },
  ]

  const tableData = {
    header: [
      {
        keyName: "teste",
        label: "AAAAAAAk",
      },
      {
        keyName: "teste",
        label: "AAAAAAAk",
      },
      {
        keyName: "teste",
        label: "AAAAAAAk",
      },
      {
        keyName: "teste",
        label: "AAAAAAAk",
      },
      {
        keyName: "teste",
        label: "AAAAAAAk",
      },
    ],
    content,
  }

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            {tableData.header.map((header) => (
              <Th key={uuidv4()}>{header.label}</Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {tableData.content.map((data: any) => {
            return (
              <Tr key={uuidv4()}>
                {Object.keys(data).map((key: string) => {
                  return <Td key={uuidv4()}>{data?.[key]}</Td>
                })}
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default CustomTable
