import { Link } from "react-router-dom"
import ProductCard from "../components/product-card"

export default function Home() {
  const featuredProducts = [
    { id: 1, name: "Product Name", price: "$99.99" },
    { id: 2, name: "Product Name", price: "$99.99" },
    { id: 3, name: "Product Name", price: "$99.99" },
    { id: 4, name: "Product Name", price: "$99.99" },
    { id: 5, name: "Product Name", price: "$99.99" },
    { id: 6, name: "Product Name", price: "$99.99" },
    { id: 7, name: "Product Name", price: "$99.99" },
    { id: 8, name: "Product Name", price: "$99.99" },
  ]

  return (
    <div className="container mx-auto px-4">
      {/* Hero Section */}
      <div className="bg-purple-600 text-white text-center py-16 px-4 mb-10">
        <h1 className="text-3xl font-bold mb-2">Summer Collection 2023</h1>
        <p className="mb-6">Check out our latest summer collection and find your style</p>
        <Link to="/all-products">
          <button className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium">Shop Now</button>
        </Link>
      </div>

      {/* Featured Products Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-6">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featuredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>

      {/* View All Button */}
      <div className="text-center mb-16">
        <Link to="/all-products">
          <button className="bg-purple-600 text-white px-6 py-2 rounded-md font-medium">View All</button>
        </Link>
      </div>
    </div>
  )
}
