import { ChakraProvider, Box, BoxProps } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { SessionProvider } from "next-auth/react"
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps, session, router }) {
  const MotionBox = motion<BoxProps>(Box);

  return (
    <ChakraProvider theme={theme}>
      <SessionProvider session={session} refetchInterval={5 * 60}>
        <MotionBox
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: '0.5' }}
        >
          <Component {...pageProps} />
        </MotionBox>
      </SessionProvider>
    </ChakraProvider>
  )
}

export default MyApp
