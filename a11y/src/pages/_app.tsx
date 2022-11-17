import { useEffect } from 'react'
import '../styles/globals.css'
import { axeAccessibilityReporter } from '../utils/axeAccessibilityReporter'


function MyApp({ Component, pageProps }) {
  useEffect(() => { // Usamos um useEffect porque essa função é executada unicamente pelo lado do cliente
    axeAccessibilityReporter()
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
