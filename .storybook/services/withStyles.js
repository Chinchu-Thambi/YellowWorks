import React from 'react'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styled-normalize'
import { Box } from 'rebass'

import theme from '../../src/util/theme'

import './styles.css'
import '../../src/util/styles/yellow-tailwind.css'

const withStyles = (storyFn) => {
  return (
    <Box p={2}>
      <Normalize />
      <ThemeProvider theme={theme}>
        {storyFn()}
      </ThemeProvider>
    </Box>
  )
}

export default withStyles;
