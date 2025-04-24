import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbar"
import Footer from "./components/footer"
import Home from "./pages/home"
import WomensCollection from "./pages/womens-collection"
import MensCollection from "./pages/mens-collection"
import AllProducts from "./pages/all-products"
import Cart from "./pages/cart"
import Login from "./pages/login"
import Register from "./pages/register"

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/womens-collection" element={<WomensCollection />} />
            <Route path="/mens-collection" element={<MensCollection />} />
            <Route path="/all-products" element={<AllProducts />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
