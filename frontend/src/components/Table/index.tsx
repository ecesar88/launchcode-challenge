import React, { CSSProperties } from "react"
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react"

export interface ITableHeader<T> {
  render?: (rowData: T) => string | React.ReactNode
  label?: string

  cellStyle?: CSSProperties
  headerStyle?: CSSProperties

  headerChildren?: React.ReactNode
}

export interface ITable<T> {
  header: ITableHeader<T>[]
  content: T[]
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CustomTable = <T extends Record<string, any>>(props: ITable<T>) => {
  const { header, content } = props

  const defaultCellStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: "6px",
  }

  return (
    <TableContainer>
      <Table width="100%">
        <Thead>
          <Tr>
            {header.map((header, hIdx) => (
              <Th key={hIdx}>
                <div style={header?.headerStyle ?? defaultCellStyle}>
                  {header?.headerChildren ?? null}
                  <p>{header?.label?.toUpperCase()}</p>
                </div>
              </Th>
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {content?.map((data, dataIndex) => {
            return (
              <Tr key={dataIndex}>
                {header?.map((headerItem, hIdx) => {
                  return (
                    <Td key={hIdx}>
                      <div style={headerItem?.cellStyle ?? defaultCellStyle}>
                        {headerItem?.render?.(data)}
                      </div>
                    </Td>
                  )
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
