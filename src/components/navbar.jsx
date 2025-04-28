"use client";

import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, User, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext"; // 👈 nhớ import CartContext nhé
import { auth, db } from "../config/firebase_config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState(null);
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
        // Nếu user logout thì reset role về null
        setRole(null);
      }
    });
  
    // Cleanup listener khi component unmount
    return () => unsubscribe();
  }, []);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            HpClothingShop
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-purple-600">Home</Link>
            <Link to="/womens-collection" className="hover:text-purple-600">Women</Link>
            <Link to="/mens-collection" className="hover:text-purple-600">Men</Link>
            <Link to="/all-products" className="hover:text-purple-600">Shop</Link>
            {/* Nếu role === admin thì hiển thị Link Admin */}
            {role === "admin" && (
              <Link to="/admin" className="hover:text-purple-600">Admin</Link>
            )}
          </nav>

          {/* Icon Buttons */}
          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-1">
              <Search size={20} />
            </button>

            <Link to={role ? "/profile" : "/login"} aria-label="Account" className="p-1">
              <User size={20} />
            </Link>

            {/* Cart Icon */}
            <Link to="/cart" aria-label="Cart" className="p-1 relative">
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
            <button aria-label="Menu" className="p-1 md:hidden" onClick={toggleMenu}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col px-4 py-2">
            <Link to="/" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>Home</Link>
            <Link to="/womens-collection" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>Women</Link>
            <Link to="/mens-collection" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>Men</Link>
            <Link to="/all-products" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>Shop</Link>

            {/* Mobile Menu Admin */}
            {role === "admin" && (
              <Link to="/admin" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>
                Admin
              </Link>
            )}

            {/* Nếu chưa login, có thể hiển thị login/register */}
            {!role && (
              <>
                <Link to="/login" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>Login</Link>
                <Link to="/register" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>Register</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
