"use client"

import { Link } from "react-router-dom"
import { ShoppingCart, Search, User, Menu } from "lucide-react"
import { useState } from "react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold">
            HpClothingShop
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-purple-600">
              Home
            </Link>
            <Link to="/womens-collection" className="hover:text-purple-600">
              Women
            </Link>
            <Link to="/mens-collection" className="hover:text-purple-600">
              Men
            </Link>
            <Link to="/all-products" className="hover:text-purple-600">
              Shop
            </Link>
          </nav>


          <div className="flex items-center space-x-4">
            <button aria-label="Search" className="p-1">
              <Search size={20} />
            </button>
            <Link to="/login" aria-label="Account" className="p-1">
              <User size={20} />
            </Link>
            <Link to="/cart" aria-label="Cart" className="p-1">
              <ShoppingCart size={20} />
            </Link>
            <button aria-label="Menu" className="p-1 md:hidden" onClick={toggleMenu}>
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>


      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col px-4 py-2">
            <Link to="/" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/womens-collection" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>
              Women
            </Link>
            <Link to="/mens-collection" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>
              Men
            </Link>
            <Link to="/all-products" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>
              Shop
            </Link>
            <Link to="/login" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" className="py-2 hover:text-purple-600" onClick={() => setIsMenuOpen(false)}>
              Register
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
