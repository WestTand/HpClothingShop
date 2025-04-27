import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
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
        <p className="text-xl font-semibold text-purple-600">{product.price} đ</p>
      </Link>

      {/* Thêm vào giỏ hàng */}
      <button
        onClick={() => addToCart(product)}
        className="w-full bg-purple-600 text-white py-2 mt-4"
      >
        Thêm vào giỏ
      </button>
    </div>
  );
}

