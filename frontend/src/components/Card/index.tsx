import React from "react"
import { Box } from "@chakra-ui/react"

import ICardProps from "../../types/ICardProps"

const Card: React.FC<ICardProps> = (props) => {
  const { height, width, children } = props

  return (
    <Box
      w={width}
      h={height}
      boxShadow="0px 0px 13px 3px rgba(0,0,0,0.35)"
      p="1rem"
      borderRadius="1rem"
    >
      {children}
    </Box>
  )
}

export default Card
