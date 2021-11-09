import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react"
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps, session }) {
  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <Component {...pageProps} />
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
