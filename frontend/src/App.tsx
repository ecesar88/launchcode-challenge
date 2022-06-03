import React from "react"
import { ChakraProvider, Flex } from "@chakra-ui/react"
import globalTheme from "./styles/globalTheme"
import { QueryClient, QueryClientProvider } from "react-query"
import NavBar from "./components/NavBar"
import Router from "./components/Router"
import Sidebar from "./components/Sidebar"
import { BrowserRouter } from "react-router-dom"

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider resetCSS theme={globalTheme}>
        <BrowserRouter>
          <Flex flexDirection="column" h="100%">
            <NavBar />

            <Flex h="100%" w="100%">
              <Sidebar />
              <Router />
            </Flex>
          </Flex>
        </BrowserRouter>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default App
