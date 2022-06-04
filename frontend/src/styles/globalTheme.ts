import { ChakraTheme, extendTheme } from "@chakra-ui/react"
import { GlobalStyleProps } from "@chakra-ui/theme-tools"
import TextOverride from "./components/Text"

const globalTheme: Partial<ChakraTheme> = extendTheme({
  breakpoints: {
    base: "400px",
    sm: "600px",
    md: "780px",
    lg: "1024px",
    xl: "1360px",
    "2xl": "1920px",
    "3xl": "1920px",
  },
  components: {
    Text: TextOverride,
  },
  colors: {
    brand: {
      100: "#5BBFBA",
      200: "#5F6CAF",
      205: "#445194",
      300: "#E7F0C3",
      400: "#F0CF85",
      500: "#A4D4AE",
      505: "#2F96A3",
      600: "#E6E6E6",
      700: "#CCD0DC",
      800: "#A6AAB3",
      805: "#A3A7B5",
      900: "#535353",
    },
  },
  styles: {
    global: (_props: GlobalStyleProps) => ({
      body: {
        position: "absolute",
        inset: 0,
      },
      "#root": {
        height: "100%",
        width: "100%",
      },
      "*": {
        boxSizing: "border-box",
      },
      "html, body": {
        margin: 0,
        padding: 0,
      },
    }),
  },
})

export default globalTheme
