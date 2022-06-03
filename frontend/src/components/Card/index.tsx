import React from "react"
import { Box } from "@chakra-ui/react"

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      boxShadow="0px 0px 13px 3px rgba(0,0,0,0.35)"
      p="1rem"
      borderRadius="1rem"
    >
      {children}
    </Box>
  )
}

export default Card
