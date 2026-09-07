import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'

function App() {
  return (
    <BrowserRouter>
      <Toaster richColors />
      <Routes>
        <Route path="/" element={<h1>Welcome ke Kasir Teman</h1>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
