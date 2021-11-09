import { extendTheme,ThemeConfig } from '@chakra-ui/react'
import { createBreakpoints } from "@chakra-ui/theme-tools"
import { mode } from "@chakra-ui/theme-tools"

const breakpoints = createBreakpoints({
    sm: "30em",
    md: "48em",
    lg: "69em",
    xl: "90em",
    "2xl": "104em",
  })

  const config: ThemeConfig = {
    initialColorMode: "dark",
    useSystemColorMode: false,
  }

export const theme = extendTheme({
    colors: {
        lime: {
          50: '#f2ffde',
         100: '#defcb2',
         200: '#4CD62B',
         300: '#b5f554',
         400: '#a1f226',
         500: '#4CD62B',
         600: '#69a905',
         700: '#4a7801',
         800: '#2b4800',
         900: '#0b1900',
        }
      },
    breakpoints,
    fonts : {
        heading: 'Inter',
        body: 'Inter'
    },
    styles: {
        global: (props) => ({
            body: {
                color: mode("black", "white")(props),
                bg: mode('#ebebeb', 'hsl(207, 17%, 24%)')(props),
            }
        })
    },
    config
})