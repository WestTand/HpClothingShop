import { Link } from "react-router-dom";

export default function ProductCard({ product }) {

  return (
    <div className="group rounded-lg overflow-hidden shadow-lg bg-white transform transition-transform duration-300">
      <div className="relative aspect-square bg-gray-100 mb-4 overflow-hidden rounded-t-lg">
        <img
          src={product.imageUrl || "/placeholder.svg?height=300&width=300"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300"
        />
      </div>

      {/* Product Info */}
      <Link to={`/product/${product.id}`} className="block p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{product.name}</h3>
        <p className="text-xl font-semibold text-purple-600">
          {product.price.toLocaleString("vi-VN")} đ
        </p>
      </Link>
    </div>
  );
}
