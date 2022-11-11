import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { Publication } from './pages/Publication'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/publication">
        <Route path=":postId/:username" element={<Publication />} />
      </Route>
    </Routes>
  )
}
