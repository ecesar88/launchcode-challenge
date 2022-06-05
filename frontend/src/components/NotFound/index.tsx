import React from "react"
import { Text, Flex, Image, Box } from "@chakra-ui/react"

import NotFoundImage from "../../assets/undraw_outer_space_re_u9vd.svg"

const NotFound = () => {
  return (
    <Flex
      h="100%"
      w="100%"
      gap="3rem"
      justifyContent="center"
      alignItems="center"
    >
      <Flex direction="column">
        <Box>
          <Text fontWeight="bold" fontSize="5rem" color="brand.200">
            404
          </Text>
        </Box>

        <Box>
          <Text fontWeight="bold" fontSize="3rem" color="brand.900">
            Not Found :(
          </Text>
        </Box>
      </Flex>

      <Flex>
        <Image objectFit="contain" boxSize="400px" src={NotFoundImage} />
      </Flex>
    </Flex>
  )
}

export default NotFound
