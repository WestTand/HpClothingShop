import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold mb-4">Visily</h3>
            <p className="text-sm text-gray-300 mb-4">Your one-stop destination for fashion and style.</p>
            <p className="text-sm text-gray-300">© 2023 Visily. All rights reserved.</p>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/womens-collection">Women's Collection</Link>
              </li>
              <li>
                <Link to="/mens-collection">Men's Collection</Link>
              </li>
              <li>
                <Link to="/all-products">All Products</Link>
              </li>
              <li>
                <Link to="/new-arrivals">New Arrivals</Link>
              </li>
              <li>
                <Link to="/sale">Sale</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/careers">Careers</Link>
              </li>
              <li>
                <Link to="/terms">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>Email: info@visily.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>
                Address: 123 Fashion St,
                <br />
                New York, NY 10001
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
