import React from "react"
import { Button, Flex } from "@chakra-ui/react"
import ISideBarItemProps from "../../../types/ISideBarItem"

const SidebarItem: React.FC<ISideBarItemProps> = (props) => {
  const { icon, label, selected, onClick } = props

  return (
    <Flex
      _hover={{ backgroundColor: "brand.700", transition: "300ms" }}
      _active={{ filter: "brightness(80%)", transition: "300ms" }}
      transition="300ms"
      cursor="pointer"
      bg={selected ? "brand.700" : "brand.600"}
      alignItems="center"
      justifyContent="flex-start"
      minW="200px"
      height="100%"
      maxHeight="120px"
      gap="1rem"
      px="1rem"
      onClick={onClick}
    >
      <Button
        leftIcon={icon}
        variant="unstyled"
        color="brand.200"
        display="flex"
        alignItems="center"
      >
        {label}
      </Button>
    </Flex>
  )
}

export default SidebarItem
