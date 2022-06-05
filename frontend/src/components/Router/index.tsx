import { Flex } from "@chakra-ui/react"
import React from "react"
import { Route, Routes } from "react-router-dom"
import ROUTES from "../../constants/routes"
import Home from "../../pages/Home"
import Quote from "../../pages/Quote"
import Quotes from "../../pages/Quotes"
import NotFound from "../NotFound"

const Router = () => {
  return (
    <Flex w="100%" h="100%" p="1rem">
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.QUOTES} element={<Quotes />} />
        <Route path={`${ROUTES.QUOTE}/:quoteId`} element={<Quote />} />
        <Route path={"*"} element={<NotFound />} />
      </Routes>
    </Flex>
  )
}

export default Router
