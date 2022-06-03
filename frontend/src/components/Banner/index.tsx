import React from "react"
import { Image, Box, Flex, Text } from "@chakra-ui/react"
import Illustration from "../../assets/undraw_newspaper_re_syf5.svg"
import Illustration2 from "../../assets/undraw_interior_design_re_7mvn.svg"

const Banner = () => {
  return (
    <Flex
      boxShadow="0px 0px 13px 3px rgba(0,0,0,0.35)"
      bgGradient="linear-gradient(90deg, rgba(65,199,198,1) 0%, rgba(66,102,200,1) 100%)"
      p="1rem"
      w="100%"
      borderRadius="0.8rem"
      maxH="350px"
      color="white"
      justifyContent="space-between"
    >
      <Flex direction="column" maxW="35%" gap="1rem">
        <Box>
          <Text fontSize="2rem" fontWeight="bold">
            Welcome to your dashboard!
          </Text>
        </Box>

        <Box textAlign="justify">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque feugiat tincidunt est, a ornare dolor porttitor quis.
            Pellentesque habitant morbi tristique senectus et netus et malesuada
            fames ac turpis egestas. In ut tortor nec mi cursus condimentum.
            Duis varius erat diam, bibendum porttitor nunc sodales fringilla.
            Aenean mi massa, egestas ut purus a, suscipit hendrerit felis. Etiam
            quis ipsum sed mi mollis finibus ac ut arcu. Maecenas odio urna,
            vulputate ac leo at, dapibus lobortis leo. Aenean nec justo sed erat
            vestibulum faucibus. Quisque in laoreet libero. Quisque eget
            imperdiet nibh. Vestibulum eleifend tempus nibh vitae vulputate.
          </p>
        </Box>
      </Flex>

      <Flex justifyContent="space-between" direction="column" gap="1rem">
        <Flex direction="column">
          <Text variant="big-yellow">418</Text>
          <Text fontWeight="bold">REQUESTS SATISFIED</Text>
        </Flex>

        <Flex direction="column">
          <Text variant="big-yellow">404</Text>
          <Text fontWeight="bold">NOT FOUND</Text>
        </Flex>

        <Flex direction="column">
          <Text variant="big-yellow">500</Text>
          <Text fontWeight="bold">ERROR</Text>
        </Flex>
      </Flex>

      <Flex justifyContent="space-between" alignItems="center" gap="2rem">
        <Box>
          <Image boxSize="300px" objectFit="contain" src={Illustration} />
        </Box>

        <Box>
          <Image boxSize="300px" objectFit="contain" src={Illustration2} />
        </Box>
      </Flex>
    </Flex>
  )
}

export default Banner
