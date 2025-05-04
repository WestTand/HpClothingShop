"use client";

import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { auth, db } from "../config/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartItems, isAdded } = useCart();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Lấy role user từ Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDocRef = doc(db, "users", user.uid);
          const userDocSnap = await getDoc(userDocRef);

          if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            setRole(userData.role);
          } else {
            console.error("Không tìm thấy dữ liệu người dùng.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy role:", error.message);
        }
      } else {
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Xử lý tìm kiếm khi nhấn Enter hoặc click vào biểu tượng tìm kiếm
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <header className="border-b bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold text-purple-600 tracking-wide hover:text-purple-800">
          HpClothingShop
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8 text-lg">
          <Link to="/" className="text-gray-700 hover:text-purple-600 transition-all">Home</Link>
          <Link to="/womens-collection" className="text-gray-700 hover:text-purple-600 transition-all">Women</Link>
          <Link to="/mens-collection" className="text-gray-700 hover:text-purple-600 transition-all">Men</Link>
          <Link to="/all-products" className="text-gray-700 hover:text-purple-600 transition-all">Shop</Link>
          {role === "admin" && (
            <Link to="/admin" className="text-gray-700 hover:text-purple-600 transition-all">Admin</Link>
          )}
        </nav>

        {/* Icon Buttons */}
        <div className="flex items-center space-x-6">
          {/* Tìm kiếm */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="p-2 pl-10 pr-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              aria-label="Search"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 p-2 text-gray-500"
              onClick={handleSearch}
            >
              <Search size={20} />
            </button>
          </div>

          {/* Account */}
          <Link to={role ? "/profile" : "/login"} aria-label="Account" className="text-gray-700 hover:text-purple-600 transition-all">
            <User size={20} />
          </Link>

          {/* Cart */}
          <Link to="/cart" aria-label="Cart" className="relative text-gray-700 hover:text-purple-600 transition-all">
            <ShoppingCart size={24} />
            {cartItems.length > 0 && (
              <span
                className={`absolute -top-2 -right-2 bg-purple-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold
                  ${isAdded ? "bg-red-500 animate-bounce" : ""}`}
              >
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button aria-label="Menu" className="p-2 md:hidden" onClick={toggleMenu}>
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white shadow-md">
          <nav className="flex flex-col px-6 py-4">
            <Link to="/" className="py-2 text-gray-700 hover:text-purple-600 transition-all" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/womens-collection" className="py-2 text-gray-700 hover:text-purple-600 transition-all" onClick={() => setIsMenuOpen(false)}>Women</Link>
            <Link to="/mens-collection" className="py-2 text-gray-700 hover:text-purple-600 transition-all" onClick={() => setIsMenuOpen(false)}>Men</Link>
            <Link to="/all-products" className="py-2 text-gray-700 hover:text-purple-600 transition-all" onClick={() => setIsMenuOpen(false)}>Shop</Link>

            {role === "admin" && (
              <Link to="/admin" className="py-2 text-gray-700 hover:text-purple-600 transition-all" onClick={() => setIsMenuOpen(false)}>Admin</Link>
            )}

            {!role && (
              <>
                <Link to="/login" className="py-2 text-gray-700 hover:text-purple-600 transition-all" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="py-2 text-gray-700 hover:text-purple-600 transition-all" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
