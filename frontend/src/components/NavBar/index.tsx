/* eslint-disable react/no-children-prop */
import React from "react"
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftAddon,
  useMediaQuery,
} from "@chakra-ui/react"
import { BsFillGrid1X2Fill } from "react-icons/bs"
import {
  BellIcon,
  EmailIcon,
  Search2Icon,
  SettingsIcon,
} from "@chakra-ui/icons"
import Logo from "../../assets/logo-white.png"

const NavBar = () => {
  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)")

  return (
    <Flex
      height="4rem"
      alignItems="center"
      justifyContent="space-between"
      gap="1rem"
      p="1rem"
      bg="brand.200"
      color="white"
    >
      <Flex gap="1rem" alignItems="inherit">
        <Box>
          <IconButton
            display="flex"
            justifyContent="center"
            alignItems="center"
            aria-label="Search"
            variant="unstyled"
            icon={<BsFillGrid1X2Fill size="1.5rem" />}
          />
        </Box>

        <Box>
          <Image src={Logo} width="7rem" />
        </Box>
      </Flex>

      <Flex gap="1rem" alignItems="inherit">
        <Flex>
          {isLargerThan1024 ? (
            <InputGroup minW="400px" maxW="800px" w="100%">
              <InputLeftAddon
                pointerEvents="none"
                cursor="pointer"
                children={<Search2Icon color="gray.300" />}
              />
              <Input size="md" bg="white" textColor="black" w="100%" />
            </InputGroup>
          ) : null}
        </Flex>

        <Flex gap="1rem" alignItems="center">
          <IconButton
            aria-label="Search"
            variant="unstyled"
            icon={<BellIcon fontSize="1.7rem" />}
          />

          <IconButton
            aria-label="Search"
            variant="unstyled"
            icon={<EmailIcon fontSize="1.7rem" />}
          />

          <IconButton
            aria-label="Search"
            variant="unstyled"
            icon={<SettingsIcon fontSize="1.5rem" />}
          />
        </Flex>

        <Flex alignItems="center">
          <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        </Flex>
      </Flex>
    </Flex>
  )
}

export default NavBar
