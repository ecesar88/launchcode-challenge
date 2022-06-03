import React from "react"
import { Flex, Text, useToken } from "@chakra-ui/react"
import { TbChevronsRight } from "react-icons/tb"
import { FaClock } from "react-icons/fa"
import Banner from "../../components/Banner"
import Card from "../../components/Card"
import { loremIpsum } from "lorem-ipsum"

const Home = () => {
  const lipsum = loremIpsum({
    count: 3,
    units: "paragraphs",
  })

  const [brand505] = useToken("colors", ["brand.505"])

  return (
    <Flex direction="column" gap="1rem">
      <Banner />

      <Flex gap="1rem">
        <Card>
          <Flex direction="column" gap="0.5rem">
            <Flex alignItems="center">
              <TbChevronsRight color={brand505} size="2rem" />
              <Text variant="title">Quick Note</Text>
            </Flex>

            <Text textAlign="justify">{lipsum}</Text>
          </Flex>
        </Card>

        <Card>
          <Flex direction="column" gap="0.5rem">
            <Flex alignItems="center" gap="0.5rem">
              <FaClock color={brand505} size="1.5rem" />
              <Text variant="title">Pending Quotes</Text>
            </Flex>

            <Text textAlign="justify">{lipsum}</Text>
          </Flex>
        </Card>
      </Flex>
    </Flex>
  )
}

export default Home
