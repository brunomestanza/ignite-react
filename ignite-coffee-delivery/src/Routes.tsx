import { Routes, Route } from 'react-router-dom'
import { DefaultLayout } from './layouts/DefaultLayout'
import { Home } from './pages/Home'
import { ShoppingCart } from './pages/ShoppingCart'

export function Router() {
  return (
    <Routes>
      {/* Temos abaixo uma rota que faz com que todas as rotas dentro dela sejam um layout, sendo cada uma delas, uma subrota dessa rota. */}
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
      </Route>
    </Routes>
  )
}
