import React from "react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex,
  useToken,
} from "@chakra-ui/react"
import { MdAttachMoney } from "react-icons/md"

import { v4 as uuidv4 } from "uuid"

import mockData from "../../constants/mockData"
import Card from "../../components/Card"
import CustomTable from "../../components/Table"

const Quotes = () => {
  const [brand205] = useToken("colors", ["brand.205"])

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
          <CustomTable />
        </Card>
      </Flex>
    </Flex>
  )
}

export default Quotes
