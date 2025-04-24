import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <div className="group">
      <div className="relative aspect-square bg-gray-100 mb-3 overflow-hidden">
        <img src="/placeholder.svg?height=300&width=300" alt={product.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
        <button className="absolute bottom-0 left-0 right-0 bg-purple-600 text-white py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          Add to Cart
        </button>
      </div>
      <Link to={`/product/${product.id}`}>
        <h3 className="font-medium">{product.name}</h3>
        <p className="text-gray-700">{product.price}</p>
      </Link>
    </div>
  )
}
