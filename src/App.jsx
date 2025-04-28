import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Nhớ import cái này nè!!

import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Home from "./pages/home";
import WomensCollection from "./pages/womens-collection";
import MensCollection from "./pages/mens-collection";
import AllProducts from "./pages/all-products";
import Cart from "./pages/cart";
import Login from "./pages/login";
import Register from "./pages/register";
import Admin from "./pages/admin";
import AdminLogin from "./pages/adminLogin"; // Trang đăng nhập của Admin
import Profile from "./pages/profile";
import { AuthProvider } from "./context/AuthContext";
import ProductDetail from "./pages/product"; // Import trang chi tiết sản phẩm

function App() {
  return (
    <AuthProvider>
      <CartProvider>
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
                <Route path="/profile" element={<Profile />} />
                {/* Thêm các route cho Admin */}
                <Route path="/admin" element={<Admin />} />  {/* Trang Dashboard của Admin */}
                <Route path="/admin/login" element={<AdminLogin />} />
                {/* Route cho trang chi tiết sản phẩm */}
                <Route path="/product/:id" element={<ProductDetail />} /> {/* Thêm route cho trang chi tiết sản phẩm */}

              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider> // Bọc AuthProvider quanh Router
  );
}

export default App;
