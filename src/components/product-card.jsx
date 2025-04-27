import { Link } from "react-router-dom"

export default function ProductCard({ product }) {
  return (
    <div className="group rounded-lg overflow-hidden shadow-lg bg-white transform hover:scale-105 transition-transform duration-300">
      {/* Image Container */}
      <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden rounded-t-lg">
        <img
          src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300"></div>
        <button className="absolute bottom-0 left-0 right-0 bg-purple-600 text-white py-2 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          Thêm vào giỏ
        </button>
      </div>

      {/* Product Info */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
        <p className="text-xl font-semibold text-purple-600">{product.price} đ</p>
      </Link>
    </div>
  )
}
