import { BrowserRouter } from 'react-router-dom'
import { Header } from './components/Header'
import { Router } from './Routes'

export function App() {
  return (
    <BrowserRouter>
      <Header />
      <Router />
    </BrowserRouter>
  )
}
