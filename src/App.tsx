import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import { Toaster } from 'sonner'
import HalamanKasir from './pages/HalamanKasir'

function Home() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Welcome ke Kasir Teman</h1>
      <Link to="/kasir" className="mt-4 inline-block bg-orange-500 text-white px-6 py-3 rounded-lg">
        Masuk ke Kasir
      </Link>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/kasir" element={<HalamanKasir />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
