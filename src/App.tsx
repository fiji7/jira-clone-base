import { ThemeProvider } from '@emotion/react'
import { theme } from './theme'
import HomePage from './components/HomePage/HomePage'


export default function App() {

  return (
    <ThemeProvider theme={theme}>
      <HomePage />
    </ThemeProvider>
  )
}
