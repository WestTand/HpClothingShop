import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext"; // Nhớ import cái này nè!!
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Product from "./pages/product"; // Trang chi tiết sản phẩm
import Terms from "./pages/terms"; // Trang điều khoản
import Privacy from "./pages/privacy"; // Trang chính sách bảo mật
import BackToTopButton from "./components/backToTopButton"
import AboutUs from "./pages/aboutus";
import ThankYou from "./pages/ThanhYou";
import SearchPage from "./pages/SearchPage"; // Trang tìm kiếm sản phẩm
import OrderDetail from "./pages/OrderDetail"; // Trang chi tiết đơn hàng
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
                <Route path="/admin" element={<Admin />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/product/:productId" element={<Product />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/thankyou" element={<ThankYou />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/order/:orderId" element={<OrderDetail />} />
              </Routes>
            </main>
            <Footer />
            <BackToTopButton />
          </div>
        </Router>
        <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} />
      </CartProvider>
    </AuthProvider> // Bọc AuthProvider quanh Router
  );
}

export default App;
