import { Flex } from "@chakra-ui/react"
import React from "react"
import { Route, Routes } from "react-router-dom"
import ROUTES from "../../constants/routes"
import Home from "../../pages/Home"

const Router = () => {
  return (
    <Flex w="100%" h="100%" p="1rem">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
      </Routes>
    </Flex>
  )
}

export default Router
