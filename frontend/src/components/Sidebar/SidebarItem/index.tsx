import React from "react"
import { Button, Flex, IconButton, useMediaQuery } from "@chakra-ui/react"
import ISideBarItemProps from "../../../types/ISideBarItem"

const SidebarItem: React.FC<ISideBarItemProps> = (props) => {
  const { icon, label, selected, onClick } = props

  const [isLargerThan1024] = useMediaQuery("(min-width: 1024px)")

  return (
    <Flex
      _hover={{ backgroundColor: "brand.700", transition: "300ms" }}
      _active={{ filter: "brightness(80%)", transition: "300ms" }}
      transition="300ms"
      cursor="pointer"
      bg={selected ? "brand.700" : "brand.600"}
      alignItems="center"
      justifyContent={isLargerThan1024 ? "flex-start" : "center"}
      width="100%"
      height="100%"
      maxHeight="120px"
      gap="1rem"
      px="1rem"
      onClick={onClick}
    >
      {isLargerThan1024 ? (
        <Button
          leftIcon={icon}
          variant="unstyled"
          color="brand.200"
          display="flex"
          alignItems="center"
        >
          {label}
        </Button>
      ) : (
        <IconButton
          display="flex"
          justifyContent="center"
          alignItems="center"
          variant="unstyled"
          color="brand.200"
          aria-label={`menu-button-${label}`}
          fontSize="1.2rem"
          icon={icon}
        />
      )}
    </Flex>
  )
}

export default SidebarItem
